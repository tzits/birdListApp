import { StyleSheet, FlatList, ScrollView } from 'react-native'
import BirdCard from './BirdCard'

const SeenBirds = ({data}) => {

    return (
      <FlatList
        data={data}
        renderItem={({item}) => <BirdCard sighting={item} />} 
        keyExtractor={(data) => data.time}
      />
    )
}

export default SeenBirds
