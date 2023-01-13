import { StyleSheet, View, Pressable, Image, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'


const BirdCard = ({sighting, onDeleteHandler}) => {


    const navigation = useNavigation();
    let image = <Image style={styles.image} source={{uri: sighting.imageUrl}} />

    if (sighting.imageUrl === '../assets/bird_default.png') {
        image = <Image style={styles.image} source={require('../assets/images/bird_default.png')} />
    }

    const getDetailsHandler = async () => {
        navigation.navigate('BirdDetails', {speciesInfo: sighting, location: {lat: sighting.lat, lng: sighting.lng}})
    }

    const deleteCardHandler = () => {
        onDeleteHandler(sighting)
    }

    return (
        <Pressable style={({pressed}) => [styles.item, pressed && styles.pressed]} onPress={getDetailsHandler}>
            {image}
            <View style={styles.info}>
                <Text style={styles.title}>{sighting.species}</Text>
                <Text style={styles.address}>{sighting.time} on {sighting.date}</Text>
            </View>
            <Pressable style={styles.xIconView} onPress={deleteCardHandler}>
                <View style={styles.xIconView}>
                    <Text style={styles.xIcon}>X</Text>
                </View> 
            </Pressable>
        </Pressable>
    )
}

export default BirdCard

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 6,
        margin: 8,
        backgroundColor: 'white',
        elevation: 2,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.15,
        shadowRadius: 2,
        borderRadius: 6
    },
    pressed: {
        opacity: 0.9
    },
    image: {
        flex: 1,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        height: 100
    },
    title: {
        fontWeight: 'bold',
        size: 18,
        color: 'darkgreen'
    },
    address: {
        size: 12,
        color: 'darkgreen'
    },
    info: {
        flex: 2,
        padding: 12
    },
    xIcon: {
        color: 'red',
        fontSize: 20
    },
    xIconView: {
        flex: .5,
        alignItems: 'center',
        justifyContent: 'center'

    }
})
