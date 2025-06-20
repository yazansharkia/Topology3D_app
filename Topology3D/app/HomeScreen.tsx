//
//import React, { useState } from 'react';
//import { View, Text, TextInput, Button, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
//import { useNavigation } from '@react-navigation/native';
//
//import { auth, db } from './firebase';
//import { reauthenticateWithCredential, EmailAuthProvider, deleteUser } from 'firebase/auth';
//import { deleteDoc, doc } from 'firebase/firestore';
//
//const HomeScreen = () => {
//  const [password, setPassword] = useState('');
//  const [isModalVisible, setIsModalVisible] = useState(false);
//  const navigation = useNavigation();
//  const user = auth.currentUser;
//  const isGuest = user?.isAnonymous; // Check if user is logged in as a guest
//    
//    const handleScan = () => {
//      navigation.navigate('ScanInfoScreen');// Yazan Moved it from Camera to ReadyToScan (changing the name of ReadyToScan to ScanInfoScreen)
//  };
//   
//    const handleViewPhotos = () => {
//  //    navigation.navigate('Photos');
//    };
//    const handleCameraCaibration = () => {
//      navigation.navigate('CameraCalibrationScreen');
//    };
//    const handleScale = () => {
//  //    navigation.navigate('Scaling');
//    };
//    const handleInstruction = () => {
//        navigation.navigate('InstructionsScreen')
//    }
//    const handleInitialPage = () => { // LoginPage, the index page
//        navigation.navigate('index')
//    }
//    const handleBack = () => {
//      navigation.goBack();
//    };
//  const handleDeleteAccount = async () => {
////    const user = auth.currentUser;
//
//    if (!user) {
//      alert("No user is signed in.");
//      return;
//    }
//
//    // Show the modal to ask for the password
//    setIsModalVisible(true);
//  };
//
//  const confirmDeletion = async () => {
//    const user = auth.currentUser;
//
//    if (!password) {
//      alert("Password is required to delete account.");
//      return;
//    }
//
//    try {
//      // 🔹 Reauthenticate User Before Deletion
//      const credential = EmailAuthProvider.credential(user.email, password);
//      await reauthenticateWithCredential(user, credential);
//
//      // 🔹 Delete user document from Firestore
//      await deleteDoc(doc(db, "users", user.uid));
//
//      // 🔹 Delete user authentication
//      await deleteUser(user);
//
//      alert("Your account and data have been deleted.");
//      navigation.navigate("LoginScreen"); // Redirect user to login
//    } catch (error) {
//      console.error("Error deleting account:", error);
//      alert(error.message);
//    } finally {
//      setIsModalVisible(false);
//      setPassword(''); // Clear password after attempt
//    }
//  };
//
//  return (
//    <View style={styles.container}>
//      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
//          <Text style={styles.backButtonText}>back</Text>
//      </TouchableOpacity>
//      <Text style={styles.title}>Scanning Page</Text>
//          <Button title="Calibrate your Camera" onPress={handleCameraCaibration} />
//          <Button title="Scan your Feet" onPress={handleScan} />
//          <Button title="Instruction" onPress={handleInstruction} />
//
//          {!isGuest && ( // Only show delete button if user is NOT a guest
//                  <Button title="Delete Account" onPress={handleDeleteAccount} color="red" />
//          )}
//          
//
//      {/* 🔹 Custom Modal for Password Input */}
//      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
//        <View style={styles.modalContainer}>
//          <View style={styles.modalContent}>
//            <Text style={styles.modalTitle}>Enter Your Password</Text>
//            <TextInput
//              style={styles.input}
//              placeholder="Password"
//              placeholderTextColor="#555"
//              secureTextEntry
//              value={password}
//              onChangeText={setPassword}
//            />
//            <View style={styles.buttonRow}>
//              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setIsModalVisible(false)}>
//                <Text style={styles.buttonText}>Cancel</Text>
//              </TouchableOpacity>
//              <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={confirmDeletion}>
//                <Text style={styles.buttonText}>Delete</Text>
//              </TouchableOpacity>
//            </View>
//          </View>
//        </View>
//      </Modal>
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
//  title: {
//    fontSize: 24,
//    fontWeight: 'bold',
//    color: 'black',
//    textAlign: 'center',
//    marginBottom: 40,
//  },
//  modalContainer: {
//    flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
//    backgroundColor: 'rgba(0,0,0,0.5)',
//  },
//  modalContent: {
//    width: '80%',
//    backgroundColor: 'white',
//    padding: 20,
//    borderRadius: 10,
//    alignItems: 'center',
//  },
//  modalTitle: {
//    fontSize: 18,
//    fontWeight: 'bold',
//    marginBottom: 10,
//  },
//  input: {
//    width: '100%',
//    height: 40,
//    borderWidth: 1,
//    borderRadius: 5,
//    paddingLeft: 10,
//    marginBottom: 10,
//    borderColor: '#ccc',
//  },
//  buttonRow: {
//    flexDirection: 'row',
//    justifyContent: 'space-between',
//    width: '100%',
//  },
//  button: {
//    flex: 1,
//    padding: 10,
//    margin: 5,
//    borderRadius: 5,
//    alignItems: 'center',
//  },
//  cancelButton: {
//    backgroundColor: 'gray',
//  },
//  deleteButton: {
//    backgroundColor: 'red',
//  },
//  buttonText: {
//    color: 'white',
//    fontWeight: 'bold',
//  },
//    backButton: {
//      position: 'absolute',
//      top: 60,
//      left: 25,
//      zIndex: 1,
//    },
//    backButtonText: {
//      fontSize: 16,
//      color: '#007AFF',
//    },
//});
//
//export default HomeScreen;

//// Updated HomeScreen with user welcome, logout, and settings modal
//import React, { useState } from 'react';
//import {
//  View,
//  Text,
//  Button,
//  TouchableOpacity,
//  Modal,
//  StyleSheet,
//  TextInput,
//  Alert,
//} from 'react-native';
//import { useNavigation } from '@react-navigation/native';
//import { auth, db } from './firebase';
//import {
//  reauthenticateWithCredential,
//  EmailAuthProvider,
//  deleteUser,
//  signOut,
//} from 'firebase/auth';
//import { deleteDoc, doc } from 'firebase/firestore';
//
//const HomeScreen = () => {
//  const navigation = useNavigation();
//  const user = auth.currentUser;
//  const isGuest = user?.isAnonymous;
//  const displayName = user?.displayName || user?.email || 'Guest';
//
//  const [isSettingsVisible, setSettingsVisible] = useState(false);
//  const [isModalVisible, setIsModalVisible] = useState(false);
//  const [password, setPassword] = useState('');
//
//  const handleLogout = async () => {
//    try {
//      await signOut(auth);
//      navigation.navigate('index');
//    } catch (error) {
//      console.error('Logout error:', error);
//      alert(error.message);
//    }
//  };
//
//  const handleDeleteAccount = async () => {
//    if (!user || isGuest) {
//      alert("Cannot delete guest account or user not found.");
//      return;
//    }
//    setIsModalVisible(true);
//  };
//    
//  const handleBack = () => {
//    navigation.goBack();
//  };
//    
//  const confirmDeletion = async () => {
//    try {
//      const credential = EmailAuthProvider.credential(user.email, password);
//      await reauthenticateWithCredential(user, credential);
//      await deleteDoc(doc(db, "users", user.uid));
//      await deleteUser(user);
//      alert("Account deleted successfully.");
//      navigation.navigate('index');
//    } catch (error) {
//      console.error("Error deleting account:", error);
//      alert(error.message);
//    } finally {
//      setIsModalVisible(false);
//      setPassword('');
//    }
//  };
//
//  return (
//    <View style={styles.container}>
//      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
//          <Text style={styles.backButtonText}>back</Text>
//      </TouchableOpacity>
//          
//      <Text style={styles.title}>Welcome, {displayName}!</Text>
//
//      <Button title="🎯 Calibrate Camera" onPress={() => navigation.navigate('CameraCalibrationScreen')} />
//      <Button title="👣 Scan Your Foot" onPress={() => navigation.navigate('ScanInfoScreen')} />
//      <Button title="📏 Scale with A4" onPress={() => alert('Scaling feature coming soon!')} />
//      <Button title="❓ Help / Instructions" onPress={() => navigation.navigate('InstructionsScreen')} />
//
//      <TouchableOpacity onPress={() => setSettingsVisible(true)} style={styles.settingsButton}>
//        <Text style={styles.settingsButtonText}>⚙️ Settings</Text>
//      </TouchableOpacity>
//
//      {/* Settings Modal */}
//      <Modal visible={isSettingsVisible} animationType="slide" transparent={true}>
//        <View style={styles.modalContainer}>
//          <View style={styles.modalContent}>
//            <Text style={styles.modalTitle}>Settings</Text>
//            {!isGuest && (
//              <Button title="Logout" onPress={handleLogout} color="#555" />
//            )}
//            {!isGuest && (
//              <Button title="Delete Account" onPress={handleDeleteAccount} color="red" />
//            )}
//            <Button title="Close" onPress={() => setSettingsVisible(false)} />
//          </View>
//        </View>
//      </Modal>
//
//      {/* Password Modal for Deletion */}
//      <Modal visible={isModalVisible} animationType="fade" transparent={true}>
//        <View style={styles.modalContainer}>
//          <View style={styles.modalContent}>
//            <Text>Enter your password to delete your account:</Text>
//            <TextInput
//              style={styles.input}
//              secureTextEntry
//              value={password}
//              onChangeText={setPassword}
//              placeholder="Password"
//            />
//            <View style={styles.buttonRow}>
//              <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
//              <Button title="Delete" onPress={confirmDeletion} color="red" />
//            </View>
//          </View>
//        </View>
//      </Modal>
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
//  backButton: {
//    position: 'absolute',
//    top: 60,
//    left: 25,
//    zIndex: 1,
//  },
//  backButtonText: {
//    fontSize: 16,
//    color: '#007AFF',
//  },
//  title: {
//    fontSize: 24,
//    fontWeight: 'bold',
//    marginBottom: 40,
//  },
//  settingsButton: {
//    marginTop: 20,
//  },
//  settingsButtonText: {
//    fontSize: 16,
//    color: '#007AFF',
//  },
//  modalContainer: {
//    flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
//    backgroundColor: 'rgba(0,0,0,0.5)',
//  },
//  modalContent: {
//    backgroundColor: 'white',
//    padding: 25,
//    borderRadius: 10,
//    width: '80%',
//  },
//  modalTitle: {
//    fontSize: 20,
//    fontWeight: 'bold',
//    marginBottom: 20,
//  },
//  input: {
//    borderWidth: 1,
//    borderRadius: 5,
//    padding: 10,
//    marginVertical: 10,
//    borderColor: '#ccc',
//  },
//  buttonRow: {
//    flexDirection: 'row',
//    justifyContent: 'space-between',
//  },
//});
//
//export default HomeScreen;

//// Updated HomeScreen with user welcome, logout, and settings modal
//import React, { useState } from 'react';
//import {
//  View,
//  Text,
//  Button,
//  TouchableOpacity,
//  Modal,
//  StyleSheet,
//  TextInput,
//  Alert,
//} from 'react-native';
//import { useNavigation } from '@react-navigation/native';
//import { auth, db } from './firebase';
//import {
//  reauthenticateWithCredential,
//  EmailAuthProvider,
//  deleteUser,
//  signOut,
//} from 'firebase/auth';
//import { deleteDoc, doc } from 'firebase/firestore';
//
//const HomeScreen = () => {
//  const navigation = useNavigation();
//  const user = auth.currentUser;
//  const isGuest = user?.isAnonymous;
//  const displayName = user?.displayName || user?.email || 'Guest';
//
//  const [isSettingsVisible, setSettingsVisible] = useState(false);
//  const [isModalVisible, setIsModalVisible] = useState(false);
//  const [password, setPassword] = useState('');
//
//  const handleLogout = async () => {
//    try {
//      await signOut(auth);
//      navigation.navigate('index');
//    } catch (error) {
//      console.error('Logout error:', error);
//      alert(error.message);
//    }
//  };
//
//  const handleDeleteAccount = async () => {
//    if (!user || isGuest) {
//      alert("Cannot delete guest account or user not found.");
//      return;
//    }
//    setIsModalVisible(true);
//  };
//
//  const handleBack = () => {
//    navigation.goBack();
//  };
//
//  const confirmDeletion = async () => {
//    try {
//      const credential = EmailAuthProvider.credential(user.email, password);
//      await reauthenticateWithCredential(user, credential);
//      await deleteDoc(doc(db, "users", user.uid));
//      await deleteUser(user);
//      alert("Account deleted successfully.");
//      navigation.navigate('index');
//    } catch (error) {
//      console.error("Error deleting account:", error);
//      alert(error.message);
//    } finally {
//      setIsModalVisible(false);
//      setPassword('');
//    }
//  };
//
//  return (
//    <View style={styles.container}>
//      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
//        <Text style={styles.backButtonText}>🔙</Text>
//      </TouchableOpacity>
//
//      <Text style={styles.title}>Welcome, {displayName}!</Text>
//
//      <Button title="🎯 Calibrate Camera" onPress={() => navigation.navigate('CameraCalibrationScreen')} />
//      <Button title="👣 Scan Your Foot" onPress={() => navigation.navigate('ScanInfoScreen')} />
//      <Button title="📏 Scale with A4" onPress={() => alert('Scaling feature coming soon!')} />
//      <Button title="❓ Help / Instructions" onPress={() => navigation.navigate('InstructionsScreen')} />
//
//      <TouchableOpacity onPress={() => setSettingsVisible(true)} style={styles.settingsButton}>
//        <Text style={styles.settingsButtonText}>⚙️ Settings</Text>
//      </TouchableOpacity>
//
//      {/* Settings Modal */}
//      <Modal visible={isSettingsVisible} animationType="slide" transparent={true}>
//        <View style={styles.modalContainer}>
//          <View style={styles.modalContent}>
//            <Text style={styles.modalTitle}>Settings</Text>
//            {!isGuest && (
//              <Button title="Logout" onPress={handleLogout} color="#555" />
//            )}
//            {!isGuest && (
//              <Button title="Delete Account" onPress={handleDeleteAccount} color="red" />
//            )}
//            <Button title="Close" onPress={() => setSettingsVisible(false)} />
//          </View>
//        </View>
//      </Modal>
//
//      {/* Password Modal for Deletion */}
//      <Modal visible={isModalVisible} animationType="fade" transparent={true}>
//        <View style={styles.modalContainer}>
//          <View style={styles.modalContent}>
//            <Text>Enter your password to delete your account:</Text>
//            <TextInput
//              style={styles.input}
//              secureTextEntry
//              value={password}
//              onChangeText={setPassword}
//              placeholder="Password"
//            />
//            <View style={styles.buttonRow}>
//              <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
//              <Button title="Delete" onPress={confirmDeletion} color="red" />
//            </View>
//          </View>
//        </View>
//      </Modal>
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
//  backButton: {
//    position: 'absolute',
//    top: 60,
//    left: 25,
//    zIndex: 1,
//  },
//  backButtonText: {
//    fontSize: 16,
//    color: '#007AFF',
//  },
//  title: {
//    fontSize: 24,
//    fontWeight: 'bold',
//    marginBottom: 40,
//  },
//  settingsButton: {
//    marginTop: 20,
//  },
//  settingsButtonText: {
//    fontSize: 16,
//    color: '#007AFF',
//  },
//  modalContainer: {
//    flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
//    backgroundColor: 'rgba(0,0,0,0.5)',
//  },
//  modalContent: {
//    backgroundColor: 'white',
//    padding: 25,
//    borderRadius: 10,
//    width: '80%',
//  },
//  modalTitle: {
//    fontSize: 20,
//    fontWeight: 'bold',
//    marginBottom: 20,
//  },
//  input: {
//    borderWidth: 1,
//    borderRadius: 5,
//    padding: 10,
//    marginVertical: 10,
//    borderColor: '#ccc',
//  },
//  buttonRow: {
//    flexDirection: 'row',
//    justifyContent: 'space-between',
//  },
//});
//
//export default HomeScreen;

// Updated HomeScreen with user welcome, logout, settings modal, and step progress tracking
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from './firebase';
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
  signOut,
} from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');

const user = auth.currentUser;

const HomeScreen = () => {
    
  const navigation = useNavigation();
  const isGuest = user?.isAnonymous;
  const displayName = user?.displayName || user?.email || 'Guest';

  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [progress, setProgress] = useState({
    scanComplete: false,
    calibrationComplete: false,
    scalingComplete: false,
  });

  useEffect(() => {
      const loadProgress = async () => {
//          const scan = await AsyncStorage.getItem('scanComplete');
          const scan = await AsyncStorage.getItem(`${user.uid}_scanComplete`);
          const calibration = await AsyncStorage.getItem(`${user.uid}_calibrationComplete`);
          const scale = await AsyncStorage.getItem(`${user.uid}_scalingComplete`);
          setProgress({
              scanComplete: scan === 'true',
              calibrationComplete: calibration === 'true',
              scalingComplete: scaling === 'true',
          });
          
          console.log('scanComplete from storage:', scan);
          console.log('calibration from storage:', calibration);
          console.log('scaling from storage:', scaling);
          

      };
    loadProgress();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('index');
    } catch (error) {
      console.error('Logout error:', error);
      alert(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user || isGuest) {
      alert("Cannot delete guest account or user not found.");
      return;
    }
    setIsModalVisible(true);
  };

  const handleBack = () => {
    navigation.goBack(); // need to navigate back to index screen, keeping the transtion backwards
  };

  const confirmDeletion = async () => {
    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);
      alert("Account deleted successfully.");
      navigation.navigate('index');
    } catch (error) {
      console.error("Error deleting account:", error);
      alert(error.message);
    } finally {
      setIsModalVisible(false);
      setPassword('');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>🔙</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Welcome, {displayName}!</Text>
      {/* 🔹 Progress Tracker */}
      <Button
        title={progress.calibrationComplete ? '🎯 Calibrate Camera ✅' : '🎯 Calibrate Camera ⬜'}
        onPress={() => navigation.navigate('CalibrationInfoScreen')}
      />

      <Button
        title={progress.scanComplete ? "👣 Scan Your Foot ✅" : "👣 Scan Your Foot ⬜"}
        onPress={() => navigation.navigate('ScanInfoScreen')}
      />

      <Button
        title={progress.scalingComplete ? '📏 Scale with A4 ✅' : '📏 Scale with A4 ⬜'}
        onPress={() => navigation.navigate('ScalingInfoScreen')}
      />
          
      <TouchableOpacity onPress={() => navigation.navigate('InstructionsScreen') } style={styles.InstructionsButton}>
        <Text style={styles.settingsButtonText}>❓</Text>
      </TouchableOpacity>
          
      <TouchableOpacity onPress={() => setSettingsVisible(true)} style={styles.settingsButton}>
        <Text style={styles.settingsButtonText}>⚙️ Settings</Text>
      </TouchableOpacity>


      {/* Settings Modal */}
      <Modal visible={isSettingsVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Settings</Text>
            {!isGuest && (
              <Button title="Logout" onPress={handleLogout} color="#555" />
            )}
            {!isGuest && (
              <Button title="Delete Account" onPress={handleDeleteAccount} color="red" />
            )}
            <Button title="Close" onPress={() => setSettingsVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Password Modal for Deletion */}
      <Modal visible={isModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Enter your password to delete your account:</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
            />
            <View style={styles.buttonRow}>
              <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
              <Button title="Delete" onPress={confirmDeletion} color="red" />
            </View>
          </View>
        </View>
      </Modal>
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
  backButton: {
    position: 'absolute',
    top: 60,
    left: 25,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  InstructionsButton:{
    position: 'absolute',
    bottom: 0,
    left: width*88/100,
    right: 0,
    height: height*94/100,
  },
    
  settingsButton: {
    marginTop: 20,
  },
  settingsButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  progressContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  stepDone: {
    color: 'green',
    fontWeight: 'bold',
    marginVertical: 4,
  },
  stepPending: {
    color: 'gray',
    fontStyle: 'italic',
    marginVertical: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    borderColor: '#ccc',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
