import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Dimensions, Image, FlatList, Modal,Animated,Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';

//import * as SQLite from 'expo-sqlite';
import AsyncStorage from 'react-native';
import { auth } from './firebase'; // <-- your firebase file
import { signInWithEmailAndPassword , signInAnonymously} from 'firebase/auth'; // <-- from Firebase


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
            alert(error.message);
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
        navigation.navigate('HomeScreen'); // Change this to the appropriate screen
      } catch (error) {
        console.log('Anonymous Sign-in error:', error);
        alert(error.message);
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
        <Button title="Register" onPress={() => navigation.navigate('RegisterScreen')} />
 
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
        width: '100%',          // Adjusts the title position to be at 10% of the screen height // Makes sure the title is centered
        alignItems: 'center', // Center the title horizontally
        marginBottom: 40,
    },
    title: {
        fontSize: 40, // Adjust this value to make the text larger
    //    fontWeight: 'bold',
        color: '#A3826C', // Same color as the default button color
        textAlign: 'center',
        marginBottom: 40,
    },
    FootertitleContainer: {
        position: 'absolute',
         // Adjusts the title position to be at 10% of the screen height
        width: '100%', // Makes sure the title is centered
        alignItems: 'center', // Center the title horizontally
    },
    FooterTitle: {
        fontSize: 20, // Adjust this value to make the text larger
        //    fontWeight: 'bold',
        color: '#A3826C', // Same color as the default button color
        textAlign: 'center',
        marginBottom: 10,
    },
    loginBox: {
        width: '80%',
        alignItems: 'center',
        backgroundColor: '#EFEFEE',
//        height: width- 2*width/3,
    },
    input: {
        width: '100%',
        height: 40,
         borderWidth: 1,
         borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#EFEFEE',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 18,
        color: '#EFEFEE',
        fontWeight: 'bold',
    },
    anonymousButton: {
      backgroundColor: '#A3826C', // Same as other buttons
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 20,
      marginTop: 10,
      alignItems: 'center',
      borderColor: '#A3826C',
      borderWidth: 2,
    },
    anonymousButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },

});

export default LoginScreen;

