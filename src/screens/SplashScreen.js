import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import firebase from 'react-native-firebase'
import { Actions } from 'react-native-router-flux'


export default class SplashScreen extends Component {

    componentDidMount() {
        setTimeout(function () {
            firebase.auth().onAuthStateChanged(user => {
                (user ? Actions.deshboard() : Actions.login())
            })

        }, 5000);
    }
    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Image
                    style={{ height: 100, width: 100 }}
                    source={require('../../images/appicon.png')}
                ></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 30, marginTop: 20, color: '#45a0e6' }}>Welcome Admin</Text>
            </View>
        )
    }
}