import { StyleSheet } from "react-native"
import MapView, { Marker } from 'react-native-maps'
import { useCallback, useLayoutEffect, useState } from "react"
import { Ionicons } from '@expo/vector-icons'
import { fetchBirds } from "../utils/eBirdCalls"

const Map = ({navigation, route}) => {
    let callType = route.params.callType
    let range = route.params.range

    const [selectedLocation, setSelectedLocation] = useState()

    const region = {
        latitude: 40.7826,
        longitude: -73.9656,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    const selectLocationHandler = (event) => {
        const lat = event.nativeEvent.coordinate.latitude
        const lng = event.nativeEvent.coordinate.longitude

        setSelectedLocation({lat: lat, lng: lng})
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            alert('Please Tap Location on Map');
            return;
        }
        const navigateToList = async () => {
            const displayBirds = await fetchBirds(selectedLocation.lat,selectedLocation.lng, range)

            navigation.navigate('DisplayBirds', {birdArray: displayBirds})
        }
        if (callType === 'find') {
            navigateToList()
        }
        else {
            navigation.navigate('Nav', {screen: 'SubmitBirdsScreen'}, {location: selectedLocation})
        }


    }, [navigation, selectedLocation])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) => (
                <Ionicons name={'save'} size={24} color={tintColor} onPress={savePickedLocationHandler} />
            )
        })
    }, [navigation, savePickedLocationHandler])

    return (
        <MapView style={styles.map} initialRegion={region} onPress={selectLocationHandler} >
            {selectedLocation && (
                <Marker coordinate={{latitude: selectedLocation.lat, longitude: selectedLocation.lng}} />)
            }
        </MapView>
    )
}

export default Map

const styles=StyleSheet.create({
    map: {
        flex: 1
    }
})
