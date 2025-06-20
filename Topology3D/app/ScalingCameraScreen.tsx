// ScalingCameraScreen: captures photo using CameraView for scaling reference
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CameraView, CameraType, CameraMode, useCameraPermissions } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const ScalingCameraScreen = () => {
  const [permissionGranted, setPermissionGranted] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      if (status === 'granted') {
        setPermissionGranted(true);
      }
    })();
  }, []);

  const handleTakePhoto = async () => {
    try {
      const photo = await cameraRef.current?.takePictureAsync();
      if (photo && photo.uri) {
        navigation.navigate('ViewVideoScreen', {
          uri: photo.uri,
          type: 'photo',
          step: 'scaling',
          previousScreen: 'ScalingCameraScreen',
          nextScreen: 'CompleteScreen',
        });
      }
    } catch (error) {
      console.error('Photo capture error:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>✖️</Text>
      </TouchableOpacity>

      {permissionGranted ? (
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          mode="picture"
          facing={facing}
        >
          <View style={styles.cameraButtonsContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={handleTakePhoto}>
              <FontAwesome name={'camera'} size={40} color="#000" />
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
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  cameraButtonsContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  captureButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
    marginBottom: 130,
  },
});

export default ScalingCameraScreen;
