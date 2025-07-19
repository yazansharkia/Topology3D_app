import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import { auth } from './firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const uploadVideoWithMetadata = async (uri: string, clientId: string, step: string) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const timestamp = Date.now();
    const storagePath = `clients/${clientId}/${step}/recording_${timestamp}.mp4`;
    const storageRef = ref(storage, storagePath);

    const metadata = {
      contentType: 'video/mp4',
      customMetadata: {
        clientId,
        step,
        timestamp: timestamp.toString(),
      },
    };

    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        null,
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('Video uploaded. Download URL:', downloadURL);
          resolve(downloadURL);
        }
      );
    });
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

const CameraCalibrationScreen = () => {
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [camera, setCamera] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      if (status === 'granted') {
        setPermissionGranted(true);
        console.log("Camera permission granted.");
      }
    })();
  }, []);

  const handleStartRecording = async () => {
    if (camera) {
      setIsRecording(true);
      console.log("Recording started...");

      try {
        const video = await camera.recordAsync();
        console.log("Recording stopped. Video:", video);
        setIsRecording(false);

        if (video && video.uri) {
          const clientId =
            auth.currentUser?.displayName ||
            auth.currentUser?.email?.replace(/[@.]/g, '_') ||
            auth.currentUser?.uid;

          if (!clientId) {
            console.error("No valid client ID available.");
            return;
          }

          const step = 'calibration';
          await uploadVideoWithMetadata(video.uri, clientId, step);

          (navigation.navigate as any)('ViewVideoScreen', {
            uri: video.uri,
            type: 'video',
            previousScreen: 'CameraCalibrationScreen',
            nextScreen: 'CompleteScreen',
          });
        } else {
          console.error("No video URI found!");
        }
      } catch (error) {
        console.error("Error during recording:", error);
        setIsRecording(false);
      }
    }
  };

  const handleStopRecording = () => {
    if (camera && isRecording) {
      console.log("Stopping recording...");
      camera.stopRecording();
      setIsRecording(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>✖️</Text>
      </TouchableOpacity>

      {permissionGranted ? (
        <CameraView
          style={{ flex: 1 }}
          facing={facing}
          ref={(ref: any) => setCamera(ref)}
          mode={'video'}
          mute={true}
          autofocus={'on'}
        >
          <View style={styles.cameraButtonsContainer}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={isRecording ? handleStopRecording : handleStartRecording}
            >
              <FontAwesome
                name={isRecording ? "stop-circle" : "circle"}
                size={40}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <Text>Waiting for camera permission...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: height * 0.06, // Responsive positioning
    left: width * 0.05, // Responsive positioning
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: width * 0.03, // Responsive padding
    paddingVertical: height * 0.007, // Responsive padding
    borderRadius: width * 0.02, // Responsive border radius
  },
  backButtonText: {
    fontSize: width * 0.04, // Responsive font size
    color: '#007AFF',
    fontWeight: 'bold',
  },
  cameraButtonsContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: height * 0.012, // Responsive margin
  },
  captureButton: {
    backgroundColor: '#fff',
    borderRadius: width * 0.125, // Responsive border radius
    padding: width * 0.037, // Responsive padding
    paddingHorizontal: width * 0.05, // Responsive padding
    alignSelf: 'flex-end',
    marginBottom: height * 0.15, // Responsive margin
  },
});

export default CameraCalibrationScreen;
