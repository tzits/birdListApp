import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { useState } from "react";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'
import { useNavigation } from '@react-navigation/native'
import { fetchBirds } from '../utils/eBirdCalls'
import Button from "./Button";



const DoubleButtons = ({ name1, name2, size, color, label1, label2, callType, range, onPickLocation}) => {
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()
    const navigation = useNavigation();
    const [located, setLocated] = useState()

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
        setLocated(true)

        const hasPermissions = await verifyPermissions()
        if (!hasPermissions) {
            return
        }
        const location = await getCurrentPositionAsync()
        if (callType !== 'find') {
            navigation.navigate('Nav', {screen: 'SubmitBirdsScreen'}, {location: location})
            onPickLocation({lat: location.coords.latitude, lng: location.coords.longitude})
            setLocated()
            return
        }
        const localBirds = await fetchBirds(location.coords.latitude, location.coords.longitude, range)
        setLocated()
        navigation.navigate('DisplayBirds', {birdArray: localBirds})
    }

    const pickOnMapHandler = () => {
        navigation.navigate('Map', {callType: callType, range: range, onPickLocation: onPickLocation})
    }

    let spinner = label1

    if (located) {
        spinner = <ActivityIndicator size={'large'}/>
    }

    return(
        <View>
            <View style={styles.container}>
                <Button 
                    label1={spinner} 
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
        backgroundColor: 'darkgreen',
        flex: 1,
        paddingBottom: '10%'
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    },
    container2: {
        flex: 1,
        justifyContent: "center"
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
      }
})
