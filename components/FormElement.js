import { StyleSheet, Text, TextInput, View } from "react-native";

const FormElement = ({prompt}) => {
    console.log(prompt)
    return (
        <>
            <Text style={styles.label}>{prompt}</Text>
            <TextInput style={styles.input} />
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