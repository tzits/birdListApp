import { StyleSheet, View } from 'react-native'
import DoubleButtons from '../components/DoubleButton'
import { useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import { Ionicons } from '@expo/vector-icons'

const FindBirdsScreen = () => {
    const [range, setRange] = useState('10')
    
    const selectData = [
        {key: '1km', value: '1km'},
        {key: '3km', value: '3km'},
        {key: '5km', value: '5km'},
        {key: '10km', value: '10km'}
    ]

    return (
        
        <View style={styles.container}>
            <View style={styles.dropdownContainer}>
                <SelectList
                    arrowicon={<Ionicons name="caret-down" size={20} color="white"></Ionicons>}
                    setSelected={(val) => setRange(val.slice(0,-2))}
                    data={selectData}
                    save="value"
                    inputStyles={{color: 'white', fontSize: 20}}
                    dropdownTextStyles={{color: 'white', fontSize: 20}}
                    placeholder={'Select Search Range  '}
                    search={false}
                    searchPlaceholder={'Select Search Range'}
                    boxStyles={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                />
            </View>
            <View style={styles.buttonContainer}>
                <DoubleButtons style={styles.button}
                    name1={'navigate'}  
                    name2={'map'}
                    size={36}
                    color={'white'}
                    label1={'Current Location'}
                    label2={'Pick on Map'}
                    callType={'find'}
                    range={range}
                />
            </View>
        </View>
    )

}

export default FindBirdsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'darkgreen',
        alignContent: 'center'
    },
    dropdownContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    buttonContainer: {
        flex: 1
    }
})
