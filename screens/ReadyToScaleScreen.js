import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Dimensions, Image, FlatList, Modal,Animated,ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
//import { Camera } from 'expo-camera';
//import { RNCamera } from 'react-native-camera';

//import * as SQLite from 'expo-sqlite';
import AsyncStorage from 'react-native';
//import { Video } from 'expo-video';

//const Stack = createStackNavigator();
const { width, height } = Dimensions.get('window');

//const db = SQLite.openDatabase('photos.db');

//////////////////////////////////////////////////////////////
///////// Scanning Page, TODO move to a seperate Page/////////
//////////////////////////////////////////////////////////////
// This Page include and navigate to 2 screens: 1) Scan, 2) view Photos. it behaves and acts as a medium when login and the other Pages (Gallary and Camera)
const ReadyToScaleScreen = () => {
  console.log('ReadyToScaleScreen App is starting...');

  const navigation = useNavigation();

  const handleScan = () => {
    navigation.navigate('Scaling');
  };
return (
        <ImageBackground style={styles.background}>
        <View style={styles.container}>

        <Text style={styles.sectionTitle}>Scaling your Foot</Text>
            <Text style={styles.sectionText}>
        Place an A4 Paper besides your foot. to obtain the acurate scale for your foot.
            </Text>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.continueButton} onPress={handleScan}>
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>

        </ImageBackground>

        );

  };



const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#EFEFEE',
},
background: {
flex: 1,
resizeMode: 'cover',
},
sectionTitle: {
fontSize: 35,
fontWeight: 'bold',
color: '#A3826C',
fontFamily: './assets/fonts/PinyonScript-Regular',
marginBottom: 50,
marginTop: 70,
},
sectionText: {
fontSize: 18,
textAlign: 'center',
color: 'black',
fontFamily: './assets/fonts/PinyonScript-Regular',
marginBottom: 200,
alignItems: 'center',
height:height - 1.9*width,
width: '70%',

},
footer: {
marginTop: 10,
alignItems: 'center',
width: '100%',
},
continueButton: {
backgroundColor: 'white',
borderRadius: 8,
padding: 10,
paddingLeft: width/35,
paddingRight: width/35,

},
continueButtonText: {
color: 'black',
fontWeight: 'bold',
fontFamily: './assets/fonts/PinyonScript-Regular',

},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  color: 'black',
  textAlign: 'center',
  marginBottom: 40,
  // height: width,
},
});

export default ReadyToScaleScreen;


