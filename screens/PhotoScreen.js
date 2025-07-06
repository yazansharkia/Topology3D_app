import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Dimensions, Image, FlatList, Modal,Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
//import { Camera } from 'expo-camera';
//import { RNCamera } from 'react-native-camera';

//import * as SQLite from 'expo-sqlite';
import AsyncStorage from 'react-native';
//import { Video } from 'expo-video';

//const Stack = createStackNavigator();
const { width, height } = Dimensions.get('window');


//////////////////////////////////////////////////////////////
///////// Photo Page, TODO move to a seperate Page   /////////
//////////////////////////////////////////////////////////////
// Here we stack the pictures that we captured, and we offer for each picture an interaction by pressing on it, then it will enlarged, and offer you option to delete if nessecary.

const PhotosScreen = () => {

    //  const [photos, setPhotos] = useState([]);
    const [media, setMedia] = useState([]);
    //  const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedMedia, SetSelectedMedia] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const scaleValue = useState(new Animated.Value(0))[0];
    const navigation = useNavigation();

    const handleOpenModal = (mediaItem) => {
        //    setSelectedPhoto(photo);
        SetSelectedMedia(mediaItem);
        setModalVisible(true);
        Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        }).start();
    };
    const handleCloseModal = () => {
        Animated.spring(scaleValue, {
        toValue: 0,
        useNativeDriver: true,
        }).start(() => {
            setModalVisible(false);
        });
        
        SetSelectedMedia(null);
    };
    
    const modalContentStyle = {
    transform: [{ scale: scaleValue }],
    };
        
    const renderItem = ({ item }) => {
      return item.type === 'photo' ? (
        <TouchableOpacity onPress={() => handleOpenModal(item)}>
          <Image style={styles.mediaImage} source={{ uri: item.uri }} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => handleOpenModal(item)}>
          <Video
            style={styles.mediaImage}
            source={{ uri: item.uri }}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        </TouchableOpacity>
      );
    };


    
    const handleDeleteMedia = (uri) => {
        Animated.spring(scaleValue, {
        toValue: 0,
        useNativeDriver: true,
        }).start(() => {
            setModalVisible(false);
        });
        
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM media WHERE uri = ?', [uri], () => {
                setMedia((prevPhotos) => prevPhotos.filter((photo) => photo.uri !== uri));
                SetSelectedMedia(null);
            });
        });
    };
    
    const uploadVideo = async (videoUri) => {
      const formData = new FormData();
      formData.append('video', { uri: videoUri, name: 'video.mp4', type: 'video/mp4' });
      const localIp = "http://192.168.0.103:3000/upload"; // replace with your actual IP and port // Dap_home Ip is 10.0.0.13

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
    };
        
    return (
            <View style={styles.container}>
                <Modal visible={modalVisible} transparent={true} animationType="fade">
                    <TouchableOpacity style={styles.modalContainer} activeOpacity={0} onPress={handleCloseModal}>
                        <Animated.View style={[styles.modalContent, modalContentStyle]}>
                            <View style={styles.modalInnerContainer}>
                                
                                {selectedMedia && selectedMedia.uri && (
                                  selectedMedia.type === 'photo' ? (
                                    <Image style={styles.modalImage} source={{ uri: selectedMedia.uri }} />
                                  ) : (
                                    <Video
                                      style={styles.modalImage}
                                      source={{ uri: selectedMedia.uri }}
                                      useNativeControls
                                      resizeMode="contain"
                                      isLooping
                                    />
                                  )
                                )}
                                <View style={styles.modalButtonsContainer}>
                                    <TouchableOpacity style={styles.modalButton} onPress={() => handleDeleteMedia(selectedMedia.uri)} // This function needs to handle both photos and videos
                                    >
                                        <Text style={styles.modalButtonText}>Delete</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal} >
                                        <Text style={styles.modalButtonText}>Close</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalButton} onPress={uploadVideo}>
                                      <Text style={styles.modalButtonText}>Upload</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
                </Modal>
                <Text style={styles.title}>Media</Text>
                <FlatList
                data={media} // This should be updated to 'media' if you're also handling videos
                renderItem={renderItem} // Make sure this function handles both photos and videos
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                contentContainerStyle={styles.photoContainer}
                />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 40,
    // height: width,
  },
  photoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  mediaImage: {
    width: width / 2 - 20,
    height: width / 2 - 20,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 13,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalImage: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height - 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  modalButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 20,
    alignSelf: 'flex-start',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  modalButtonsContainer: {
    flexDirection: 'row',
  },

});

export default PhotosScreen;
