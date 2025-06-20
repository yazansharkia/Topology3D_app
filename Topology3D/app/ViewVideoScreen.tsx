////
////import React, { useState, useEffect } from 'react';
////import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image,ActivityIndicator} from 'react-native';
////import { useNavigation , useFocusEffect} from '@react-navigation/native';
////import { Camera } from 'expo-camera';
//////import { RNCamera } from 'react-native-camera';
////
//////import * as SQLite from 'expo-sqlite';
////import { useVideoPlayer, VideoView } from 'expo-video';
////import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
////import { storage } from './firebase';  // Adjust path to your firebase configuration file
////import { useLocalSearchParams } from 'expo-router';
////const { width, height } = Dimensions.get('window');
////
////const ViewVideoScreen = ({ route }) => {
////  console.log('ViewVideoScreen App is starting...');
////
////  const { uri, type, previousScreen, nextScreen } = useLocalSearchParams(); //route.params;
////  const [loading, setLoading] = useState(false); // Added state for loading
////
////  const navigation = useNavigation();
////
//////  const handleSaveMedia = () => {
//////    const query = `INSERT INTO media (uri, type) VALUES (?, ?)`;
//////    const params = [uri, type];
//////
//////  };
////    const player = useVideoPlayer(uri, (player) => {
////        player.loop = true;  // Enable looping
////        player.play();       // Auto-play when loaded
////      });
////
////     
//    useFocusEffect(
//      React.useCallback(() => {
//        // When the screen is focused, video will play
//        if (player) {
//          player.play();
//        }
//
//        return () => {
//          // When losing focus, stop the video
//          if (player) {
//            player.pause();
//          }
//        };
//      }, [player])
//    );
//////  async function uploadMedia() {
//////    const formData = new FormData();
//////    formData.append(type, { uri, name: `media.${type === 'photo' ? 'jpg' : 'mp4'}`, type: type === 'photo' ? 'image/jpeg' : 'video/mp4' });
//////    formData.append('type', 'video');
//////    const localIp = "http://10.0.0.1:3000/uploadFor3dModelConstruction"; // replace with your actual IP and port 10.0.0.1 for Yazan Home | 192.168.0.103
//////
//////    try {
//////      await fetch(localIp, {
//////        method: 'POST',
//////        body: formData,
//////        headers: {
//////          'Content-Type': 'multipart/form-data',
//////        },
//////      });
//////      console.log('Upload successful');
//////    } catch (error) {
//////      console.error('Upload failed', error);
//////    }
//////  }
////
//////  const handleContinue = async () => {
//////    handleSaveMedia();
//////      setLoading(true); // Start loading
//////    await uploadMedia();
//////      navigation.navigate(nextScreen, { uri, type });
//////  };
////
////  const handleRetake = () => {
//////    navigation.navigate('Camera');
//////      navigation.goBack();
////      navigation.navigate(previousScreen);
////  };
////
////    const uploadToFirebase = async () => {
////       setLoading(true);
////       try {
////         console.log('Starting Uploading');
////         const response = await fetch(uri);
////         const blob = await response.blob();
////           
////         const storageRef = ref(storage, `3dReconstructing_Videos/${Date.now()}_footVideo.mp4`);
////         const uploadTask = uploadBytesResumable(storageRef, blob);
////
////         uploadTask.on(
////           'state_changed',
////           (snapshot) => {
////             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
////             console.log(`Upload is ${progress.toFixed(2)}% done`);
////           },
////           (error) => {
////            console.error('Upload failed:', error);
////            alert(`Upload failed: ${error.message}`);
////                if (error.serverResponse) {
////                    console.error('Server response:', error.serverResponse);
////                }
////
////             setLoading(false);
////           },
////           async () => {
////             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
////             console.log('File available at', downloadURL);
////             alert('Upload complete');
////             setLoading(false);
////             navigation.navigate('CompleteScreen', { uploadedVideoUri: downloadURL });
////           }
////         );
////       } catch (error) {
////         console.error('Error uploading video:', error);
////         alert('Error uploading video'+error.message);
////         setLoading(false);
////       }
////        
////     };
////    
//////    const player = useVideoPlayer(uri, (player) => {
//////      player.loop = true;  // Enable looping
//////      player.play();       // Auto-play when loaded
//////    });
//////    
////  return (
////    <View style={styles.container}>
////      {type === 'photo' ? (
////        <Image style={styles.fullScreenImage} source={{ uri }} resizeMode="contain" />
////      ) : (
////           <VideoView
////             style={styles.fullScreenImage}
////             player={player}                 // Bind the player
////             allowsFullscreen
////             allowsPictureInPicture
////             muted={true}                    // Mute the video
////           />
////      )}
////      <View style={styles.exitButtonsContainer}>
////        <TouchableOpacity style={styles.exitButton} onPress={handleRetake}>
////          <Text style={styles.exitButtonText}>X</Text>
////        </TouchableOpacity>
////          </View>
////          <View style={styles.photoButtonsContainer}>
////          <TouchableOpacity style={styles.continueButton} onPress={uploadToFirebase} disabled={loading}>
////          <Text style={styles.continueButtonText}>Continue</Text>
////        </TouchableOpacity>
////      </View>
////      {loading && ( // Display loading indicator during processing
////         <View style={styles.loadingOverlay}>
////          <ActivityIndicator size="large" color="#ffffff" />
////          <Text style={styles.loadingText}>Processing...</Text>
////         </View>
////     )}
////
////    </View>
////  );
////};
////
////
////
////const styles = StyleSheet.create({
////  container: {
////    flex: 1,
////    justifyContent: 'center',
////    alignItems: 'center',
////    backgroundColor: 'white',
////  },
////  fullScreenImage: {
////    flex: 1,
////    width: '100%',
////    height: '100%',
////  },
////  photoButtonsContainer: {
////    position: 'absolute',
////    bottom: 20,
////    right: 10,
////    flexDirection: 'row',
////    justifyContent: 'space-between',
////    paddingHorizontal: 20,
////  },
////exitButtonsContainer: {
////  position: 'absolute',
////  top: 20,
////  left: 0,
////  right: 0,
////  flexDirection: 'row',
////  justifyContent: 'space-between',
////  paddingHorizontal: 20,
////},
////  continueButton: {
////    backgroundColor: 'white',
////    borderRadius: 5,
////    paddingVertical: 10,
////    paddingHorizontal: 20,
////    alignSelf: 'center',
////  },
////  continueButtonText: {
////    color: 'black',
////    fontWeight: 'bold',
////  },
////exitButton: {
////    position: 'absolute',
////    top: 40,
////    right: 20,
////    backgroundColor: 'rgba(128, 128, 128, 0.5)', // Semi-transparent grey background
////    borderRadius: 50,
////    width: 40,
////    height: 40,
////    justifyContent: 'center',
////    alignItems: 'center',
////  },
////  exitButtonText: {
////    color: 'white',
////    fontWeight: 'bold',
////    fontSize: 20,
////  },
////loadingOverlay: {
////  position: 'absolute',
////  top: 0,
////  left: 0,
////  right: 0,
////  bottom: 0,
////  justifyContent: 'center',
////  alignItems: 'center',
////  backgroundColor: 'rgba(0, 0, 0, 0.7)',
////},
////loadingText: {
////  color: '#ffffff',
////  marginTop: 10,
////  fontSize: 16,
////},
////
////});
////
////export default ViewVideoScreen;
//
//// Refined ViewVideoScreen with upload tracking and organized Firebase storage
//import React, { useState, useEffect } from 'react';
//import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ActivityIndicator, Alert } from 'react-native';
//import { useNavigation, useFocusEffect } from '@react-navigation/native';
//import { useVideoPlayer, VideoView } from 'expo-video';
//import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
//import { storage } from './firebase';
//import { auth } from './firebase';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import { useLocalSearchParams } from 'expo-router';
//
//const { width, height } = Dimensions.get('window');
//
//const ViewVideoScreen = () => {
//  const { uri, type, previousScreen, nextScreen } = useLocalSearchParams();
//  const [loading, setLoading] = useState(false);
//  const navigation = useNavigation();
//
//  const player = useVideoPlayer(uri, (player) => {
//    player.loop = true;
//    player.play();
//  });
//
//  useFocusEffect(
//    React.useCallback(() => {
//      if (player) player.play();
//      return () => {
//        if (player) player.pause();
//      };
//    }, [player])
//  );
//
//  const getStepFromScreen = (screen) => {
//    if (screen === 'ScanCameraScreen') return 'scan';
//    if (screen === 'CameraCalibrationScreen') return 'calibration';
//    if (screen === 'ScalingScreen') return 'scaling';
//    return 'unknown';
//  };
//
//  const uploadToFirebase = async () => {
//    setLoading(true);
//    try {
//      const response = await fetch(uri);
//      const blob = await response.blob();
//
//      const clientId =
//        auth.currentUser?.displayName ||
//        auth.currentUser?.email?.replace(/[@.]/g, '_') ||
//        auth.currentUser?.uid;
//
//      if (!clientId) throw new Error('Client ID not available');
//
//      const step = getStepFromScreen(previousScreen);
//      const timestamp = Date.now();
//      const storagePath = `clients/${clientId}/${step}/recording_${timestamp}.mp4`;
//      const storageRef = ref(storage, storagePath);
//
//      const metadata = {
//        contentType: 'video/mp4',
//        customMetadata: {
//          clientId,
//          step,
//          timestamp: timestamp.toString(),
//        },
//      };
//
//      const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
//
//      uploadTask.on(
//        'state_changed',
//        null,
//        (error) => {
//          console.error('Upload error:', error);
//          Alert.alert('Upload failed', error.message);
//          setLoading(false);
//        },
//        async () => {
//          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//          console.log('Upload complete. URL:', downloadURL);
//
//          // 🔹 Save local progress
//          await AsyncStorage.setItem(`${step}Complete`, 'true');
//
//          setLoading(false);
//          navigation.navigate(nextScreen, { uploadedVideoUri: downloadURL });
//        }
//      );
//    } catch (error) {
//      console.error('Error during upload:', error);
//      Alert.alert('Upload Error', error.message);
//      setLoading(false);
//    }
//  };
//
//  const handleRetake = () => {
//    navigation.navigate(previousScreen);
//  };
//
//  return (
//    <View style={styles.container}>
//      {type === 'photo' ? (
//        <Image style={styles.fullScreenImage} source={{ uri }} resizeMode="contain" />
//      ) : (
//        <VideoView
//          style={styles.fullScreenImage}
//          player={player}
//          allowsFullscreen
//          allowsPictureInPicture
//          muted={true}
//        />
//      )}
//
//      <View style={styles.exitButtonsContainer}>
//        <TouchableOpacity style={styles.exitButton} onPress={handleRetake}>
//          <Text style={styles.exitButtonText}>X</Text>
//        </TouchableOpacity>
//      </View>
//
//      <View style={styles.photoButtonsContainer}>
//        <TouchableOpacity style={styles.continueButton} onPress={uploadToFirebase} disabled={loading}>
//          <Text style={styles.continueButtonText}>Continue</Text>
//        </TouchableOpacity>
//      </View>
//
//      {loading && (
//        <View style={styles.loadingOverlay}>
//          <ActivityIndicator size="large" color="#ffffff" />
//          <Text style={styles.loadingText}>Uploading...</Text>
//        </View>
//      )}
//    </View>
//  );
//};
//
//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
//    backgroundColor: 'white',
//  },
//  fullScreenImage: {
//    flex: 1,
//    width: '100%',
//    height: '100%',
//  },
//  photoButtonsContainer: {
//    position: 'absolute',
//    bottom: 20,
//    right: 10,
//    flexDirection: 'row',
//    justifyContent: 'space-between',
//    paddingHorizontal: 20,
//  },
//  exitButtonsContainer: {
//    position: 'absolute',
//    top: 20,
//    left: 0,
//    right: 0,
//    flexDirection: 'row',
//    justifyContent: 'space-between',
//    paddingHorizontal: 20,
//  },
//  continueButton: {
//    backgroundColor: 'white',
//    borderRadius: 5,
//    paddingVertical: 10,
//    paddingHorizontal: 20,
//    alignSelf: 'center',
//  },
//  continueButtonText: {
//    color: 'black',
//    fontWeight: 'bold',
//  },
//  exitButton: {
//    position: 'absolute',
//    top: 40,
//    right: 20,
//    backgroundColor: 'rgba(128, 128, 128, 0.5)',
//    borderRadius: 50,
//    width: 40,
//    height: 40,
//    justifyContent: 'center',
//    alignItems: 'center',
//  },
//  exitButtonText: {
//    color: 'white',
//    fontWeight: 'bold',
//    fontSize: 20,
//  },
//  loadingOverlay: {
//    position: 'absolute',
//    top: 0,
//    left: 0,
//    right: 0,
//    bottom: 0,
//    justifyContent: 'center',
//    alignItems: 'center',
//    backgroundColor: 'rgba(0, 0, 0, 0.7)',
//  },
//  loadingText: {
//    color: '#ffffff',
//    marginTop: 10,
//    fontSize: 16,
//  },
//});
//
//export default ViewVideoScreen;

// Updated ViewVideoScreen with slim bottom border, no top border, light arrow icon, and slight animation
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ActivityIndicator, Animated, Easing } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { auth } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
const user = auth.currentUser;

const { width, height } = Dimensions.get('window');

const ViewVideoScreen = () => {
  const { uri, type, previousScreen, nextScreen, step } = useLocalSearchParams();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const player = useVideoPlayer(uri, (player) => {
    player.loop = true;
    player.play();
  });

  useFocusEffect(
    React.useCallback(() => {
      if (player) player.play();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      return () => {
//        if (player) player.pause();
      };
    }, [player])
  );

  const handleRetake = () => {
//    navigation.navigate(previousScreen);
      navigation.goBack();  //need to navigate back to index screen, keeping the transtion backwards

  };
    
  const getStepFromScreen = (screen) => {
    if (screen === 'ScanCameraScreen') return 'scan';
    if (screen === 'CameraCalibrationScreen') return 'calibration';
    if (screen === 'ScalingCameraScreen') return 'scaling';
    return 'unknown';
  };

  const uploadToFirebase = async () => {
    setLoading(true);
    try {
      const clientId =
        auth.currentUser?.displayName ||
        auth.currentUser?.email?.replace(/[@.]/g, '_') ||
        auth.currentUser?.uid;

      if (!clientId) throw new Error('Client ID not found');
      const step = getStepFromScreen(previousScreen);
      if (!step) throw new Error('Step metadata missing');

      const response = await fetch(uri);
      const blob = await response.blob();
      const timestamp = Date.now();
      const path = `clients/${clientId}/${step}/recording_${timestamp}.mp4`;
      const storageRef = ref(storage, path);

      const metadata = {
        contentType: 'video/mp4',
        customMetadata: {
          clientId,
          step,
          timestamp: timestamp.toString(),
        },
      };

      const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.error('Upload error:', error);
          alert(error.message);
          setLoading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File available at:', downloadURL);
//          await AsyncStorage.setItem(`${step}Complete`, 'true');
           //writing to AsyncStorage ensures each user sees only their own progress
//          if (user?.uid && step) {
            await AsyncStorage.setItem(`${user.uid}_${step}Complete`, 'true');
            console.log('step:', step);
            console.log('user?.uid:', user?.uid);
            console.log('${user.uid}_${step}Complete');
            const scale = await AsyncStorage.getItem(`${user.uid}_${step}Complete`);
            
            console.log('calibration from storage:', scale);
//          }
          setLoading(false);
          navigation.navigate(nextScreen, { uploadedVideoUri: downloadURL });
        }
      );
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed: ' + error.message);
      setLoading(false);
    }
  };


    
  return (
    <View style={styles.container}>
      {type === 'photo' ? (
        <Image style={styles.fullScreenImage} source={{ uri }} resizeMode="contain" />
      ) : (
        <VideoView
          style={styles.fullScreenImage}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          muted={true}
        />
      )}

      <TouchableOpacity style={styles.exitButton} onPress={handleRetake}>
        <Text style={styles.exitButtonText}>✖️</Text>
      </TouchableOpacity>

      <Animated.View style={[styles.bottomBar, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.arrowContainer} onPress={uploadToFirebase} disabled={loading}>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>
      </Animated.View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Uploading...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  fullScreenImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  exitButton: {
//    position: 'absolute',
//    top: 40,
//    right: 20,
//    zIndex: 10,
//    backgroundColor: 'rgba(128, 128, 128, 0.5)',
//    borderRadius: 50,
//    width: 40,
//    height: 40,
//    justifyContent: 'center',
//    alignItems: 'center',
      position: 'absolute',
      top: 50,
      left: 20,
      zIndex: 10,
      backgroundColor: 'rgba(255,255,255,0.8)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
  },
  exitButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  arrowContainer: {
    height: 50,
    paddingVertical: 0,
    paddingHorizontal: 12,
  },
  arrowIcon: {
    fontSize: 26,
    color: 'white',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#ffffff',
    fontSize: 16,
  },
});

export default ViewVideoScreen;
