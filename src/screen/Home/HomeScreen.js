import React, { Component } from 'react'
import { FlatList, View, StyleSheet, TouchableHighlight, ScrollView, StatusBar, Text, BackHandler, Alert } from 'react-native'
import Ads from '../../commons/Ads'
import Dimensions from 'Dimensions'
import Icon from 'react-native-vector-icons/FontAwesome'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../../commons/Header'
import { NavigationService } from '../../api/NavigationService'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const DEVICE_WIDTH = Dimensions.get('window').width


class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [
        { id: '1', title: 'Service', name: 'worker' },
        { id: '2', title: 'Revenue', name: 'chart-bar' },
      ],
      ServiceData: [
        { id: 'electronic', title: 'Electrical', name: 'cellphone-settings-variant' },
        { id: 'ac', title: 'Air Conditioner', name: 'air-conditioner' },
        { id: 'civil', title: 'Civil Work', name: 'human-handsup' },
        { id: 'dth', title: 'DTH', name: 'access-point-network' },
        { id: 'cctv', title: 'CCTV', name: 'cctv' },
        { id: 'gps', title: 'GPS Tracker', name: 'crosshairs-gps' },
        { id: 'refrigerator', title: 'refrigerator', name: 'fridge' },
        { id: 'washing', title: 'Washing', name: 'washing-machine' },
        { id: 'television', title: 'Television', name: 'television' },
        { id: 'purifier', title: 'Water Purifier', name: 'filter-variant' },
        { id: 'cooler', title: 'Air Cooler', name: 'air-purifier' },
        { id: 'carpenter', title: 'Carpenter', name: 'rollerblade' },
        { id: 'plumbing', title: 'Plumbing', name: 'water-pump' },
      ],
      search: '',
      dataSource: []
    }
  }
  onServicePress = (item) => {
    this.props.navigation.navigate('order', { Category: item.id, title: 'Book', })

  }

  updateSearch = (search) => {
    this.setState({ search })
  }
  componentDidMount() {
    this.setState({
      dataSource: this.state.ServiceData
    })
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress.bind(this));

  }
  componentWillUnmount() {
    this.backHandler.remove()
  }
  search = text => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };

  handleBackPress = () => {
    if (NavigationService.currentpane.routeName === "Home" || NavigationService.currentpane.routeName === undefined) {
      Alert.alert(
        'OTS',
        'Are you sure to close OTS App?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          {
            text: 'OK',
            onPress: () => BackHandler.exitApp()
          }
        ],
        {
          cancelable: false
        }
      );
    } else {
      NavigationService.back()
    }
    return true;
  };
  SearchFilterFunction(text) {
    const newData = this.state.ServiceData.filter(function (item) {
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  render() {
    return (

      <View style={styles.container} >

        <StatusBar backgroundColor="blue" barStyle="dark-content" />
        <Header title='Home'></Header>
        <View style={styles.locationContainer}>
          <Icon name='map-marker' size={20} style={styles.imgIcon}></Icon>
          <Text style={{ fontSize: 12, marginHorizontal: '2%', }}>Jp Nagar, Banglore</Text>
        </View>
        <ScrollView>
          <View style={{ marginTop: '10%' }}>
            <Ads></Ads>
          </View>
          <View style={styles.FlatList}>
            <FlatList
              data={this.state.data}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              renderItem={({ item }) =>
                <TouchableHighlight style={styles.containerflatview}>
                  <View style={styles.flatview}>
                    <MIcon name={item.name} size={40} style={{ color: '#f748ae' }}></MIcon>
                    <Text style={styles.name}>{item.title}</Text>
                  </View>
                </TouchableHighlight>
              }
              keyExtractor={item => item.id}
            />
          </View>
          <View style={styles.FlatList}>

            <FlatList
              data={this.state.dataSource}
              showsVerticalScrollIndicator={false}
              numColumns={4}
              renderItem={({ item }) =>
                <View >
                  <TouchableHighlight name={item.clickstyle} onPress={this.onServicePress.bind(this, item)} underlayColor="white">
                    <View style={styles.serviceView}>
                      <View style={{ borderWidth: 1, borderRadius: 50, borderColor: 'transparent', height: 50, width: 50, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', top: 5 }}>
                        <MIcon name={item.name} size={25} style={{ color: '#421c8a', }}></MIcon>
                      </View>
                      <Text style={styles.title}>{item.title}</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              }
              keyExtractor={item => item.id}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  flatview: {
    justifyContent: 'center',
    borderRadius: 2,
    borderStyle: 'solid',
    flexDirection: 'column',
    height: 175,
    width: DEVICE_WIDTH / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0.5,
    backgroundColor: '#dee2ff'

  },
  name: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    alignSelf: 'center',

  }, title: {
    color: '#175091',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    fontSize: 10
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: '1%',
    marginHorizontal: '2%',
  },
  imgIcon: {
    color: '#421c8a'

  }, FlatList: {
    justifyContent: 'center',
    alignItems: 'center'
  }
  , searchbar: {
    backgroundColor: 'white'
  },
  adimage: {
    height: 60,
    width: 80,
    right: 5,
    position: 'absolute',
    top: 0,
  }, containerflatview: {
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  }, serviceView: {
    justifyContent: 'center',
    flexDirection: 'column',
    height: 80,
    width: DEVICE_WIDTH / 4,
    justifyContent: 'center',
    alignItems: 'center',
  }, FlatList: {
    backgroundColor: 'white',
    marginTop: '3%',
    borderColor: 'white',
    borderWidth: 0.3
  }, clickstyle: {
    backgroundColor: 'white',
    color: 'white',
    borderWidth: 0.3,
    borderColor: '#faf8f7'
  }, textStyle: {
    padding: 10,
  },

})
mapStateToProps = (state) => {
  return {
    user: state
  };
}


export default connect(mapStateToProps)(HomeScreen)
