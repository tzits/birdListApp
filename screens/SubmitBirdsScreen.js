import { StyleSheet, Text, View, ScrollView  } from "react-native";
import Form from "../components/Form";
import { insertBirdSighting } from "../utils/database";

const SubmitBirdsScreen = ({route, navigation}) => {

    const submitBirdHandler = async (bird) => {
        await insertBirdSighting(bird)
        navigation.navigate('Bird List')
    }

    return(
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Text style={styles.header}>Submit a Bird</Text>
                </View>
                <Form onSubmitBirdHandler={submitBirdHandler} />
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
        backgroundColor: 'darkgreen',
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
        backgroundColor: 'darkgreen'
    }
})
