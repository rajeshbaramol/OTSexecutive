import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { theme } from '../constants/theme'
import React from 'react'
import HomeScreen from './Home/HomeScreen'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import TabViewScroll from './Auth/TabView'
import SplashScreen from './Splash/SplashScreen'
import Otp from './Auth/Otp'
import ReferApp from './Auth/ReferApp'
import Settings from './Settings/Settings'

const authNavigator = createStackNavigator(
    {
        Login: {
            screen: TabViewScroll, navigationOptions: { header: null }
        }
    })

const otp = createStackNavigator(
    {
        otp: {
            screen: Otp, navigationOptions: { header: null }
        },
    }
)
const referApp = createStackNavigator(
    {
        referApp: {
            screen: ReferApp, navigationOptions: { header: null }
        },
    }
)
const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: () => ({
            tabBarIcon: ({ tintColor }) => (<MIcon name="home" color={tintColor} size={24} />),
        })
    },

    Settings: {
        screen: Settings,
        navigationOptions: () => ({
            tabBarIcon: ({ tintColor }) => (<MIcon name="settings-outline" color={tintColor} size={24} />)
        })
    },
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: 'green',
            color: theme.color.green
        }, header: null
    },
    tabBarOptions: {
        activeTintColor: '#421c8a',
        labelStyle: {
            fontSize: 12,
        },
    }
})

const MainNavigator = createStackNavigator({
    Tab: TabNavigator

}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: 'green',
            color: '#421c8a'
        }, header: null
    },
}
)
const AppNavigator = createSwitchNavigator({
    Splash: {
        screen: SplashScreen
    },
    Auth: authNavigator,
    Main: MainNavigator,
    otp: otp,
    referApp: referApp,
}, {
    initialRouteName: 'Splash',

})

//Feature Check one
export default createAppContainer(AppNavigator)