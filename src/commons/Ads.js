import React, { Component } from 'react'
import Carousel from 'react-native-snap-carousel'
import { View, Text, TouchableHighlight, ImageBackground } from 'react-native'
import { images } from '../constants/images'
import Dimensions from 'Dimensions'
import { LinearGradient } from 'expo-linear-gradient'

const DEVICE_WIDTH = Dimensions.get('window').width
export default class Ads extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entries: [{ img: images.ad3, title: 'We Serve Top Quality ', off: 'Maintance ' },
            { img: images.ad1, title: 'Ganesh Festival', off: '50% OFF' },
            { img: images.ad2, title: 'Exclusive', off: 'Use BLR50 get 50% OFF upto 100 rs' },
            { img: images.ad3, title: 'dasara', off: '10% OFF' }]
        }
    }
    _renderItem({ item, index }) {
        return (
            <TouchableHighlight>
                <View style={{ height: 200, borderRadius: 10, borderWidth: 1, backgroundColor: 'white', borderColor: 'transparent' }}>
                    <ImageBackground source={item.img} style={{ backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: 'transparent', margin: 0 }}>
                        <LinearGradient colors={['#f59042', '#5bbef0', '#4284f5']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{ height: '100%', width: '100%', justifyContent: 'center', backgroundColor: 'transparent', opacity: 1, borderColor: 'white', borderRadius: 10 }}
                        >
                            <Text style={{ color: 'white', fontSize: 15, width: DEVICE_WIDTH - 75, alignSelf: 'center', paddingLeft: 10, }}>{item.title.toUpperCase()}</Text>
                            <Text style={{ color: 'white', fontSize: 15, width: DEVICE_WIDTH - 75, alignSelf: 'center', paddingLeft: 10 }}>{item.off.toUpperCase()}</Text>
                        </LinearGradient>
                    </ImageBackground>

                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <Carousel
                ref={(c) => { this._carousel = c }}
                data={this.state.entries}
                renderItem={this._renderItem}
                sliderWidth={DEVICE_WIDTH}
                itemWidth={DEVICE_WIDTH - 60}
                layout={'default'}
            />
        )
    }
}