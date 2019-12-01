import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import Header from '../../commons/Header';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { NavigationService } from '../../api/NavigationService';
import Dimensions from 'Dimensions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendOtp } from '..//../actions/authAction'


const DEVICE_WIDTH = Dimensions.get('window').width



class Otp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            code: ''
        }

    }
    verifyotp = async (otp) => {
        const auth = await this.props.sendOtp(otp);
        console.log(this.props.user)
        this.props.user.auth.isNewUser === true ? this.props.navigation.navigate('referApp', { show: true }) : this.props.user.auth.isAuthrentified ? NavigationService.navigate('Home') : this.setState({ code: '' })
    }
    render() {
        return (
            <View>
                <Header {...this.state} title='Verify OTP' ></Header>
                <View style={{ alignContent: 'center', justifyContent: 'center', marginVertical: '5%', }}>
                    <Text style={{ alignContent: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: '5%', }}>Enter Your 4 digit OTP You have over Phone</Text>
                </View>
                <View style={{ width: DEVICE_WIDTH - 40, alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginLeft: 20, }} >
                    <OTPInputView
                        style={{ width: '100%', height: 200 }}
                        pinCount={6}
                        code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        onCodeChanged={code => { this.setState({ code }) }}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled={this.verifyotp.bind(this)}
                    />
                </View>
                <View>
                    <TouchableHighlight style={styles.button} onPress={async () => { await this.props.reqOtp(this.props.user) }}>
                        <Text style={styles.buttonText}> Resend OTP</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    borderStyleBase: {
        width: 45,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
    buttonText: {
        fontSize: 15,
        color: 'white'
    },
    button: {
        width: DEVICE_WIDTH / 3,
        height: 40,
        alignSelf: 'center',
        borderWidth: 1,
        backgroundColor: '#175091',
        borderRadius: 7,
        borderColor: '#175091',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginHorizontal: 10,
    }
});

mapStateToProps = (state) => {
    return {
        user: state
    };
}
Otp.propTypes = {
    sendOtp: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { sendOtp })(Otp);
