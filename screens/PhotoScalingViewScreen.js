import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { Camera } from 'expo-camera';
//import { RNCamera } from 'react-native-camera';

//import * as SQLite from 'expo-sqlite';
//import { Video } from 'expo-video';

const { width, height } = Dimensions.get('window');

const PhotoViewForScaleScreen = ({ route }) => {
    console.log('PhotoViewForScaleScreen App is starting...');

    const { uri, type, previousScreen, nextScreen } = route.params;
    const navigation = useNavigation();
    
    const handleSaveMedia = () => {
        const query = `INSERT INTO media (uri, type) VALUES (?, ?)`;
        const params = [uri, type];
        
    };
    
    async function uploadMedia() {
        const formData = new FormData();
        formData.append('file', { uri, name: 'scaleData.jpg', type: 'image/jpeg' });
        formData.append('type', 'scaleData');
        const localIp = "http://10.0.0.1:3001/uploadScaleData"; // replace with your actual IP and port
        
        try {
            await fetch(localIp, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
            console.log('Upload successful');
        } catch (error) {
            console.error('Upload failed', error);
        }
    }
    
    const handleContinue = async () => {
        handleSaveMedia();
        await uploadMedia();
        navigation.navigate(nextScreen, { uri, type });
    };
    
    const handleRetake = () => {
        //    navigation.navigate('Camera');
        //      navigation.goBack();
        navigation.navigate(previousScreen);
    };
    
    return (
            <View style={styles.container}>
            {type === 'photo' ? (
                                 <Image style={styles.fullScreenImage} source={{ uri }} resizeMode="contain" />
                                 ) : (
                                      <Video
                                      style={styles.fullScreenImage}
                                      source={{ uri }}
                                      useNativeControls
                                      resizeMode="contain"
                                      isLooping
                                      />
                                      )}
            <View style={styles.exitButtonsContainer}>
            <TouchableOpacity style={styles.exitButton} onPress={handleRetake}>
            <Text style={styles.exitButtonText}>X</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.photoButtonsContainer}>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
            </View>
            {loading && ( // Display loading indicator during processing
                         <View style={styles.loadingOverlay}>
                         <ActivityIndicator size="large" color="#ffffff" />
                         <Text style={styles.loadingText}>Processing...</Text>
                         </View>
                         )}
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
fullScreenImage: {
flex: 1,
width: '100%',
height: '100%',
},
photoButtonsContainer: {
position: 'absolute',
bottom: 20,
right: 10,
flexDirection: 'row',
justifyContent: 'space-between',
paddingHorizontal: 20,
},
exitButtonsContainer: {
position: 'absolute',
top: 20,
left: 0,
right: 0,
flexDirection: 'row',
justifyContent: 'space-between',
paddingHorizontal: 20,
},
continueButton: {
backgroundColor: 'white',
borderRadius: 5,
paddingVertical: 10,
paddingHorizontal: 20,
alignSelf: 'center',
},
continueButtonText: {
color: 'black',
fontWeight: 'bold',
fontFamily: './assets/fonts/PinyonScript-Regular',

},
exitButton: {
position: 'absolute',
top: 40,
right: 20,
backgroundColor: 'rgba(128, 128, 128, 0.5)', // Semi-transparent grey background
borderRadius: 50,
width: 40,
height: 40,
justifyContent: 'center',
alignItems: 'center',
},
exitButtonText: {
color: 'white',
fontWeight: 'bold',
fontSize: 20,
},
});

export default PhotoViewForScaleScreen;
