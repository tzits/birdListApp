import { StyleSheet, View, ScrollView } from "react-native"
import { useEffect, useState } from 'react'
import * as WebBrowser from 'expo-web-browser'
import imageSearch from 'react-native-google-image-search'
import { getMapPreview } from "../utils/locations"
import ImageButton from "../components/ImageButton"
import InfoComponent from '../components/InfoComponent'
import { setRender } from "../utils/rendering"

const BirdDetails = ({route}) => {
    const [imageUrl, setImageUrl] = useState()
    const [mapUrl, setMapUrl] = useState()
    
    let lat = route.params.location.lat
    let lng = route.params.location.lng
    let speciesInfo = route.params.speciesInfo
    console.log(speciesInfo)

    let searchTerm = speciesInfo.species
    if (speciesInfo.comName != undefined) {
        searchTerm = searchTerm = speciesInfo.comName.replace(/ /g, "+") + '+bird'
    }
    

    useEffect(() => {
        const setImageAndMap = async () => {
            let imageLink = speciesInfo.imageUrl
            if (!speciesInfo.imageUrl || speciesInfo.imageUrl === '../assets/bird_default.png') {
                let imageUri = await imageSearch(searchTerm, 0, 5)
                imageLink = imageUri[0].link
            }
            setImageUrl(imageLink)
            let birdLocation = getMapPreview(lat,lng)
            setMapUrl(birdLocation)
        }
        setImageAndMap()
    },[])

    let mapRender = setRender(mapUrl, 'map', lat, lng)
    let imageRender = setRender(imageUrl, 'image')

    let imageButton =  
    (<ImageButton 
        onPress={() => WebBrowser.openBrowserAsync(`https://www.google.com/search?q=${searchTerm}`)}
        text={'Learn More'}
    />)

    let info = (
        <>
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
        </>
    )

    if(!speciesInfo.comName) {
        imageButton = null
        info = (
            <InfoComponent
                text1={speciesInfo.species}
                text2={speciesInfo.count}
                text3={`Seen at ${speciesInfo.time} on ${speciesInfo.date}`}
                size={24}
            />
        )
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    {imageRender}
                </View>
                <View style={styles.outerTextContainer}>
                    {info}
                </View>
                <View style={styles.innerContainer}>
                    {mapRender}
                </View>
                {imageButton}
            </View>
        </ScrollView>
    )
}

export default BirdDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'darkgreen',
        marginBottom: 80
    },
    outerTextContainer: {
        flex: 1,
        paddingBottom: 40

    },
    innerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})
