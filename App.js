import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UtilityThemeProvider, Box } from 'react-native-design-utility';
import Navigation from './src/screen';
import { images } from './src/constants/images';
import { cacheImages } from './src/utils/cacheImages';
import { ActivityIndicator, UIManager } from 'react-native';
import { Provider } from 'react-redux'
import store from './src/reducers';
import { NavigationService } from './src/api/NavigationService';
import { theme } from './src/theme';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class App extends Component {
  state = {
    isReady: false
  }


  componentDidMount() {
    this.cacheAssets();
  }
  cacheAssets = async () => {
    const imageAssets = cacheImages(Object.values(images));
    await Promise.all([...imageAssets])

    this.setState({
      isReady: true
    })
  }



  render() {
    if (!this.state.isReady) {
      return (
        <Box f={1} center>
          <ActivityIndicator size="large"></ActivityIndicator>
        </Box>
      )
    } else {
      return (
        <UtilityThemeProvider theme={theme}>
          <Provider store={store}>
            <Navigation ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
              onNavigationStateChange={(p, c, a) => {
                NavigationService.currentpane = a
              }}
            />
          </Provider>
        </UtilityThemeProvider>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
