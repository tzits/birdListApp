import { StyleSheet, Text, View } from 'react-native'
import DoubleButtons from '../components/DoubleButton'
import { useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'

const FindBirdsScreen = () => {
    const [range, setRange] = useState('10')
    
    const selectData = [
        {key: '1km', value: '1'},
        {key: '3km', value: '3'},
        {key: '5km', value: '5'},
        {key: '10km', value: '10'}
    ]

    return (
        <View style={styles.container}>

            <SelectList
                setSelected={(val) => setRange(val)}
                data={selectData}
                save="value"
            />

            <DoubleButtons style={styles.button}
                name1={'ios-camera'}  
                name2={'map'}
                size={36}
                color={'white'}
                label1={'Find Birds Near You'}
                label2={'Find Bird on Map'}
                callType={'find'}
                range={range}
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
