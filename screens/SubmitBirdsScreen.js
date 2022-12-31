import { StyleSheet, Text, View, ScrollView  } from "react-native";
import FormElement from "../components/FormElement";
import ImageSelector from "../components/ImageSelector";
import FindBirdsScreen from "./FindBirdsScreen";

const SubmitBirdsScreen = () => {
    return(
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Text style={styles.header}>Submit a Bird</Text>
                </View>
                <View style={styles.bodyView}>
                    <View style={styles.formView}>
                        <FormElement prompt='Species Name' />
                    </View>
                    <View style={styles.formView}>
                        <FormElement prompt='Number Seen' />
                    </View>
                    <View style={styles.formView}>
                        <FindBirdsScreen />
                    </View>
                    <View>
                        <Text style={styles.header}>Upload a Picture?</Text>
                        <ImageSelector />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default SubmitBirdsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'brown',
        paddingBottom: 100
    },
    header: {
        color: 'white',
        fontSize: 30,
        marginTop: 20,
        fontWeight: 'bold',
    },
    headerView: {
        flex: 1
        
    },
    bodyView: {
        flex: 6,
        marginTop: 18,
    },
    scroll: {
        backgroundColor: 'brown'
    }
})