import { StyleSheet, Text, View, ScrollView  } from "react-native";
import Form from "../components/Form";

const SubmitBirdsScreen = ({route}) => {


    return(
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Text style={styles.header}>Submit a Bird</Text>
                </View>
                <Form />
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
    scroll: {
        backgroundColor: 'brown'
    }
})
