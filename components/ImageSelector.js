import { View, StyleSheet, Button, Image} from 'react-native'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'

const ImageSelector = () => {
    const [image, setImage] = useState()

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16,9],
            quality: .5,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
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
        setImage(image.assets[0].uri)
    }



    return(
        <View style={styles.container}>
            {image && <Image style={styles.image} source={{ uri: image }} />}
            <View style={styles.buttonContainer}>
                <View  style={styles.button}>
                    <Button title="Pick image from camera roll" onPress={pickImage} />
                </View>
                <View  style={styles.button}>
                    <Button title="Take a Picture" onPress={useCameraHandler} />
                </View>
            </View>
        </View>
    )
}

export default ImageSelector

const styles = StyleSheet.create({
    container: {
        width: 300,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'brown',
        flex: 1
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    button: {
        borderRadius: 4,
        color: 'brown',
        margin: 2,
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
    },
    image: {
        width: 300, 
        height: 300
    }

})