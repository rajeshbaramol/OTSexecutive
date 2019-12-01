import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Image, FlatList, ScrollView, BackHandler, Clipboard } from 'react-native'
import { images } from '../../constants/images'
import PropTypes from 'prop-types'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Dimensions from 'Dimensions'
import Header from '../../commons/Header'
import { NavigationService } from '../../api/NavigationService'
import { connect } from 'react-redux';
import { logout, GetUserAction } from '..//../actions/authAction'
const DEVICE_WIDTH = Dimensions.get('window').width

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            DP: images.avatar,
            Name: ' ',
            Phone: ' ',
            Email: ' ',
            referalCode: '',
            dataSource: [{ key: 'My Langluage', icon: 'sort-alphabetical', label: 'English' },
            { key: 'My Address', icon: 'home-map-marker' }, { key: 'Bill Notification', icon: 'newspaper' },
            { key: 'Reports', icon: 'comment-account-outline' },
            { key: 'QRCODE', icon: 'qrcode', label: " " },
            { key: 'Share', icon: 'share' },
            { key: 'FAQ', icon: 'cloud-question' }, { key: 'Logout', icon: 'logout' }]

        }
    }



    handleProfileClick = async (actionname) => {
        switch (actionname.key) {
            case 'Logout':
                await this.props.logout();
                NavigationService.navigate('Auth');
                break;
            case 'Change Password':
                NavigationService.navigate('changePassword');
                break;
            case 'Share':
                this.onShare()
            default:
                break;
        }
    }
    componentWillMount = async () => {
        await this.props.GetUserAction()
    }

    componentWillReceiveProps(NextProps) {
        let userdata = NextProps.user.auth.userProfile
        dataSource = this.state.dataSource.map(d => d.key == "QRCODE" ? { key: 'QRCODE', icon: 'qrcode', label: userdata.referralCode } : d)
        this.setState({
            DP: userdata.avatar,
            Name: userdata.username,
            Phone: userdata.phone,
            Email: userdata.email,
            referalCode: userdata.referralCode,
            dataSource
        })
    }
    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: 0.3,
                    width: '100%',
                    backgroundColor: '#080808',
                }}
            />
        );
    };
    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert("error");
        }
    };
    render() {
        return (
            <ScrollView>
                <Header title='Profile'></Header>
                <View>
                    <View style={{ borderBottomWidth: 0.3, borderColor: '#999a9e', height: 160 }}>
                        <View style={{ marginVertical: '5%', marginHorizontal: '5%', flexDirection: 'row' }}>
                            <TouchableHighlight>
                                <View style={{ height: 120, width: 120, backgroundColor: '#e6e6e6', borderWidth: 1, borderColor: 'grey', borderRadius: 100, alignItems: 'center', justifyContent: 'center', }}>
                                    <Image source={this.state.DP}></Image>
                                </View>
                            </TouchableHighlight>
                            <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginHorizontal: '4%' }}>
                                <Text style={{ fontSize: 16, marginVertical: '10%' }}>{this.state.Phone}</Text>
                                <Text style={{ fontSize: 14, }}>{this.state.Name}</Text>
                                <Text style={{ fontSize: 14, }}>{this.state.Email}</Text>
                                <TouchableHighlight style={{ marginVertical: '10%' }} onPress={() => {
                                    this.props.navigation.setParams({ show: false })
                                    this.props.navigation.navigate("referApp", { show: false })
                                }}>
                                    <View >
                                        <Text style={{ color: '#1b3fcf' }}>Edit Details</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>

                    </View>
                    <View>
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={({ item }) =>
                                <View style={{ flexDirection: 'row', height: 50, }}>
                                    <View style={{ marginHorizontal: '4%', justifyContent: 'center' }}>
                                        <MIcon name={item.icon} size={26} style={{ color: '#175091' }}></MIcon>
                                    </View>
                                    <View style={{ marginHorizontal: '2%', justifyContent: 'center', minWidth: DEVICE_WIDTH - 150 }}>
                                        <TouchableHighlight style={{ justifyContent: 'center' }} onPress={this.handleProfileClick.bind(this, item)}>
                                            <View style={{ justifyContent: 'center' }}>
                                                <Text style={{}}>{item.key}</Text>
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                    {item.label && <View style={{ justifyContent: 'center' }}>
                                        <TouchableHighlight onPress={() => Clipboard.setString(item.label)} >
                                            <Text style={{ color: '#324ebf', justifyContent: 'center' }}>{item.label}</Text>
                                        </TouchableHighlight>
                                    </View>}
                                </View>
                            }
                            ItemSeparatorComponent={this.ListViewItemSeparator}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}
Profile.propTypes = {
    logout: PropTypes.func.isRequired,
    GetUserAction: PropTypes.func.isRequired
}
mapStateToProps = (state) => {
    return {
        user: state,
        userProfile: state.auth.userProfile
    };
}

export default connect(mapStateToProps, { logout, GetUserAction })(Profile)
