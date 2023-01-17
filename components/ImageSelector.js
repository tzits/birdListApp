import { View, StyleSheet, Image } from 'react-native'
import { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import ImageButton from './ImageButton'
import { useIsFocused } from '@react-navigation/native'



const ImageSelector = ({onPickImage}) => {
    const [pickedImage, setPickedImage] = useState(null)
    const [rerender, setRerender] = useState(false)

    const isFocused = useIsFocused()


    useEffect(() => {
        if (!rerender) {
            setRerender(true)
        } else {
            setRerender(false)
            setPickedImage()
        }

    },[isFocused])


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16,9],
            quality: .5,
        })

        if (!result.canceled) {
            setPickedImage(result.assets[0].uri)
            onPickImage(result.assets[0].uri)
        }
    }

    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    const verifyPermissions = async () => {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission()
            return permissionResponse.granted;
        }
        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            alert('Please Grant Permission')
            return false
        }
        return true
    }

    const useCameraHandler = async () => {
        const hasPermission = await verifyPermissions()

        if (!hasPermission) {
            return
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5,
        });

        setPickedImage(image.assets[0].uri)
        onPickImage(image.assets[0].uri)
    }

    let imagePreview = <View></View>

    if (pickedImage) {
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />
    }

    return(
        <View style={styles.container}>
            {imagePreview}
            <View style={styles.buttonContainer}>
                <View style={styles.buttonView}>
                    <ImageButton onPress={pickImage} text={'Pick Image'} />
                </View>
                <View style={styles.buttonView}>
                    <ImageButton onPress={useCameraHandler} text={'Take a Picture'} />
                </View>
            </View>
        </View>
    )
}

export default ImageSelector

const styles = StyleSheet.create({
    container: {
        width: 340,
        alignItems: 'center', 
        backgroundColor: 'darkgreen',
        flex: 1
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    image: {
        width: 300, 
        height: 300,
        marginVertical: 20
    },
    buttonView: {
        marginHorizontal: 3
    }
})
