import React from "react"
import { Scene, Router } from 'react-native-router-flux'
// import { Scene, Router } from 'react-router-flux'
import Signin from './signIn'
import Deshboard from '../screens/deshboard'
import SignUp from './signUp'
import { StyleSheet, View, TouchableOpacity } from "react-native"

import Icon from 'react-native-vector-icons/Entypo';
import Place from './ParkingPlaceDetails'
import Bookimg from '../screens/BookingDetails'
import Splash from '../screens/SplashScreen'
import Home from '../screens/HomeScreen'

const RouerComponent = () => {
    return (
        <Router
            titleStyle={styles.titleStyle}
            sceneStyle={styles.sceneStyle}
            navigationBarStyle={styles.navBarStyle}
        >
            <Scene key="root" hideNavBar>
                <Scene key="auth">
                    <Scene key="splashScreen" component={Splash}
                        initial
                        // renderRightButton={InboxIcon}
                        hideNavBar={true}
                    />

                    <Scene key="login" component={Signin}
                        // initial
                        // renderRightButton={InboxIcon}
                        hideNavBar={true}
                    />
                    <Scene key="signUp" component={SignUp}
                        hideNavBar={true}
                    />
                    <Scene key="place" component={Place}
                        // initial
                        // renderRightButton={InboxIcon}
                        hideNavBar={true}
                    />
                    <Scene key='deshboard' component={Deshboard}
                        hideNavBar={true}
                        headerLayoutPreset={'center'}
                    />
                    <Scene key='booking' component={Bookimg}
                        hideNavBar={true}
                        headerLayoutPreset={'center'}
                    />
                    {/* <Scene key='Desh' component={Deshboard}
                        hideNavBar={true}
                        headerLayoutPreset={'center'}
                    /> */}
                </Scene>

            </Scene>
        </Router>

    )
}
const styles = StyleSheet.create({
    titleStyle: {
        flex: 1,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        alignSelf: 'center',
    }
})
const InboxIcon = () => {
    return (
        <View style={{ marginRight: 20 }} >
            <TouchableOpacity onPress={() => console.log("asaknknsa")} >
                <Icon
                    name='dots-three-vertical'
                    // type='Feather'
                    size={30}
                />
            </TouchableOpacity>
        </View>
    );
};
export default RouerComponent