import { StyleSheet, View, Text, ScrollView } from "react-native";
import FormElement from "./FormElement";
import DoubleButtons from "./DoubleButton";
import ImageSelector from "./ImageSelector";
import ImageButton from "./ImageButton";
import { useState, useCallback } from 'react'
import { setMinutes } from "../utils/date";
import { BirdSighting } from "../models/BirdSighting";
import { insertBirdSighting } from '../utils/database'

const Form = () => {
    const [pickedLocation, setPickedLocation] = useState()
    const [imageUrl, setImageUrl] = useState()

    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location)
    },[])

    const pickImageHandler = useCallback((url) => {
        setImageUrl(url)
    },[])

    const submitBirdHandler = () => {
        let dateTime = new Date()
        let date = `${dateTime.getDate()}/${dateTime.getMonth()+1}/${dateTime.getFullYear()}`
        let time = `${dateTime.getHours()}:${setMinutes(dateTime)}`
        if (pickedLocation) {

            let url = imageUrl
            if (!imageUrl) {
                url = '../assets/bird_default.png'
            }
            let myBird = new BirdSighting('Yellow Naped Amazon',1, pickedLocation, time, date, url)
            insertBirdSighting(myBird)
        } else {
            alert('Location Needed')
        }
    }

    return (
        <ScrollView style={styles.bodyView}>
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
                    onPickLocation={pickLocationHandler}
                />
            </View>
            <View style={styles.h1Container}>
                <Text style={styles.header}>Upload a Picture?</Text>
                <ImageSelector onPickImage={pickImageHandler} />
            </View>
            <View style={styles.submitButton}>
                <ImageButton onPress={submitBirdHandler} text={'Submit'} />
            </View>
        </ScrollView>
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
    },
    submitButton: {
        marginVertical: 10,
        alignItems: 'center'
    }
})
