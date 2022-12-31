import { StyleSheet, Text } from "react-native";
import BirdList from "../components/BirdList";

const DisplayBirds = ({route}) => {
    return (
        <BirdList data={route.params.birdArray} location={route.params.location} />
    )
}

export default DisplayBirds

const styles = StyleSheet.create({

})