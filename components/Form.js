import { StyleSheet, View, Text, ScrollView, TextInput } from "react-native";
import { useState, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import FormElement from "./FormElement";
import DoubleButtons from "./DoubleButton";
import ImageSelector from "./ImageSelector";
import ImageButton from "./ImageButton";
import { setMinutes } from "../utils/date";
import { BirdSighting } from "../models/BirdSighting";
import { insertBirdSighting } from '../utils/database'

const Form = () => {
    const [pickedLocation, setPickedLocation] = useState()
    const [imageUrl, setImageUrl] = useState()
    const [birdSpecies, setBirdSpecies] = useState()
    const [birdCount, setBirdCount] = useState()
    const [imagePreview, setImagePreview] = useState()

    const changeBirdSpeciesHandler = (enteredText) => {
        setBirdSpecies(enteredText)
    }

    const changeBirdCountHandler = (enteredText) => {
        setBirdCount(enteredText)
    }

    const navigation = useNavigation()

    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location)
    },[])

    const pickImageHandler = useCallback((url) => {
        setImageUrl(url)
    },[])

    const onSetImagePreview = () => {
        setImagePreview
    }

    const submitBirdHandler = () => {
        let dateTime = new Date()
        let date = `${dateTime.getDate()}/${dateTime.getMonth()+1}/${dateTime.getFullYear()}`
        let time = `${dateTime.getHours()}:${setMinutes(dateTime)}`
        if (pickedLocation) {

            let url = imageUrl
            if (!imageUrl) {
                url = '../assets/bird_default.png'
            }
            let myBird = new BirdSighting(birdSpecies, birdCount, pickedLocation, time, date, url)
            insertBirdSighting(myBird)
            navigation.navigate('Bird List')
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
                <ImageSelector onPickImage={pickImageHandler} onSetImagePreview={onSetImagePreview}/>
            </View>
            <View style={styles.submitButton}>
                <ImageButton onPress={submitBirdHandler} text={'Submit'}  />
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
