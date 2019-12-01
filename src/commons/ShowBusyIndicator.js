import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

class ShowBusyIndicator extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <View >
                <View style={{ position: 'absolute', top: "0%", right: 0, left: 0, flex: 1, zIndex: 2 }}>
                    <ActivityIndicator animating={true} size="large" color="red" />
                </View>
            </View>
        );
    }
}

export default ShowBusyIndicator;
