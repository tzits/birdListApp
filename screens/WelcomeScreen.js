import { StyleSheet, Text, View, Image } from "react-native"
import Bullet from "../components/Bullet"

const WelcomeScreen = () => {
    return (
        <View style={styles.welcomeContainer}>
            <Image style={styles.image} source={require('../assets/images/kiwi-bird.png')} />
            <Text style={styles.textHeader}>Welcome To Your Personal BirdList and Bird Tracker</Text>
            <View style={styles.textContainer}>
                <Bullet text={'This app allows you to keep track on birds you see'} />
                <Bullet text={'It also looks for birds seen recently in your area or on a place you select on a map'} />
            </View>
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    welcomeContainer: {
        flex: 1,
        backgroundColor: 'darkgreen',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    image: {
        flex: 2,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        width: '80%',
        color: 'white',
        resizeMode: 'contain'
    },
    textHeader: {
        flex: 1,
        color: 'white',
        fontSize: 26,
        textAlign: 'center'
    },
    textContainer: {
        flex: 1
    }
})
