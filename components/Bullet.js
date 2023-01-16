import { Text, View, StyleSheet } from 'react-native'

const Bullet = ({text}) => {
    return (
        <View style={styles.textItemContainer}>
            <Text style={styles.bullet}>{`\u2022`}</Text>
            <Text style={styles.textStyle}>{text}</Text>
        </View>
    )
}

export default Bullet

const styles = StyleSheet.create({
    textItemContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 12
    },
    bullet: {
        color: 'white',
        fontWeight: '900',
        size: 30,
        paddingRight: 8,
        paddingTop: 3
    },
    textStyle: {
        fontSize: 18,
        color: 'white'
    }
})