import { StyleSheet, View, Pressable, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const Button = ({onPress, label1, name1, size, color}) => {
    return (
        <Pressable style={({pressed}) => [styles.innerContainer, pressed && styles.pressed]} onPress={onPress}>
            <Text style={styles.text}>{label1}</Text>
            <Ionicons name={name1} size={size} color={color} />
        </Pressable>
    )
}

export default Button

const styles = StyleSheet.create({
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 140,
        backgroundColor: 'darkgreen',
        flex: 1,
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 16
    },
    pressed: {
        opacity: 0.7,
        backgroundColor: 'green'
    }
})
