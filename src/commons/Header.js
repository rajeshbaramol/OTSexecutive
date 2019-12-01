import React, { Component } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Dimensions from 'Dimensions'
import { NavigationService } from '../api/NavigationService'
import { LinearGradient } from 'expo-linear-gradient'

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height
class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayBackButton: props.backlink ? true : false
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: '#421c8a', height: 80, }}>
                <LinearGradient colors={['#074ee8', '#07e6c8']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ height: '100%', width: '100%', justifyContent: 'center', backgroundColor: 'transparent', opacity: 1, }}
                >
                    <View style={{ marginVertical: 45, flexDirection: 'row', marginHorizontal: '3%', }}>
                        <View style={{ position: 'absolute' }}>
                            {this.state.displayBackButton &&
                                <TouchableHighlight style={{ borderWidth: 1, borderColor: 'transparent', alignItems: 'flex-start', backgroundColor: 'transparent', height: 40, width: 40, left: 5 }} onPress={() => { NavigationService.navigate(this.props.backlink) }}>
                                    <View style={{ aalignItems: 'flex-start', left: 5 }}>
                                        <MIcon name='arrow-left' size={20} style={{ color: 'white' }}></MIcon>
                                    </View>
                                </TouchableHighlight>
                            }</View>
                        <View style={{ alignItems: 'center', alignSelf: 'center', }}>
                            <Text style={{ color: 'white', fontSize: 18, alignSelf: 'center', top: 10, }}>{this.props.title}</Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        )
    }
}

export default Header
