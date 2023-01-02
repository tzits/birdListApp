import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'
import { useNavigation } from '@react-navigation/native'
import { fetchBirds } from '../utils/eBirdCalls'
import Button from "./Button";



const DoubleButtons = ({ name1, name2, size, color, label1, label2, callType}) => {
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()
    const navigation = useNavigation();
    const [located, setLocated] = useState(false)

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
        const localBirds = await fetchBirds(location.coords.latitude, location.coords.longitude)
        navigation.navigate('DisplayBirds', {birdArray: localBirds})
    }

    const pickOnMapHandler = () => {
        navigation.navigate('Map', {callType: {callType}})
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

                {/* <View style={styles.innerContainer}>
                    <Text style={styles.text}>{label1}</Text>
                    <Ionicons name={name1} size={size} color={color} onPress={getLocationHandler} />
                </View> */}
                {/* <View style={styles.innerContainer}>
                    <Text style={styles.text}>{label2}</Text>
                    <Ionicons name={name2} size={size} color={color} onPress={pickOnMapHandler} />
                </View> */}
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
