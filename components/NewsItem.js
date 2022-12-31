import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import * as WebBrowser from 'expo-web-browser'

const NewsItem = ({author, title, source, urlToImage, url}) => {
    return(
        <Pressable style={({pressed}) => [styles.item, pressed && styles.pressed]} onPress={() => WebBrowser.openBrowserAsync(`${url}`)} >
            <Image style={styles.image} source={{uri: urlToImage}} />
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>{title}</Text>
                <Text style={styles.address} numberOfLines={2}>{author}</Text>
                <Text style={styles.address}>{source.name}</Text>
            </View>
        </Pressable>
    )
}

export default NewsItem

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'flex-center',
        borderRadius: 6,
        marginVertical: 8,
        backgroundColor: 'white',
        elevation: 2,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.15,
        shadowRadius: 2,
        borderRadius: 4,
        width: '90%',
        marginHorizontal: '5%'
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
        color: 'brown'
    },
    address: {
        size: 12,
        color: 'brown',
        marginVertical: 3
    },
    info: {
        flex: 2,
        padding: 12
    }
})