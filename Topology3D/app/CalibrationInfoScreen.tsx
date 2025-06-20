
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const CalibrationInfoScreen = () => {
  console.log('ScanInfoScreen App is starting...');
  const navigation = useNavigation();

  const handleScan = () => {
    navigation.navigate('CameraCalibrationScreen');
  };
    const handleBack = () => {
      navigation.goBack();
    };

  return (
    <ImageBackground style={styles.background}>
      <View style={styles.container}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>🔙</Text>
          </TouchableOpacity>
        {/* Title */}
        <Text style={styles.sectionTitle}>Calibrate your camera</Text>
        <Text style={styles.sectionText}>
          Start scanning the chess board in our website.
        </Text>

          {/* Continue Button */}
          <TouchableOpacity style={styles.continueButton} onPress={handleScan}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
          
        {/* Privacy Notice Box */}
        <View style={styles.privacyBox}>
          <Ionicons name="shield-checkmark" size={24} color="#A3826C" style={styles.privacyIcon} />
          <Text style={styles.privacyText}>
            This app collects visual data of your foot to generate a 3D model for custom shoe fitting.
            Your data is stored securely and used only for model construction, product improvement, and customer support.
            We never sell or share your data with third parties. By proceeding, you consent to this data usage.
            You can request data deletion at any time.
          </Text>
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
    paddingHorizontal: 20,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#A3826C',
    marginBottom: 30,
    marginTop: 30,
  },
  sectionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#444',
    marginBottom: 20,
    marginTop: 100,
    width: '80%',
    top: -height*0.001,
      
  },
  privacyBox: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 50,
    top: height*0.19,
  },
  privacyIcon: {
    marginRight: 10,
    marginTop: 5,
  },
  privacyText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  continueButton: {
    backgroundColor: '#A3826C',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    top: height*0.18,
    marginBottom: 50,
    
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
});

export default CalibrationInfoScreen;
