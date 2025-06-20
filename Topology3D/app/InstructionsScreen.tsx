import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const steps = [
  { key: '1', title: 'Step 1', content: 'Camera Calibration', image: require('./assets/ChessBoard.png'), description: 'The app utilizes the camera’s intrinsic and extrinsic capabilities to acquire and build an accurate 3D model.'},
  { key: '2', title: 'Step 2', content: 'Scan Your Foot', image: require('./assets/phone.png') , description: 'The app uploads the scan of the foot, then it builds a 3D model using SFM techniques and triangulation, utilizing the intrinsic and extrinsic parameters to construct the 3D model.'},
  { key: '3', title: 'Step 3', content: 'Scaling', image: require('./assets/a4_paper.png'), description: 'The app then scales the 3D model to the correct size for accuracy in measurements.' },
  { key: '4', title: 'Step 4', content: 'Complete', image: require('./assets/checkmark.png'), description: 'Once everything is done, we will notify you accordingly. For further details, check out our website.' },
];

export default function InstructionsScreen() {
  console.log('InstructionsScreen App is starting...');

  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation();

  const handlePageChange = (event) => {
    setCurrentPage(event.nativeEvent.position);
  };

  return (
    <View style={styles.container}>
      {/* Step Tabs */}
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.tabContainer}>
        {steps.map((step, index) => (
          <Text
            key={step.key}
            style={[
              styles.tab,
              currentPage === index && styles.activeTab, // Highlight the active step
            ]}
          >
            {step.title}
          </Text>
        ))}
      </View>
    </SafeAreaView>
      {/* PagerView */}
      <PagerView style={styles.container} initialPage={0} onPageSelected={handlePageChange}>
        {steps.map((step, index) => (
          <View key={step.key} style={styles.page}>
            <Text style={styles.title}>{step.content}</Text>
            <Animatable.Image
              animation="pulse"
              iterationCount="infinite"
              style={styles.image}
              source={step.image}
            />
            <Text style={styles.description}> {step.description} </Text>
            {step.key === '4' && (
              <TouchableOpacity
                style={styles.continueButton}
                  onPress={() =>
                    navigation.reset({
                      index: 1,
                      routes: [
                        { name: 'index' },
                        { name: 'HomeScreen' },
                      ],
                    })
                  }

              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </PagerView>

      {/* Dots Pagination */}
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.dotsContainer}>
        {steps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentPage === index && styles.activeDot, // Highlight the current dot
            ]}
          />
        ))}
      </View>
    </SafeAreaView>
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  /** Step Tabs **/
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#F7F7F7',
  },
  tab: {
    fontSize: 14,
    color: '#A3826C',
    opacity: 0.5,
  },
  activeTab: {
    fontWeight: 'bold',
    opacity: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#A3826C',
  },

  /** Page Content **/
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },

  /** Continue Button **/
  continueButton: {
    backgroundColor: '#A3826C',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 20,      
  },
  continueButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  /** Dots Pagination **/
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#A3826C',
    marginHorizontal: 5,
    opacity: 0.3,
    
  },
  activeDot: {
    opacity: 1,
  },
    description: {
      fontSize: 16,
      color: '#555',
      textAlign: 'center',
      paddingHorizontal: 20,
      marginTop: 10,
    },
    safeArea: {
      backgroundColor: '#FFFFFF',
        
    },


});
