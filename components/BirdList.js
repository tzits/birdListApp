import { StyleSheet, FlatList, ScrollView, Text } from "react-native"
import ListItem from "./ListItem"
import NewsItem from "./NewsItem"

const BirdList = ({data}) => {
    const renderItem = ({ item }) => {
      if(data[0].location) {
        return (
          <ScrollView>
            <ListItem {...item}  />
          </ScrollView>
        )
      } else {
        return (
        <ScrollView>
          <NewsItem {...item} />
        </ScrollView>)
      }
      }
    return (
      <FlatList style={styles.container}
        data={data}
        renderItem={renderItem}
        keyExtractor={(bird) => bird.species}
      />
    )
}

export default BirdList

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'brown'
    }
})