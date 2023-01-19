import { StyleSheet, FlatList, ScrollView } from "react-native"
import ListItem from "./ListItem"
import BirdCard from "./BirdCard"

const BirdList = ({data, onDeleteHandler}) => {

    const renderItem = ({ item }) => {
      if(item.speciesCode) {
        return (
          <ScrollView>
            <ListItem {...item}  />
          </ScrollView>
        )
      } else {
        return (
        <ScrollView>
          <BirdCard 
            sighting={item}
            onDeleteHandler={onDeleteHandler}
        />
        </ScrollView>
        )
      }
      }
    return (
      <FlatList style={styles.container}
        data={data}
        renderItem={renderItem}
        keyExtractor={(bird) => bird.id + Math.random()}
        extraData={data}
      />
    )
}

export default BirdList

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'darkgreen'
    }
})
