import { StyleSheet, Text, TextInput } from "react-native";

const FormElement = ({prompt, keyboardType, val, onChangeText}) => {
    return (
        <>
            <Text style={styles.label}>{prompt}</Text>
            <TextInput style={styles.input} keyboardType={keyboardType} onChangeText={onChangeText} value={val} />
        </>
    )
}

export default FormElement

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold',
        marginBottom: 2,
        color: 'lightgrey'
    },
    input : {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 18,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 2,
        color: 'lightgrey'
    }
})
