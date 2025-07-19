//import React, { useState, useEffect, useRef } from 'react';
//import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Dimensions, Image, FlatList, Modal, Animated } from 'react-native';
//import {useNavigation } from '@react-navigation/native';
//import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
////import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
////import * as SQLite from 'expo-sqlite'; 
//import AsyncStorage from 'react-native';
////import { Video } from 'expo-video';
//import * as Animatable from 'react-native-animatable';
//import Svg, { Path } from 'react-native-svg';
//
////const Stack = createStackNavigator();
//const { width, height } = Dimensions.get('window');
//
////////////////////////////////////////////////////////////////
///////////               Complete Page                /////////
////////////////////////////////////////////////////////////////
//// Here we open the Camera and Make the action of taking the picture.
//
//
//
//const CompleteScreen = () => {
//    console.log('CompletePage App is starting...');
//
//    const navigation = useNavigation();
//
//    const handleReturnToHome = () => {
//      navigation.navigate('HomeScreen');
//    };
//    
//  return (
//    <View style={styles.container}>
//      <Text style={styles.text}>Process Complete!</Text>
//      <Text style={styles.description}>Your 3D model is now being built, and we will notify you via email as soon as it’s ready.</Text>
//      <Button title="Back To Home Page" onPress={handleReturnToHome} />
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
//  text: {
//    fontSize: 24,
//    fontWeight: 'bold',
//  },
//    description: {
//        fontSize: 16,
//        fontStyle: 'italic',
//        textAlign: 'center',
//        color: '#555',
//        lineHeight: 24,
//        marginBottom: 20,
//        marginTop: 20,
//        paddingHorizontal: 20,
//      },
//      
//});
//
//export default CompleteScreen;


// CompleteScreen: shown after task upload, ensures clean navigation structure
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler, Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from './firebase';

const { width, height } = Dimensions.get('window');

const user = auth.currentUser;

const CompleteScreen = ({ route }: { route: any }) => {
  const step = route?.params?.step || 'Task';
  const navigation = useNavigation();
  const [nextTask, setNextTask] = useState<string | null>(null);

  useEffect(() => {
    const checkRemainingTasks = async () => {
      if (!user) return;
      const scan = await AsyncStorage.getItem(`${user.uid}_scanComplete`);
      const calibration = await AsyncStorage.getItem(`${user.uid}_calibrationComplete`);
      const scaling = await AsyncStorage.getItem(`${user.uid}_scalingComplete`);
      
      if (!scan) setNextTask('Scan');
      else if (!calibration) setNextTask('Calibration');
      else if (!scaling) setNextTask('Scaling');
      else setNextTask(null);
    };
    checkRemainingTasks();
  }, []);

  // Prevent swipe-back and hardware back to previous screens
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'index' as never }],
        });
        return true; // block default behavior
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation])
  );

  const handleGoHome = () => {
    navigation.reset({
      index: 1,
      routes: [
        { name: 'index' as never },
        { name: 'HomeScreen' as never }
      ],
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ {step?.charAt(0).toUpperCase() + step?.slice(1)} Complete!</Text>

      {nextTask ? (
        <Text style={styles.message}>Next, complete the {nextTask} step.</Text>
      ) : (
        <Text style={styles.message}>All steps completed. You're done!</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleGoHome}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: width * 0.075, // Responsive padding
  },
  title: {
    fontSize: width * 0.07, // Responsive font size
    fontWeight: 'bold',
    marginBottom: height * 0.025, // Responsive margin
    color: '#2c3e50',
  },
  message: {
    fontSize: width * 0.04, // Responsive font size
    color: '#555',
    textAlign: 'center',
    marginBottom: height * 0.037, // Responsive margin
  },
  button: {
    backgroundColor: '#A3826C',
    borderRadius: width * 0.062, // Responsive border radius
    paddingVertical: height * 0.015, // Responsive padding
    paddingHorizontal: width * 0.075, // Responsive padding
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.04, // Responsive font size
    fontWeight: 'bold',
  },
});

export default CompleteScreen;
