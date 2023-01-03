import { StyleSheet, Text, View } from 'react-native'
import DoubleButtons from '../components/DoubleButton'

const FindBirdsScreen = () => {

    //also allow for the ability to set range


    return (
        <View style={styles.container}>
            <DoubleButtons style={styles.button}
                name1={'ios-camera'}  
                name2={'map'}
                size={36}
                color={'white'}
                label1={'Find Birds Near You'}
                label2={'Find Bird on Map'}
                callType={'find'}
            />
        </View>



    )

}

export default FindBirdsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'brown'
    },
    buttons: {

    }
})
