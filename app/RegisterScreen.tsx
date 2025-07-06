////import React, { useState, useEffect } from 'react';
////import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Dimensions, Image, FlatList, Modal,Animated } from 'react-native';
////import { useNavigation } from '@react-navigation/native';
////
//////import AsyncStorage from 'react-native';
////import { auth } from './firebase';  // <-- IMPORTANT: import your firebase 'auth'
////import { createUserWithEmailAndPassword , updateProfile} from 'firebase/auth'; // <-- from Firebase
////
////
////const { width, height } = Dimensions.get('window');
////
//////////////////////////////////////////////////////////////////
///////////// Register Page /////////
//////////////////////////////////////////////////////////////////
////
////const RegistrationScreen = () => {
////  console.log('RegistrationScreen App is starting...');
////
////  const [username, setUsername] = useState('');
//////  const [password, setPassword] = useState('');
////  const [email, setEmail] = useState('');
////  const [password, setPassword] = useState('');
////  const navigation = useNavigation();
////
////  const handleRegistration = async () => {
//////    try {
//////      await AsyncStorage.setItem('username', username);
//////      await AsyncStorage.setItem('password', password);
//////    } catch (error) {
//////      console.log('Error registering:', error);
//////    }
//////    alert(`Registered:\nUsername: ${username}\nPassword: ${password}`);
////      
////      try {
//////            // Create user in Firebase
//////            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//////            const user = userCredential.user;
//////
//////            alert(`Registered new user: ${user.email}`);
//////            // Navigate wherever you like, e.g. scanning screen
//////            navigation.navigate('Scanning');
////          // 1) Create the user with email/password
////                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
////                const user = userCredential.user;
////
////                // 2) Set the displayName to the username typed in
////                await updateProfile(user, {
////                  displayName: username,
////                });
////
//////                alert(`Registered new user: ${user.email}\nUsername: ${username}`);// for debug
////                navigation.navigate('HomeScreen');
////          } catch (error) {
////            console.log('Firebase registration error:', error);
////            alert(error.message);
////          }
////
//////    navigation.navigate('Scanning');
////  };
////
////  return (
////    <View style={styles.container}>
////    <Text style={styles.title}>3D Topology</Text>
////      <View style={styles.registrationBox}>
////        <TextInput
////           style={styles.input}
////           placeholder="Enter Username"
////           placeholderTextColor="#555555"
////           value={username}
////           onChangeText={setUsername}
////        />
////        <TextInput
////          style={styles.input}
////          placeholder="Enter Email"
////          placeholderTextColor="#555555"
////          value={email}
////          onChangeText={setEmail}
////        />
////        <TextInput
////          style={styles.input}
////          placeholder="Enter password"
////          placeholderTextColor="#555555"
////          value={password}
////          onChangeText={setPassword}
////          secureTextEntry
////        />
////        <Button title="Register" onPress={handleRegistration} />
////      </View>
////    </View>
////  );
////};
////
////
////const styles = StyleSheet.create({
////  container: {
////    flex: 1,
////    justifyContent: 'center',
////    alignItems: 'center',
////    backgroundColor: 'white',
////  },
////  title: {
////    fontSize: 24,
////    fontWeight: 'bold',
////    color: 'black',
////    textAlign: 'center',
////    marginBottom: 40,
////    // height: width,
////  },
////  registrationBox: {
////    width: '80%',
////    alignItems: 'center',
////    backgroundColor: 'white',
////    height: width- 1*width/3,
////  },
////  input: {
////    width: '100%',
////    height: 40,
////    // textAlign: 'center',
////    borderWidth: 1,
////    // borderColor: 'white',
////    borderRadius: 5,
////    paddingLeft: 10,
////    marginBottom: 10,
////
////  },
////  
////});
////
////export default RegistrationScreen;
//
//import React, { useState } from 'react';
//import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
//import { useNavigation } from '@react-navigation/native';
//import { auth } from './firebase';
//import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
//
//const { width } = Dimensions.get('window');
//
//const RegistrationScreen = () => {
//  const [username, setUsername] = useState('');
//  const [email, setEmail] = useState('');
//  const [password, setPassword] = useState('');
//  const navigation = useNavigation();
//
//  const handleRegistration = async () => {
//    try {
//      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//      const user = userCredential.user;
//
//      await updateProfile(user, {
//        displayName: username,
//      });
//
//      navigation.navigate('HomeScreen');
//    } catch (error) {
//      console.log('Firebase registration error:', error);
//      alert(error.message);
//    }
//  };
//
//  const handleCancel = () => {
//    navigation.goBack(); // This will return to the previous screen (Index)
//  };
//
//  return (
//    <View style={styles.container}>
//      {/* Cancel Button */}
//      <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
//        <Text style={styles.cancelButtonText}>Cancel</Text>
//      </TouchableOpacity>
//
//      <Text style={styles.title}>3D Topology</Text>
//      <View style={styles.registrationBox}>
//        <TextInput
//          style={styles.input}
//          placeholder="Enter Username"
//          placeholderTextColor="#555555"
//          value={username}
//          onChangeText={setUsername}
//        />
//        <TextInput
//          style={styles.input}
//          placeholder="Enter Email"
//          placeholderTextColor="#555555"
//          value={email}
//          onChangeText={setEmail}
//        />
//        <TextInput
//          style={styles.input}
//          placeholder="Enter Password"
//          placeholderTextColor="#555555"
//          value={password}
//          onChangeText={setPassword}
//          secureTextEntry
//        />
//        <Button title="Register" onPress={handleRegistration} />
//      </View>
//    </View>
//  );
//};
//
//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    justifyContent: 'center',
//    backgroundColor: 'white',
//    paddingTop: 60, // Gives space for the cancel button
//    alignItems: 'center',
//  },
//  cancelButton: {
//    position: 'absolute',
//    top: 20,
//    left: 20,
//    zIndex: 1,
//  },
//  cancelButtonText: {
//    fontSize: 16,
//    color: '#007AFF', // iOS-style blue
//  },
//  title: {
//    fontSize: 24,
//    fontWeight: 'bold',
//    color: 'black',
//    textAlign: 'center',
//    marginBottom: 40,
//  },
//  registrationBox: {
//    width: '80%',
//    alignItems: 'center',
//    backgroundColor: 'white',
//    height: width - width / 3,
//  },
//  input: {
//    width: '100%',
//    height: 40,
//    borderWidth: 1,
//    borderRadius: 5,
//    paddingLeft: 10,
//    marginBottom: 10,
//  },
//});
//
//export default RegistrationScreen;
import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const { width,hight } = Dimensions.get('window');

const RegistrationScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegistration = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
      });

      navigation.navigate('HomeScreen');
    } catch (error) {
      console.log('Firebase registration error:', error);
      alert(error.message);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <Text style={styles.title}>3D Topology</Text>
        <View style={styles.registrationBox}>
          <TextInput
            style={styles.input}
            placeholder="Enter Username"
            placeholderTextColor="#555555"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            placeholderTextColor="#555555"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            placeholderTextColor="#555555"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Register" onPress={handleRegistration} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EFEFEE',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20, // Additional spacing just in case
  },
  cancelButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 40,
    marginTop: width - width / 2,
  },
  registrationBox: {
    width: '80%',
    alignItems: 'center',
    height: width - width / 3,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
});

export default RegistrationScreen;
