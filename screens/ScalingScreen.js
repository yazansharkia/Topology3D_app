import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Dimensions, Image, FlatList, Modal, Animated, PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
//import { RNCamera } from 'react-native-camera';

//import * as SQLite from 'expo-sqlite';
import AsyncStorage from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
//import { PerspectiveCamera, Scene, PlaneGeometry, MeshBasicMaterial, Mesh } from 'three';
import { Video } from 'expo-video';
import * as Animatable from 'react-native-animatable';
import Svg, { Path } from 'react-native-svg';

//const Stack = createStackNavigator();
const { width, height } = Dimensions.get('window');

//////////////////////////////////////////////////////////////
///////// Camera Page, TODO move to a separate Page  /////////
//////////////////////////////////////////////////////////////
// Here we open the Camera and Make the action of taking the picture.

const ScalingScreen = () => {
  console.log('ScalingScreen App is starting...');

  const [hasPermission, setHasPermission] = useState(null);
  const [facing, setFacing] = useState('back');
  const [camera, setCamera] = useState(null);
  const [focusPoint, setFocusPoint] = useState({ x: 0.5, y: 0.5 })
  const cameraRef = useRef(null);
  const [focusDepth, setFocusDepth] = useState(0); // Initialize focus depth
  const [showFocusIndicator, setShowFocusIndicator] = useState(false);
  const [type] = useState('back');
  const navigation = useNavigation();

  const arRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraARRef = useRef(null);
  const planeRef = useRef(null);
    
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  const handleCameraReady = () => {
    // TODO: Implement blinking logic if needed
  };

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      navigation.navigate('PhotoForScaleView', { uri: photo.uri, type: 'photo',previousScreen: 'Scaling', nextScreen: 'ReadyToScan'});  
    }
  };
    const handleFocus = (event) => {
      const { locationX, locationY } = event.nativeEvent;
      const x = locationX / width;
      const y = locationY / height;
      setFocusPoint({ x, y });
      setShowFocusIndicator(true);

        
        // Simulate changing focus depth (this is not a precise method)
        const newFocusDepth = (1 - y) * 2; // Example calculation for focus depth
        setFocusDepth(newFocusDepth);
        
      setTimeout(() => setShowFocusIndicator(false), 1000); // Hide the focus indicator after 1 second
    };
        
  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={() => requestPermissionsAsync().then(({ status }) => setHasPermission(status === 'granted'))} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
          style={{ flex: 1 }}
          facing={facing}
          ref={(ref) => setCamera(ref)}
          type={type}
          autoFocus={Camera.Constants.AutoFocus.on}
          focusDepth={focusDepth} // Use focusDepth for camera focus
        >
         
        <View style={styles.cameraButtonsContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Text style={styles.modalButtonText}>Capture</Text>
          </TouchableOpacity>
        </View>
          </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 40,
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
  modalButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  animationContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -200 }],
    zIndex: 1,
    width: 50,
    height: 50,
  },
  phoneIconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: [{ translateX: -25 }, { translateY: -25 }],
    width: 100,
    height: 100,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
focusIndicator: {
  position: 'absolute',
  width: 50,
  height: 50,
  borderRadius: 25,
  borderWidth: 2,
  borderColor: 'yellow',
},
});

Animatable.initializeRegistryWithDefinitions({
  movePhone: {
    0: { transform: [{ translateX: 0 }, { translateY: 130 }] },
    0.5: { transform: [{ translateX: 90 }, { translateY: 125 }] },
    1: { transform: [{ translateX: 180 }, { translateY: 130 }] },
  },
});

export default ScalingScreen;
