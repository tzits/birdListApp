import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'
import { useNavigation } from '@react-navigation/native'
import { fetchBirds } from '../utils/eBirdCalls'
import Button from "./Button";



const DoubleButtons = ({ name1, name2, size, color, label1, label2, callType, range}) => {
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()
    const navigation = useNavigation();
    const [located, setLocated] = useState(false)

    if (range) {
        console.log('we have a range', range)
    }

    const verifyPermissions = async () => {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionsResponse = await requestPermission()
            return permissionsResponse.granted
        }
        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            alert('Please Allow Location Information')
            return false
        }
        return true
    }

    const getLocationHandler = async () => {
        const hasPermissions = await verifyPermissions()
        if (!hasPermissions) {
            return
        }
        const location = await getCurrentPositionAsync()
        setLocated(true)
        if (callType !== 'find') {
            navigation.navigate('Nav', {screen: 'SubmitBirdsScreen'}, {location: location})
            return
        }
        const localBirds = await fetchBirds(location.coords.latitude, location.coords.longitude, range)
        navigation.navigate('DisplayBirds', {birdArray: localBirds})
    }

    const pickOnMapHandler = () => {
        navigation.navigate('Map', {callType: callType, range: range})
    }

    return(
        <View>
            <View style={styles.container}>
                <Button 
                    label1={label1} 
                    onPress={getLocationHandler} 
                    color={color} 
                    size={size} 
                    name1={name1} 
                />
                <Button 
                    label1={label2} 
                    onPress={pickOnMapHandler} 
                    color={color} 
                    size={size} 
                    name1={name2} 
                />
            </View>
        </View>
    )
}

export default DoubleButtons

const styles = StyleSheet.create({
    container: {

        flexDirection: 'row'
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 150,
        backgroundColor: 'brown',
        flex: 1,
        paddingBottom: '10%'
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    }
})
