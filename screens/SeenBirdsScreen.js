import { useIsFocused } from '@react-navigation/native'
import { useEffect, useState } from 'react'

import BirdList from '../components/BirdList'
import { fetchBirdSightings, removeFromList } from '../utils/database'


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

    const removeSightingHandler = (sighting) => {
        removeFromList(+sighting.id)
        const updatedSightings = async () => {
            const newSightings = await fetchBirdSightings()
            setLoadedBirds(newSightings)
        }
        updatedSightings()
    }

    return (
        <BirdList data={loadedBirds} onDeleteHandler={removeSightingHandler} />
    )
}

export default SeenBirdsScreen
