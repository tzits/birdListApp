import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useState, useCallback } from 'react'
import FormElement from "./FormElement";
import DoubleButtons from "./DoubleButton";
import ImageSelector from "./ImageSelector";
import ImageButton from "./ImageButton";
import { BirdSighting } from "../models/BirdSighting";
import { setMyDate, setMyTime } from "../utils/date";

const Form = ({onSubmitBirdHandler}) => {

    const [birdSpecies, setBirdSpecies] = useState()
    const [birdCount, setBirdCount] = useState()
    const [pickedLocation, setPickedLocation] = useState()
    const [imageUrl, setImageUrl] = useState()
    const [imagePreview, setImagePreview] = useState()

    const changeBirdSpeciesHandler = (enteredText) => {
        setBirdSpecies(enteredText)
    }
    const changeBirdCountHandler = (enteredText) => {
        setBirdCount(enteredText)
    }

    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location)
    },[])

    const pickImageHandler = (url) => {
        setImageUrl(url)
    }

    const submitBirdHandler = () => {
        let dateTime = new Date()
        let date = setMyDate(dateTime)
        let time = setMyTime(dateTime)
        if (!birdSpecies || !birdCount) {
            alert('Name and Count Required')
            return
        }
        if (pickedLocation) {
            let url = imageUrl
            if (!imageUrl) {
                url = '../assets/bird_default.png'
            }
            let myBird = new BirdSighting(birdSpecies, birdCount, pickedLocation, time, date, url)
            onSubmitBirdHandler(myBird)
            setBirdSpecies()
            setBirdCount()
            setImageUrl()
            setPickedLocation()
            setImagePreview()
        } else {
            alert('Location Needed')
        }
    }

    return (
        <ScrollView style={styles.bodyView}>
            <View style={styles.formView}>
                <FormElement 
                    prompt='Species Name' 
                    val={birdSpecies} 
                    keyboardType={'default'}
                    onChangeText={changeBirdSpeciesHandler}
                />
            </View>
            <View style={styles.formView}>
                <FormElement 
                    prompt='Number Seen' 
                    val={birdCount} 
                    keyboardType={'number-pad'}
                    onChangeText={changeBirdCountHandler}
                />
            </View>
            <View style={styles.formView}>
                <DoubleButtons 
                    name1={'navigate'}  
                    name2={'map'}
                    size={36}
                    color={'white'}
                    label1={'Current Location'}
                    label2={'Pick on Map'}
                    callType={'submit'}
                    onPickLocation={pickLocationHandler}
                />
            </View>
            <View style={styles.h1Container}>
                <Text style={styles.header}>Upload a Picture?</Text>
                <ImageSelector onPickImage={pickImageHandler} val={imagePreview} />
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
