import { StyleSheet, Text, Image } from "react-native"
import MapView, { Marker } from 'react-native-maps'


export const setRender = (url, region, lat, lng, call) => {
    let render = <Text style={styles.pending}>{call} Rendering</Text>
    if (url && call === 'map' ) {
        render = (
            <MapView style={styles.image} initialRegion={region} showsPointsOfInterest={false} scrollEnabled={false}>
                <Marker pinColor='purple' coordinate={{latitude: lat, longitude: lng}} />
            </MapView>)
    } 
    if (url && call === 'image') {
        render = ( <Image source={{uri: url}} style={styles.image} /> )
    }
    return render
}

const styles = StyleSheet.create({
    image: {
        height: undefined,
        width: '86%',
        aspectRatio: 1,
        resizeMode: 'contain',
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        marginBottom: 18,
    },
    pending: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    }
})