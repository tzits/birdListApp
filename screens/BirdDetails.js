import { StyleSheet, View, Text, Button, Image, ScrollView } from "react-native"
import * as WebBrowser from 'expo-web-browser'
import imageSearch from 'react-native-google-image-search'
import { useEffect, useState } from 'react'
import { getMapPreview } from "../utils/locations"
import MapView, { Marker } from 'react-native-maps'



const BirdDetails = ({route}) => {
    const [imageUrl, setImageUrl] = useState()
    const [mapUrl, setMapUrl] = useState()
    let lat = route.params.location.lat
    let lng = route.params.location.lng

    const region = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }


    let speciesInfo = route.params.speciesInfo[0]
    let searchTerm = speciesInfo.comName.replace(/ /g, "+")
    searchTerm = searchTerm + '+bird'

    useEffect(() => {
        let speciesInfo = route.params.speciesInfo[0]
        let searchStart = speciesInfo.comName.replace(/ /g, "+")
        let searchTerm = searchStart + '+bird'
        const setImage = async () => {
    
            let imageUri = await imageSearch(searchTerm, 0, 5)
            let imageLink = imageUri[0].link
            setImageUrl(imageLink)
        }
        setImage()
    },[])

    useEffect(() => {
        let birdLocation = getMapPreview(lat,lng)
        setMapUrl(birdLocation)
    },[])

    let imageRendering = <Text style={styles.name}>Image Rendering</Text>

    if (imageUrl) {
        imageRendering = ( <Image source={{uri: imageUrl}} style={styles.image}  /> )        
    }

    let mapRender = <Text style={styles.name}>Map Rendering</Text>

    if (mapUrl) {
        mapRender = (
            <MapView style={styles.map} initialRegion={region}>
                <Marker pinColor='purple' coordinate={{latitude: lat, longitude: lng}} />
            </MapView>)

    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    {imageRendering}
                </View>
                <View stlye={styles.outerTextContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.name}>{speciesInfo.comName}</Text>
                        <Text style={styles.text}>Scientific Name: {speciesInfo.sciName}</Text>
                        <Text style={styles.text}>Bird Type: {speciesInfo.familyComName}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.heading} >Taxonomy</Text>
                        <Text style={styles.text} >Family: {speciesInfo.familySciName}</Text>
                        <Text style={styles.text} >Order: {speciesInfo.order}</Text>
                    </View>
                </View>
                <View style={styles.mapContainer}>
                    {mapRender}
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={styles.button} onPress={() => WebBrowser.openBrowserAsync(`https://www.google.com/search?q=${searchTerm}`)}>Learn More</Text>
                </View>
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
        paddingBottom: 100
    },
    outerTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // flex: 1
    },
    name: {
        fontWeight: 'bold',
        fontSize: 24,
        marginVertical: 6,
        color: 'white'
    },
    textContainer: {
        marginBottom: 12,
        color: 'white'
    },
    text: {
        fontSize: 16,
        color: 'white'
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
        color: 'white'
    },
    map: {
        width: '80%',
        height: '100%',
        // borderRadius: 4
      },
      mapContainer: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        overflow: 'hidden'
      },
      buttonContainer: {
        backgroundColor: 'white',
        color: 'brown',
        borderRadius: 6,
        padding: 4,
      },
      button: {
        padding: 8,
        color: 'brown',
        fontWeight: 'bold',
        fontSize: 16
      },
      pressed: {
        backgroundColor: 'black',
      }
})