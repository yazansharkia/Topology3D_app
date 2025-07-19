
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const ScalingInfoScreen = () => {
  const navigation = useNavigation();

  const handleScan = () => {
    navigation.navigate('ScalingCameraScreen' as never);
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
        <Text style={styles.sectionTitle}>Scale your model</Text>
        <Text style={styles.sectionText}>
          Position your foot next to an A4-size blank paper. Take a clear top-down photo (from above), to help us scale your model accurately.
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
    paddingHorizontal: width * 0.05, // Responsive padding
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  sectionTitle: {
    fontSize: width * 0.08, // Responsive font size
    fontWeight: 'bold',
    color: '#A3826C',
    marginBottom: height * 0.037, // Responsive margin
    marginTop: height * 0.037, // Responsive margin
  },
  sectionText: {
    fontSize: width * 0.045, // Responsive font size
    textAlign: 'center',
    color: '#444',
    marginBottom: height * 0.025, // Responsive margin
    marginTop: height * 0.125, // Responsive margin
    width: '80%',
    top: -height * 0.001,
  },
  privacyBox: {
    backgroundColor: '#FFF',
    borderRadius: width * 0.03, // Responsive border radius
    padding: width * 0.037, // Responsive padding
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: height * 0.062, // Responsive margin
    top: height * 0.19,
  },
  privacyIcon: {
    marginRight: width * 0.025, // Responsive margin
    marginTop: height * 0.006, // Responsive margin
  },
  privacyText: {
    fontSize: width * 0.035, // Responsive font size
    color: '#333',
    flex: 1,
  },
  continueButton: {
    backgroundColor: '#A3826C',
    borderRadius: width * 0.075, // Responsive border radius
    paddingVertical: height * 0.015, // Responsive padding
    paddingHorizontal: width * 0.1, // Responsive padding
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    top: height * 0.18,
    marginBottom: height * 0.062, // Responsive margin
  },
  continueButtonText: {
    color: 'white',
    fontSize: width * 0.045, // Responsive font size
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: height * 0.075, // Responsive positioning
    left: width * 0.062, // Responsive positioning
    zIndex: 1,
  },
  backButtonText: {
    fontSize: width * 0.04, // Responsive font size
    color: '#007AFF',
  },
});

export default ScalingInfoScreen;
