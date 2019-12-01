import React, { Component } from 'react'
import { Box } from 'react-native-design-utility'
import OnBoardingLogo from '../../commons/OnBoardingLogo'
import { LinearGradient } from 'expo-linear-gradient'
import { AsyncStorage } from 'react-native'
import { NavigationService } from '../../api/NavigationService'



class SplashScreen extends Component {
    state = {
    }
    componentDidMount() {
        this.checkAuth()
    }
    checkAuth = async () => {
        try {
            let token = await AsyncStorage.getItem("userToken")
            if (token) {
                NavigationService.navigate('Home')
            } else {
                NavigationService.navigate('Auth')
            }
        } catch (e) {
            NavigationService.navigate('Auth')
        }
    }
    render() {
        return (
            <Box f={1} center>
                <LinearGradient colors={['#074ee8', '#07e6c8']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ height: '100%', width: '100%', justifyContent: 'center', backgroundColor: 'transparent', opacity: 1, borderColor: 'white', }}
                >
                    <OnBoardingLogo></OnBoardingLogo>
                </LinearGradient>
            </Box>
        )
    }
}
export default SplashScreen