import React, { Component } from 'react'
import { Box, } from 'react-native-design-utility'
import { Animated, StyleSheet, ScrollView } from 'react-native'
import LoginScreen from './LoginScreen'
import { KeyboardAvoidingView } from 'react-native'
import Dimensions from 'Dimensions'
import OnBoardingLogo from '../../commons/OnBoardingLogo'
import { LinearGradient } from 'expo-linear-gradient'

const DEVICE_WIDTH = Dimensions.get('window').width

const BoxAnimated = Animated.createAnimatedComponent(Box)

class TabViewScroll extends Component {
  state = {
    opacity: new Animated.Value(1),
    position: new Animated.Value(1),
  }
  componentDidMount() {
    Animated.parallel([this.positionAnim(), this.opacityAnim()]).start()
  }
  opacityAnim = () => {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 200,
      delay: 200,
    }).start()
  }
  positionAnim = () => {
    Animated.timing(this.state.position, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start()
  }
  render() {
    const { opacity } = this.state
    const logoTranslate = this.state.position.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0],
    })
    return (
      <KeyboardAvoidingView behavior="padding" style={{ backgroundColor: '#175091', zIndex: 0 }}>
        <LinearGradient colors={['#074ee8', '#074ee8', '#07e6c8', '#07e6c8', '#5fc2ed']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ height: '100%', width: '100%', justifyContent: 'center', backgroundColor: 'transparent', opacity: 1, borderColor: 'white', }}
        >
          <BoxAnimated f={0.5} style={{
            transform: [{
              translateY: logoTranslate,
            },
            ],
          }}>
            <Box f={1} center>
              <OnBoardingLogo></OnBoardingLogo>
            </Box>
          </BoxAnimated>
          <BoxAnimated f={1} style={{ opacity }} style={styles.loginwindow}>
            <LoginScreen {...this.props}></LoginScreen>
          </BoxAnimated>
        </LinearGradient>
      </KeyboardAvoidingView>
    )
  }
}
const styles = StyleSheet.create({

  loginwindow: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

  },

})
export default TabViewScroll
