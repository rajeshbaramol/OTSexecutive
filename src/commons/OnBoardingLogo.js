import React, { Component } from 'react'
import { Image, Text, View } from 'react-native'
import { Box } from 'react-native-design-utility'
import { images } from '../constants/images'


class OnBoardingLogo extends Component {
  render() {
    return (
      <Box center>
        <Box mb="sm" center f={1}>
          <Image source={images.Logo} ></Image>
          <View style={{ marginVertical: '5%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: "bold", }}>On Time Service</Text>
            <Text style={{ color: 'white', fontSize: 15 }}></Text>
          </View>
        </Box>
      </Box>
    )
  }
}

export default OnBoardingLogo
