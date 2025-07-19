import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Dimensions, Image, FlatList, Modal,Animated,Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';

//import * as SQLite from 'expo-sqlite';
import AsyncStorage from 'react-native';
import { auth } from './firebase'; // <-- your firebase file
import { signInWithEmailAndPassword , signInAnonymously} from 'firebase/auth'; // <-- from Firebase

const { width, height } = Dimensions.get('window');

//const Stack = createStackNavigator();
//const { width, height } = Dimensions.get('window');

//const db = SQLite.openDatabase('photos.db');

//////////////////////////////////////////////////////////////
///////// Login Page, TODO move to a seperate Page   /////////
//////////////////////////////////////////////////////////////

const LoginScreen = () => {
  console.log('LoginScreen App is starting...');

//  const [username, setUsername] = useState('');
//  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
  const navigation = useNavigation();

  const handleLogin = async () => {
//    try {
//      const storedUsername = await AsyncStorage.getItem('username');
//      const storedPassword = await AsyncStorage.getItem('password');
//
//      if (storedUsername === username && storedPassword === password) {
//        navigation.navigate('Instructions');
//      } else {
//        alert('Invalid username or password');
//      }
//    } catch (error) {
//      console.log('Error logging in:', error);
//    }
      try {
            // Firebase auth sign-in
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

//            alert(`Logged in as: ${user.email}`);// For debug
//            navigation.navigate('Instructions'); // or your next screen
          } catch (error) {
            console.log('Sign-in error:', error);
            const err = error as Error;
            alert(err.message);
          }
       
  };

    
  const handleWebsitePress = () => {
      // Opens your Squarespace website in the mobile browser
      Linking.openURL('https://www.topology3d.com');
    };

    // Handler to update dimensions on screen orientation change
    const updateDimensions = () => {
      const { width, height } = Dimensions.get('window');
      setScreenWidth(width);
      setScreenHeight(height);
    };

    useEffect(() => {
      // Listen for orientation changes
      Dimensions.addEventListener('change', updateDimensions);

      return () => {
        // Clean up the event listener on unmount
//        Dimensions.removeEventListener('change', updateDimensions);
      };
    }, []);
    
    const handleAnonymousSignIn = async () => {
      try {
        const userCredential = await signInAnonymously(auth);
        const user = userCredential.user;
        console.log('Signed in anonymously:', user);
        
        // Navigate to the home screen or scanning page
        navigation.navigate('HomeScreen' as never);
      } catch (error) {
        console.log('Anonymous Sign-in error:', error);
        const err = error as Error;
        alert(err.message);
      }
    };
    
  return (
          
    <View style={styles.container}>
          <TouchableOpacity onPress={handleWebsitePress} style={[styles.titleContainer,{top:screenHeight*0.4}]}>
          <Text style={[styles.title,{top:-screenHeight*0.18}]}>Topology3D</Text>
          </TouchableOpacity>
          <View style={[styles.loginBox,{top:screenHeight*0.04 }]}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#555555"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#555555"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
        <Button title="Register" onPress={() => navigation.navigate('RegisterScreen' as never)} />
 
        <TouchableOpacity style={styles.anonymousButton} onPress={handleAnonymousSignIn}>
          <Text style={styles.anonymousButtonText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>
          <TouchableOpacity onPress={handleWebsitePress} style={[styles.FootertitleContainer,{top: screenHeight*0.86}]}>
          <Text style={styles.FooterTitle}>topology3d.com</Text>
          </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFEFEE',
  },
    titleContainer: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        marginBottom: height * 0.05, // Responsive margin
    },
    title: {
        fontSize: width * 0.1, // Responsive font size
        color: '#A3826C',
        textAlign: 'center',
        marginBottom: height * 0.05, // Responsive margin
    },
    FootertitleContainer: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
    },
    FooterTitle: {
        fontSize: width * 0.05, // Responsive font size
        color: '#A3826C',
        textAlign: 'center',
        marginBottom: height * 0.012, // Responsive margin
    },
    loginBox: {
        width: '80%',
        alignItems: 'center',
        backgroundColor: '#EFEFEE',
    },
    input: {
        width: '100%',
        height: height * 0.05, // Responsive height
        borderWidth: 1,
        borderRadius: width * 0.012, // Responsive border radius
        paddingLeft: width * 0.025, // Responsive padding
        marginBottom: height * 0.012, // Responsive margin
    },
    button: {
        backgroundColor: '#EFEFEE',
        paddingVertical: height * 0.015, // Responsive padding
        paddingHorizontal: width * 0.05, // Responsive padding
        borderRadius: width * 0.02, // Responsive border radius
        marginBottom: height * 0.012, // Responsive margin
    },
    buttonText: {
        fontSize: width * 0.045, // Responsive font size
        color: '#EFEFEE',
        fontWeight: 'bold',
    },
    anonymousButton: {
      backgroundColor: '#A3826C',
      borderRadius: width * 0.02, // Responsive border radius
      paddingVertical: height * 0.015, // Responsive padding
      paddingHorizontal: width * 0.05, // Responsive padding
      marginTop: height * 0.012, // Responsive margin
      alignItems: 'center',
      borderColor: '#A3826C',
      borderWidth: 2,
    },
    anonymousButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: width * 0.04, // Responsive font size
    },
});

export default LoginScreen;

