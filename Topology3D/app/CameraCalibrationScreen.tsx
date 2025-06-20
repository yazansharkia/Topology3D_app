//////import React, { useState, useEffect } from 'react';
//////import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Dimensions, Image, FlatList, Modal,Animated } from 'react-native';
//////import {useNavigation } from '@react-navigation/native';
//////import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
//////import { CameraView, CameraType, useCameraPermissions  } from 'expo-camera';
////////import { RNCamera } from 'react-native-camera';
//////
//////import AsyncStorage from 'react-native';
////////import { Video } from 'expo-video';
//////import * as Animatable from 'react-native-animatable';
//////import { FontAwesome } from '@expo/vector-icons';
////////const Stack = createStackNavigator();
//////const { width, height } = Dimensions.get('window');
//////
//////
////////////////////////////////////////////////////////////////////
/////////////// Camera Page, TODO move to a seperate Page  /////////
////////////////////////////////////////////////////////////////////
//////// Here we open the Camera and Make the action of taking the picture.
//////
//////const CameraCalibrationScreen = () => {
//////    console.log('CameraCalibrationScreen App is starting...');
////////    const [permissionGranted, setPermissionGranted] = useState(null);
//////////  const [type, setType] = useState(Camera.Constants.Type.back);
////////    const [type, setType] = useState('back');
////////
////////  const [camera, setCamera] = useState(null);
////////  const [isRecording, setIsRecording] = useState(false);
////////  const navigation = useNavigation();
//////    const [permissionGranted, setPermissionGranted] = useState(null);
//////    const [permission, requestPermission] = useCameraPermissions();
//////    const [facing, setFacing] = useState('back');
//////    const [camera, setCamera] = useState(null);
//////    const [isRecording, setIsRecording] = useState(false);
//////    const [recordedVideo, setRecordedVideo] = useState(null);
//////    const navigation = useNavigation();
//////    
//////    useEffect(() => {
//////      (async () => {
//////          const { status } = await requestPermission();
//////          if (status === 'granted') {
//////              setPermissionGranted(true);
//////             console.log("camera permssion is granted...");
//////          }
//////      })();
//////    }, []);
//////    
//////  const handleCameraReady = () => {
//////    // TODO: Implement blinking logic if needed
//////  };
//////
////////  const takePicture = async () => {
////////    if (camera) {
////////      const photo = await camera.takePictureAsync();
////////      navigation.navigate('PhotoView', { uri: photo.uri,type: 'photo' });
////////    }
////////  };
//////
////////  const handleStartRecording = async () => {
////////    if (camera) {
////////       setIsRecording(true);
////////       const video = await camera.recordAsync();
////////       // You can handle the video object here (e.g., saving to state, uploading)
////////       setIsRecording(false);
////////        
////////  navigation.navigate('PhotoView', { uri: video.uri, type: 'video' });
////////    }
////////   };
////////    
////////    // Stop recording
////////  const handleStopRecording = () => {
////////    if (camera && isRecording) {
////////       camera.stopRecording(); // This will automatically resolve the recordAsync promise with the video file
////////       setIsRecording(false);
////////    }
////////   };
////////
////////  if (hasPermission === null) {
////////    return <View />;
////////  }
////////  if (hasPermission === false) {
////////    return <Text>No access to camera</Text>;
////////  }
//////    const handleStartRecording = async () => {
//////
//////      if (camera) {
//////        setIsRecording(true);
//////        console.log("Recording started...");
//////
//////        try {
//////          const video = await camera.recordAsync();
//////          console.log("Recording stopped. Video:", video);
//////
//////          setIsRecording(false);
//////
//////          if (video && video.uri) {
//////            console.log("Navigating to PhotoView with URI:", video.uri);
//////            navigation.navigate('ViewVideoScreen', { uri: video.uri, type: 'video', previousScreen: 'CameraCalibrationScreen', nextScreen: 'CompleteScreen' });
//////          } else {
//////            console.error("No video URI found!");
//////          }
//////        } catch (error) {
//////          console.error("Error during recording:", error);
//////        }
//////      }
//////    };
//////    const handleStopRecording = () => {
//////      if (camera && isRecording) {
//////        console.log("Stopping recording...");
//////        camera.stopRecording(); // This will allow recordAsync() to resolve
//////        setIsRecording(false);
//////      }
//////    };
//////
//////  return ( //TODO yazan bring back this code once you are done
//////      <View style={{ flex: 1 }}>
//////            {
//////            permissionGranted ? (
//////                 <CameraView style={{ flex: 1 }} facing={facing} ref={(ref) => setCamera(ref)} mode={'video'} mute={true} autofocus={'on'} onCameraReady={handleCameraReady}>
//////                 
//////               <View style={styles.cameraButtonsContainer}>
//////                 {
//////                     <TouchableOpacity style={styles.captureButton} onPress={isRecording ? handleStopRecording : handleStartRecording}>
//////                       <FontAwesome name={isRecording ? "stop-circle" : "circle"} size={40} color="#000" />
//////                     </TouchableOpacity>
//////                }
//////               </View>
//////             </CameraView>
//////             ) : (
//////                  <Text>Waiting for camera permission...</Text>
//////             )}
//////            
//////      </View>
//////  );
//////};
//////
////////
//////const styles = StyleSheet.create({
//////  container: {
//////    flex: 1,
//////    justifyContent: 'center',
//////    alignItems: 'center',
//////    backgroundColor: 'white',
//////  },
//////  title: {
//////    fontSize: 24,
//////    fontWeight: 'bold',
//////    color: 'black',
//////    textAlign: 'center',
//////    marginBottom: 40,
//////    // height: width,
//////  },
//////
//////animationContainer: {
//////   position: 'absolute',
//////   top: '50%',
//////   left: '50%',
//////   transform: [{ translateX: -15 }, { translateY: -380 }],
//////   zIndex: 1,
////// },
////// barcodeImage: {
//////   width: 50,
//////   height: 50,
////// },
//////    
//////  cameraButtonsContainer: {
//////    flex: 1,
//////    backgroundColor: 'transparent',
//////    flexDirection: 'row',
//////    justifyContent: 'center',
//////    alignItems: 'flex-end',
//////    marginBottom: 10,
//////  },
//////  captureButton: {
//////    backgroundColor: '#fff',
//////    borderRadius: 50,
//////    padding: 15,
//////    paddingHorizontal: 20,
//////    alignSelf: 'flex-end',
//////    marginBottom: 130,
//////  },
//////  modalButtonText: {
//////    color: 'black',
//////    fontWeight: 'bold',
//////  },
//////});
//////
//////export default CameraCalibrationScreen;
//////
//////
////
////// CameraCalibrationScreen with cancel button and metadata upload
////import React, { useState, useEffect } from 'react';
////import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
////import { useNavigation } from '@react-navigation/native';
////import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
////import { FontAwesome } from '@expo/vector-icons';
////import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
////import { storage } from './firebase';
////import { auth } from './firebase';
////
////const { width, height } = Dimensions.get('window');
////
////const uploadVideoWithMetadata = async (uri, clientId, step) => {
////  try {
////    const response = await fetch(uri);
////    const blob = await response.blob();
////    const timestamp = Date.now();
////    const storagePath = `clients/${clientId}/${step}/recording_${timestamp}.mp4`;
////    const storageRef = ref(storage, storagePath);
////
////    const metadata = {
////      contentType: 'video/mp4',
////      customMetadata: {
////        clientId,
////        step,
////        timestamp: timestamp.toString(),
////      },
////    };
////
////    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
////
////    return new Promise((resolve, reject) => {
////      uploadTask.on(
////        'state_changed',
////        null,
////        (error) => reject(error),
////        async () => {
////          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
////          console.log('Video uploaded. Download URL:', downloadURL);
////          resolve(downloadURL);
////        }
////      );
////    });
////  } catch (error) {
////    console.error("Upload error:", error);
////    throw error;
////  }
////};
////
////const CameraCalibrationScreen = () => {
////  const [permissionGranted, setPermissionGranted] = useState(null);
////  const [permission, requestPermission] = useCameraPermissions();
////  const [facing, setFacing] = useState<CameraType>('back');
////  const [camera, setCamera] = useState(null);
////  const [isRecording, setIsRecording] = useState(false);
////  const navigation = useNavigation();
////
////  useEffect(() => {
////    (async () => {
////      const { status } = await requestPermission();
////      if (status === 'granted') {
////        setPermissionGranted(true);
////        console.log("Camera permission granted.");
////      }
////    })();
////  }, []);
////
////  const handleStartRecording = async () => {
////    if (camera) {
////      setIsRecording(true);
////      console.log("Recording started...");
////
////      try {
////        const video = await camera.recordAsync();
////        console.log("Recording stopped. Video:", video);
////        setIsRecording(false);
////
////        if (video && video.uri) {
////          const clientId =
////            auth.currentUser?.displayName ||
////            auth.currentUser?.email?.replace(/[@.]/g, '_') ||
////            auth.currentUser?.uid;
////
////          if (!clientId) {
////            console.error("No valid client ID available.");
////            return;
////          }
////
////          const step = 'calibration';
////          await uploadVideoWithMetadata(video.uri, clientId, step);
////
////          navigation.navigate('ViewVideoScreen', {
////            uri: video.uri,
////            type: 'video',
////            previousScreen: 'CameraCalibrationScreen',
////            nextScreen: 'CompleteScreen',
////          });
////        } else {
////          console.error("No video URI found!");
////        }
////      } catch (error) {
////        console.error("Error during recording:", error);
////        setIsRecording(false);
////      }
////    }
////  };
////
////  const handleStopRecording = () => {
////    if (camera && isRecording) {
////      console.log("Stopping recording...");
////      camera.stopRecording();
////      setIsRecording(false);
////    }
////  };
////
////  return (
////    <View style={{ flex: 1 }}>
////      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
////        <Text style={styles.backButtonText}>🔙 Cancel</Text>
////      </TouchableOpacity>
////
////      {permissionGranted ? (
////        <CameraView
////          style={{ flex: 1 }}
////          facing={facing}
////          ref={(ref) => setCamera(ref)}
////          mode={'video'}
////          mute={true}
////          autofocus={'on'}
////        >
////          <View style={styles.cameraButtonsContainer}>
////            <TouchableOpacity
////              style={styles.captureButton}
////              onPress={isRecording ? handleStopRecording : handleStartRecording}
////            >
////              <FontAwesome
////                name={isRecording ? "stop-circle" : "circle"}
////                size={40}
////                color="#000"
////              />
////            </TouchableOpacity>
////          </View>
////        </CameraView>
////      ) : (
////        <Text>Waiting for camera permission...</Text>
////      )}
////    </View>
////  );
////};
////
////const styles = StyleSheet.create({
////  backButton: {
////    position: 'absolute',
////    top: 50,
////    left: 20,
////    zIndex: 10,
////    backgroundColor: 'rgba(255,255,255,0.8)',
////    paddingHorizontal: 12,
////    paddingVertical: 6,
////    borderRadius: 8,
////  },
////  backButtonText: {
////    fontSize: 16,
////    color: '#007AFF',
////    fontWeight: 'bold',
////  },
////  cameraButtonsContainer: {
////    flex: 1,
////    backgroundColor: 'transparent',
////    flexDirection: 'row',
////    justifyContent: 'center',
////    alignItems: 'flex-end',
////    marginBottom: 10,
////  },
////  captureButton: {
////    backgroundColor: '#fff',
////    borderRadius: 50,
////    padding: 15,
////    paddingHorizontal: 20,
////    alignSelf: 'flex-end',
////    marginBottom: 130,
////  },
////});
////
////export default CameraCalibrationScreen;
////
//
//
//// Updated ScanCameraScreen with Cancel button
//import React, { useState, useEffect } from 'react';
//import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
//import { useNavigation } from '@react-navigation/native';
//import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
//import { FontAwesome } from '@expo/vector-icons';
//import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
//import { storage } from './firebase';
//import { auth } from './firebase';
//
//const { width, height } = Dimensions.get('window');
//
//const uploadVideoWithMetadata = async (uri, clientId, step) => {
//  try {
//    const response = await fetch(uri);
//    const blob = await response.blob();
//
//    const timestamp = Date.now();
//    const storagePath = `clients/${clientId}/${step}/recording_${timestamp}.mp4`;
//    const storageRef = ref(storage, storagePath);
//
//    const metadata = {
//      contentType: 'video/mp4',
//      customMetadata: {
//        clientId,
//        step,
//        timestamp: timestamp.toString(),
//      },
//    };
//
//    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
//
//    return new Promise((resolve, reject) => {
//      uploadTask.on(
//        'state_changed',
//        null,
//        (error) => reject(error),
//        async () => {
//          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//          console.log('Video uploaded. Download URL:', downloadURL);
//          resolve(downloadURL);
//        }
//      );
//    });
//  } catch (error) {
//    console.error("Upload error:", error);
//    throw error;
//  }
//};
//
//const CameraCalibrationScreen = () => {
//  const [permissionGranted, setPermissionGranted] = useState(null);
//  const [permission, requestPermission] = useCameraPermissions();
//  const [facing, setFacing] = useState<CameraType>('back');
//  const [camera, setCamera] = useState(null);
//  const [isRecording, setIsRecording] = useState(false);
//  const navigation = useNavigation();
//
//  useEffect(() => {
//    (async () => {
//      const { status } = await requestPermission();
//      if (status === 'granted') {
//        setPermissionGranted(true);
//        console.log("Camera permission granted.");
//      }
//    })();
//  }, []);
//
//  const handleStartRecording = async () => {
//    if (camera) {
//      setIsRecording(true);
//      console.log("Recording started...");
//
//      try {
//        const video = await camera.recordAsync();
//        console.log("Recording stopped. Video:", video);
//        setIsRecording(false);
//
//        if (video && video.uri) {
//          const clientId =
//            auth.currentUser?.displayName ||
//            auth.currentUser?.email?.replace(/[@.]/g, '_') ||
//            auth.currentUser?.uid;
//
//          if (!clientId) {
//            console.error("No valid client ID available.");
//            return;
//          }
//
//          const step = 'scan';
//          await uploadVideoWithMetadata(video.uri, clientId, step);
//
//          navigation.navigate('ViewVideoScreen', {
//            uri: video.uri,
//            type: 'video',
//            step: 'calibration',  // change to 'calibration', 'scan', or 'scaling' depend which page.
//            previousScreen: 'CameraCalibrationScreen',
//            nextScreen: 'CompleteScreen',
//          });
//        } else {
//          console.error("No video URI found!");
//        }
//      } catch (error) {
//        console.error("Error during recording:", error);
//        setIsRecording(false);
//      }
//    }
//  };
//
//  const handleStopRecording = () => {
//    if (camera && isRecording) {
//      console.log("Stopping recording...");
//      camera.stopRecording();
//      setIsRecording(false);
//    }
//  };
//
//  return (
//    <View style={{ flex: 1 }}>
//      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//        <Text style={styles.backButtonText}>✖️</Text>
//      </TouchableOpacity>
//
//      {permissionGranted ? (
//        <CameraView
//          style={{ flex: 1 }}
//          facing={facing}
//          ref={(ref) => setCamera(ref)}
//          mode={'video'}
//          mute={true}
//          autofocus={'on'}
//        >
//          <View style={styles.cameraButtonsContainer}>
//            <TouchableOpacity
//              style={styles.captureButton}
//              onPress={isRecording ? handleStopRecording : handleStartRecording}
//            >
//              <FontAwesome
//                name={isRecording ? "stop-circle" : "circle"}
//                size={40}
//                color="#000"
//              />
//            </TouchableOpacity>
//          </View>
//        </CameraView>
//      ) : (
//        <Text>Waiting for camera permission...</Text>
//      )}
//    </View>
//  );
//};
//
//const styles = StyleSheet.create({
//  backButton: {
//    position: 'absolute',
//    top: 50,
//    left: 20,
//    zIndex: 10,
//    backgroundColor: 'rgba(255,255,255,0.8)',
//    paddingHorizontal: 12,
//    paddingVertical: 6,
//    borderRadius: 8,
//  },
//  backButtonText: {
//    fontSize: 16,
//    color: '#007AFF',
//    fontWeight: 'bold',
//  },
//  cameraButtonsContainer: {
//    flex: 1,
//    backgroundColor: 'transparent',
//    flexDirection: 'row',
//    justifyContent: 'center',
//    alignItems: 'flex-end',
//    marginBottom: 10,
//  },
//  captureButton: {
//    backgroundColor: '#fff',
//    borderRadius: 50,
//    padding: 15,
//    paddingHorizontal: 20,
//    alignSelf: 'flex-end',
//    marginBottom: 130,
//  },
//});
//
//export default CameraCalibrationScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const CameraCalibrationScreen = () => {
  const [permissionGranted, setPermissionGranted] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [camera, setCamera] = useState(null);
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
          navigation.navigate('ViewVideoScreen', {
            uri: video.uri,
            type: 'video',
            step: 'calibration',  // change to 'calibration', 'scan', or 'scaling' depend which page.
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
          ref={(ref) => setCamera(ref)}
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

export default CameraCalibrationScreen;
