import { StyleSheet, Text, View, ScrollView  } from "react-native";
import { useState, useCallback } from 'react'
import Form from "../components/Form";

const SubmitBirdsScreen = ({route}) => {
    const [pickedLocation, setPickedLocation] = useState()

    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location)
    },[])

    console.log(pickedLocation)

    return(
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Text style={styles.header}>Submit a Bird</Text>
                </View>
                <Form onPickLocation={pickLocationHandler} />
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
