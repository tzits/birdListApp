import { StyleSheet, View, Text } from "react-native";
import FormElement from "./FormElement";
import DoubleButtons from "./DoubleButton";
import ImageSelector from "./ImageSelector";

const Form = ({onPickLocation}) => {

    return (
        <View style={styles.bodyView}>
            <View style={styles.formView}>
                <FormElement prompt='Species Name' />
            </View>
            <View style={styles.formView}>
                <FormElement prompt='Number Seen' />
            </View>
            <View style={styles.formView}>
                <DoubleButtons 
                    name1={'camera'}  
                    name2={'map'}
                    size={36}
                    color={'white'}
                    label1={'Use Current Location'}
                    label2={'Pick Location on Map'}
                    callType={'submit'}
                    onPickLocation={onPickLocation}
                />
            </View>
            <View style={styles.h1Container}>
                <Text style={styles.header}>Upload a Picture?</Text>
                <ImageSelector />
            </View>
        </View>
    )
}

export default Form

const styles = StyleSheet.create({
    bodyView: {
        flex: 6,
        marginTop: 18,
    },
    header: {
        color: 'white',
        fontSize: 30,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    h1Container: {
        alignItems: 'center',
    }
})
