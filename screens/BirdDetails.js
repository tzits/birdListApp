import { StyleSheet, View, Text, Image, ScrollView } from "react-native"
import { useEffect, useState } from 'react'
import * as WebBrowser from 'expo-web-browser'
import imageSearch from 'react-native-google-image-search'
import MapView, { Marker } from 'react-native-maps'
import { getMapPreview } from "../utils/locations"
import ImageButton from "../components/ImageButton"
import InfoComponent from '../components/InfoComponent'

const BirdDetails = ({route}) => {
    const [imageUrl, setImageUrl] = useState()
    const [mapUrl, setMapUrl] = useState()
    
    let lat = route.params.location.lat
    let lng = route.params.location.lng
    let speciesInfo = route.params.speciesInfo[0]
    
    let searchTerm = speciesInfo.comName.replace(/ /g, "+") + '+bird'

    const region = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    useEffect(() => {
        const setImageAndMap = async () => {
            let imageUri = await imageSearch(searchTerm, 0, 5)
            let imageLink = imageUri[0].link
            setImageUrl(imageLink)
            let birdLocation = getMapPreview(lat,lng)
            setMapUrl(birdLocation)
        }
        setImageAndMap()
    },[])

    let imageRendering = <Text style={styles.pending}>Image Rendering</Text>
    if (imageUrl) {
        imageRendering = ( <Image source={{uri: imageUrl}} style={styles.image}  /> )        
    }

    let mapRender = <Text style={styles.pending}>Map Rendering</Text>
    if (mapUrl) {
        mapRender = (
            <MapView style={styles.image} initialRegion={region} showsPointsOfInterest={false} scrollEnabled={false}>
                <Marker pinColor='purple' coordinate={{latitude: lat, longitude: lng}} />
            </MapView>)
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    {imageRendering}
                </View>
                <View style={styles.outerTextContainer}>
                    <InfoComponent 
                        text1={speciesInfo.comName}
                        text2={speciesInfo.sciName}
                        text3={speciesInfo.familyComName}
                        size={24}
                    />
                    <InfoComponent 
                        text1={'Taxonomy'}
                        text2={speciesInfo.familySciName}
                        text3={speciesInfo.order}
                        size={18}
                    />
                </View>
                <View style={styles.innerContainer}>
                    {mapRender}
                </View>
                <ImageButton 
                    onPress={() => WebBrowser.openBrowserAsync(`https://www.google.com/search?q=${searchTerm}`)}
                    text={'Learn More'}
                />
            </View>
        </ScrollView>
    )
}

export default BirdDetails

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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'brown',
        marginBottom: 80
    },
    outerTextContainer: {
        flex: 1,
        paddingBottom: 40

    },
    innerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    pending: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    }
})
