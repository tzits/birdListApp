import { StyleSheet, View, Text, Pressable } from "react-native";
import { getDetails } from "../utils/eBirdCalls";
import { useNavigation } from "@react-navigation/native";

const ListItem = ({ count, species, date, location, speciesCode, lat, lng}) => {
    const navigation = useNavigation()
    const readableDate = new Date(date)
    let newDate = `${readableDate.getMonth() + 1}/${readableDate.getDate()}`
    let dateTime= `${readableDate.getHours()}:${readableDate.getMinutes()}`
    if (readableDate.getMinutes() < 10) {
        dateTime = `${readableDate.getHours()}:0${readableDate.getMinutes()}`
    }

    let text = <Text style={styles.text}>{count} {species} was spotted on {newDate} at {dateTime} in {location}</Text>

    if (count > 1) {
        text = <Text style={styles.text}>{count} {species}s were spotted on {newDate} at {dateTime} in {location}</Text>
    }

    const getDetailsHandler = async () => {
        const birdDeets = await getDetails(speciesCode)
        navigation.navigate('BirdDetails', {speciesInfo: birdDeets[0], location: {lat, lng}})
    }

    return (
        <Pressable style={({pressed}) => pressed && styles.pressed} onPress={getDetailsHandler}>
            <View style={styles.birdItem} >
                { text }
            </View>
        </Pressable>
    )
}

export default ListItem

const styles = StyleSheet.create({
    birdItem: {
        padding: 12,
        margin: 8,
        backgroundColor: '#faf9f6',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
    },
    text: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold'
    },
    pressed: {
        opacity: 0.5
    }
})
