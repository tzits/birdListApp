import { StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native'
import { fetchBirds } from '../utils/eBirdCalls'
import { Ionicons } from '@expo/vector-icons'
import BirdList from '../components/BirdList'

const FindBirdsScreen = () => {
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()
    const [birdArray, setBirdArray] = useState()
    const [located, setLocated] = useState(false)

    const navigation = useNavigation();
    const route = useRoute()
    const isFocused = useIsFocused()
    let localBirds = []


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
    //also allow for the ability to set range



    const getLocationHandler = async () => {
        const hasPermissions = await verifyPermissions()
        if (!hasPermissions) {
            return
        }
        const location = await getCurrentPositionAsync()
        setLocated(true)

        const localBirds = await fetchBirds(location.coords.latitude, location.coords.longitude)
        navigation.navigate('DisplayBirds', {birdArray: localBirds})
    }

    const pickOnMapHandler = () => {
        navigation.navigate('Map')
    }

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <Text style={styles.text}>Find Bird Near You</Text>
                    <Ionicons name={'ios-camera'} size={36} color={'white'} onPress={getLocationHandler} />
                </View>
                <View style={styles.innerContainer}>
                    <Text style={styles.text}>Find Birds on Map</Text>
                    <Ionicons name={'map'} size={36} color={'white'} onPress={pickOnMapHandler} />
                </View>
            </View>
        </View>
    )

}

export default FindBirdsScreen

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