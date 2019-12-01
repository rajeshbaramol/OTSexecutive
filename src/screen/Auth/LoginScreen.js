import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Picker, BackHandler, AsyncStorage, ActivityIndicator, Alert } from 'react-native'
import Dimensions from 'Dimensions'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearLoginErrorMessage, login } from '..//../actions/authAction'
import { NavigationService } from '../../api/NavigationService'
import ShowBusyIndicator from '../../commons/ShowBusyIndicator'


class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disableBtn: true,
      country: '',
      phone: '',
      loggingIn: true,
      dataSource: [{ key: 'IN', value: '+91' }]
    }
  }
  showPass() {
    this.state.press === false
      ? this.setState({ showPass: false, press: true })
      : this.setState({ showPass: true, press: false })
  }
  onClickListener = async () => {
    const { phone } = this.state;
    this.showLoader();
    await AsyncStorage.removeItem('userToken');
    if (phone && phone.length !== 10) {
      Alert.alert("OTS",
        "Please Enter Valid 10 Degit Number"
      )
      this.hideLoader();
      return
    }
    await this.props.login("+91" + phone);
    this.hideLoader();
    if (this.props.errorMessage) {
      Alert.alert("OTS",
        this.props.errorMessage
      )
    }
    NavigationService.navigate('otp', { type: 'auth' });
  }
  componentWillReceiveProps(newProps) {
    if (newProps.errorMessage) {
      Alert.alert("OTS",
        newProps.errorMessage
      )
    }
    else if (newProps.userDetails && newProps.userDetails.isAuthrentified) {
      NavigationService.navigate('otp', { type: 'auth' });
    }
  }
  showLoader = () => { this.setState({ loggingIn: true }); };
  hideLoader = () => { this.setState({ loggingIn: false }); };

  componentWillMount() {
    this.hideLoader();
    this._checkUser();
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    NavigationService.navigate('Home');
  }
  _checkUser = async () => {
    let token = await AsyncStorage.getItem("userToken")
    if (token) {
      NavigationService.navigate('Home')
    }
  }
  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    NavigationService.back();
    return true;
  }
  handleChange = (e) => {
    this.setState({
      phone: e,
      disableBtn: e.length > 0 ? false : true
    })
  }
  LoginJSX() {
    return (
      <View style={[styles.container, { zIndex: 0 }]}>
        <View style={styles.inputContainer}>
          <View style={styles.inputs1}>
            <Picker selectedValue={this.state.country} onValueChange={(itemValue, itemIndex) => this.setState({ country: itemValue })}>
              {this.state.dataSource.map(item => <Picker.Item key={item.key} label={item.value} value={item.value} />)
              }
            </Picker>
          </View>
          <TextInput style={styles.inputs}
            placeholder="Phone"
            keyboardType="number-pad"
            underlineColorAndroid='transparent'
            onChangeText={this.handleChange.bind(this)} />
        </View>
        <TouchableHighlight style={[styles.buttonContainer, this.state.disableBtn ? styles.loginButtondisabled : styles.loginButtonenabled]} onPress={() => this.onClickListener()} disabled={this.state.disableBtn}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

      </View>
    )
  }
  render() {
    return (<View>
      {this.state.loggingIn && <ShowBusyIndicator show={this.state.loggingIn} />}
      {this.LoginJSX()}
    </View>)
  }
}



LoginScreen.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    loggingIn: state.auth.loggingIn,
    errorMessage: state.auth.errorMessage,
    userDetails: state.auth
  };
}

export default connect(mapStateToProps, {
  login,
  clearLoginErrorMessage,
})(LoginScreen)



const DEVICE_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH - 5,
    zIndex: 0
  },
  inputContainer: {
    width: DEVICE_WIDTH - 40,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
  },
  inputs: {
    width: '65%',
    height: 45,
    paddingLeft: 10,
    borderTopRightRadius: 3,
    borderBottomEndRadius: 3,
    color: '#000105',
    borderColor: 'gray',
    backgroundColor: 'white'
  },
  inputs1: {
    width: '35%',
    height: 45,
    paddingLeft: 10,
    borderBottomLeftRadius: 3,
    borderTopLeftRadius: 3,
    color: '#000105',
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderRightColor: 'gray',

  },

  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH - 40,
    borderRadius: 3,
  },
  loginButtonenabled: {
    backgroundColor: "#337ab7",
    marginTop: 10,
    opacity: 1
  },
  loginButtondisabled: {
    backgroundColor: "#337ab7",
    marginTop: 10,
    opacity: 0.6
  },
  optionButton: {
    paddingHorizontal: 10
  },
  loginText: {
    color: 'white',
  },
})