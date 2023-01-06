import { StyleSheet, FlatList, ScrollView } from "react-native"
import ListItem from "./ListItem"
import BirdCard from "./BirdCard"
import NewsItem from "./NewsItem"

const BirdList = ({data}) => {
    const renderItem = ({ item }) => {
      console.log(item)
      if(item.speciesCode) {
        return (
          <ScrollView>
            <ListItem {...item}  />
          </ScrollView>
        )
      } else {
        return (
        <ScrollView>
          <BirdCard sighting={item} />
        </ScrollView>
        )
      }
      }
    return (
      <FlatList style={styles.container}
        data={data}
        renderItem={renderItem}
        keyExtractor={(bird) => bird.time}
      />
    )
}

export default BirdList

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'darkgreen'
    }
})
