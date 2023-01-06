import { useIsFocused } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import SeenBirds from '../components/SeenBirds'
import { fetchBirdSightings } from '../utils/database'


const SeenBirdsScreen = () => {
    const [loadedBirds, setLoadedBirds] = useState([])

    const isFocused = useIsFocused()
    useEffect(() => {
        const loadBirds = async () => {
            const sightings = await fetchBirdSightings()
            setLoadedBirds(sightings)
        } 

        if (isFocused) {
            loadBirds()
        }
    }, [isFocused])
    return (
        <SeenBirds data={loadedBirds} />
    )
}

export default SeenBirdsScreen

const styles = StyleSheet.create({

})