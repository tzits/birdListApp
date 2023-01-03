import { StyleSheet, View, Text } from "react-native";

const InfoComponent = ({text1, text2, text3, size}) => {
    return (
        <View style={styles.textContainer}>
            <Text style={[styles.name, {fontSize: size}]}>{text1}</Text>
            <Text style={styles.text}>Scientific Name: {text2}</Text>
            <Text style={styles.text}>Bird Type: {text3}</Text>
        </View>
    )
}

export default InfoComponent

const styles= StyleSheet.create({
    name: {
        fontWeight: 'bold',
        marginVertical: 6,
        color: 'white'
    },
    textContainer: {
        marginBottom: 12,
        color: 'white',
    },
    text: {
        fontSize: 16,
        color: 'white'
    },
})