import React, { Component } from 'react';
import { View, TextInput, TouchableHighlight, Text, StyleSheet, KeyboardAvoidingView, Image, Alert } from 'react-native';
import Dimensions from 'Dimensions'
import Header from '../../commons/Header';
import { LinearGradient } from 'expo-linear-gradient';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ProcessUserDetailAction, VerifyPromoCodeAction } from '..//../actions/authAction'



const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

class ReferApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            referCode: "",
            image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.thenounproject.com%2Fpng%2F17241-200.png&imgrefurl=https%3A%2F%2Fthenounproject.com%2Fterm%2Fuser%2F28230%2F&docid=s0kFGkWCbi-c_M&tbnid=FiYI9CQ6bBBX-M%3A&vet=10ahUKEwjPnfSN-_blAhVnzzgGHSswBWQQMwiIASgPMA8..i&w=200&h=200&bih=725&biw=1440&q=%20user&ved=0ahUKEwjPnfSN-_blAhVnzzgGHSswBWQQMwiIASgPMA8&iact=mrc&uact=8",
            disableBtn: false,
            name: '',
            email: '',

        }
    }
    componentDidMount() {
        this.getPermissionAsync();
    }
    verifyRefCode = async () => {
        await this.props.VerifyPromoCodeAction({
            "referralCode": this.state.referCode
        })
    }
    saveDetails = async () => {
        let data =
        {
            "username": this.state.name,
            "profileimageurl": this.state.image,
            "email": this.state.email,
            "isNewUser": this.props.userstate.isNewUser
        }
        await this.props.ProcessUserDetailAction(data)
    }
    getPermissionAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    componentWillReceiveProps(newValues) {
        if (newValues) {
            console.log(newValues)

        }
    }
    render() {
        console.log(this.props)
        return (
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1, backgroundColor: '#175091', zIndex: 0 }}>
                <LinearGradient colors={['#074ee8', '#07e6c8']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ height: '100%', width: '100%', justifyContent: 'center', backgroundColor: 'transparent', opacity: 1, borderColor: 'white', }}
                >
                    <View style={{ marginVertical: '3%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 15, }}>WELCOME TO</Text>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: "bold", }}>OTS</Text>
                    </View>
                    <View style={styles.container}>

                        <View style={{ alignItems: 'center' }}>
                            <View style={{ height: 120, width: 120, backgroundColor: '#e6e6e6', borderWidth: 1, borderColor: '#a6abaa', borderRadius: 100, alignItems: 'center', justifyContent: 'center', }}>
                                <Image source={{ uri: this.state.image }} style={{ height: 120, width: 120, borderRadius: 100, }} />
                                <View style={{
                                    borderWidth: 1, borderRadius: 50, backgroundColor: "#e3e8e7", borderColor: '#b0b5b4', height: 35, width: 35, position: 'absolute', top: 75, left: 90, alignItems: 'center', zIndex: 3
                                }}>
                                    < TouchableHighlight onPress={this._pickImage} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <MIcon name="camera" size={23} style={{ color: '#175091', zIndex: 4, marginTop: '13%' }}></MIcon>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                placeholder="Name"
                                keyboardType="default"
                                underlineColorAndroid='transparent'
                                onChangeText={(name) => { this.setState({ name }) }} />

                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                placeholder="Email"
                                keyboardType="email-address"
                                underlineColorAndroid='transparent'
                                onChangeText={(email) => { this.setState({ email }) }} />
                        </View>
                        {this.props.userstate.isNewUser && < View style={[styles.inputContainer,]}>
                            <View style={{ flexDirection: 'row', }}>
                                <TextInput style={styles.inputs1}
                                    placeholder="Referal Code"
                                    keyboardType="default"
                                    underlineColorAndroid='transparent'
                                    onChangeText={(referCode) => { this.setState({ referCode }) }} />
                                <TouchableHighlight onPress={this.verifyRefCode}>
                                    <Text style={{
                                        width: '100%',
                                        height: 45,
                                        paddingLeft: 10,
                                        color: '#000105',
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#074ee8',
                                        backgroundColor: 'transparent'
                                    }}>Verify</Text>
                                </TouchableHighlight>
                            </View>
                        </View>}
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableHighlight style={[styles.buttonContainer, this.state.disableBtn ? styles.loginButtondisabled : styles.loginButtonenabled]} onPress={this.saveDetails} disabled={this.state.disableBtn}>
                                <Text style={styles.loginText}>Save Details</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </LinearGradient>
            </KeyboardAvoidingView >
        );
    }
}
ReferApp.propTypes = {
    ProcessUserDetailAction: PropTypes.func.isRequired,
    VerifyPromoCodeAction: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        userstate: state.auth
    };
}
export default connect(mapStateToProps, { ProcessUserDetailAction, VerifyPromoCodeAction })(ReferApp);
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignSelf: 'center',
        zIndex: 3,
        width: DEVICE_WIDTH - 40,
        backgroundColor: '#edf2f1',
        borderRadius: 8,
        marginVertical: '10%',

    },
    inputContainer: {
        marginVertical: '4%',
        marginHorizontal: 2,
        alignItems: 'center'
    },
    inputs: {
        width: '65%',
        height: 45,
        paddingLeft: '1%',
        color: '#000105',
        borderBottomWidth: 1,
        borderBottomColor: '#074ee8',
        backgroundColor: 'transparent'
    },
    inputs1: {
        width: '50%',
        height: 45,
        color: '#000105',
        borderBottomWidth: 1,
        borderBottomColor: '#074ee8',
        backgroundColor: 'transparent',
        paddingLeft: '1%',

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
        opacity: 1,
        width: DEVICE_WIDTH / 3

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