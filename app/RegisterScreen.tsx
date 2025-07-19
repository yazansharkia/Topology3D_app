import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const { width, height } = Dimensions.get('window');

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

      navigation.navigate('HomeScreen' as never);
    } catch (error) {
      console.log('Firebase registration error:', error);
      const err = error as Error;
      alert(err.message);
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
    paddingTop: height * 0.025, // Responsive padding
  },
  cancelButton: {
    position: 'absolute',
    top: height * 0.025, // Responsive positioning
    left: width * 0.05, // Responsive positioning
    zIndex: 1,
  },
  cancelButtonText: {
    fontSize: width * 0.04, // Responsive font size
    color: '#007AFF',
  },
  title: {
    fontSize: width * 0.06, // Responsive font size
    fontWeight: 'bold',
    color: 'black',
    marginBottom: height * 0.05, // Responsive margin
    marginTop: height * 0.1, // Responsive margin
  },
  registrationBox: {
    width: '80%',
    alignItems: 'center',
    height: height * 0.4, // Responsive height
  },
  input: {
    width: '100%',
    height: height * 0.05, // Responsive height
    borderWidth: 1,
    borderRadius: width * 0.012, // Responsive border radius
    paddingLeft: width * 0.025, // Responsive padding
    marginBottom: height * 0.012, // Responsive margin
  },
});

export default RegistrationScreen;
