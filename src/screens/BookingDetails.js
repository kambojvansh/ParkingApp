import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import firebase from 'react-native-firebase'
import Loading from "../redux/components/loading"
import {
    loading
} from "../redux/actions"
import { connect } from 'react-redux'




const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
class Bookingdeatils extends Component {
    constructor(props) {
        super(props);
        // this.state = { visible: true };
    }
    buttonClickded = (key) => {
        Alert.alert(
            "Free Slot ",
            "Are you sure? ",
            [
                {
                    text: "Yes", onPress: () => {
                        // this.props.modalShow(false)
                        this.props.loading(true)
                        const DBRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc(key);
                        DBRef.update({
                            // createdAt: new Date().getTime(),
                            // SlotNumber: "Slot Number " + i,
                            Status: false,
                            // BookingId: Math.floor(100000 + Math.random() * 900000)
                            // uid: firebase.auth().currentUser.uid
                        }).then(() => {
                            this.props.loading(false)
                            Actions.deshboard()
                        })
                    }
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                // { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    };
    render() {
        // console.log(this.props.Key)
        return (
            <View
                style={{ flex: 1 }}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: screenWidth,
                        height: 50,
                        backgroundColor: '#45a0e6'
                    }}
                >
                    <Text
                        style={{ alignSelf: 'center', fontSize: 25 }}
                    >
                        Booking Details
            </Text>
                    <View
                        style={{ position: 'absolute', left: 10 }}
                    >

                        <TouchableOpacity
                            onPress={() => Actions.deshboard()}
                        >
                            <Image
                                style={[{ height: 30, width: 30, }]}
                                source={require('../../images/back.png')}
                            ></Image>

                        </TouchableOpacity>

                    </View>
                </View>
                <View
                    style={{ justifyContent: 'center', padding: 20 }}
                >
                    <Text style={{ color: 'gray', fontWeight: 'bold' }}>Parking Id</Text>
                    <Text style={{ fontWeight: 'bold' }}>{this.props.bookingId}</Text>
                </View>
                <View
                    style={{ justifyContent: 'center', padding: 20, backgroundColor: 'lightgray' }}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 30 }}>Info</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 150 }}>
                            <Text style={{ fontWeight: 'bold' }}>Name</Text>
                        </View>

                        <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>{this.props.Name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 150 }}>
                            <Text style={{ fontWeight: 'bold' }}>Phone</Text>
                        </View>
                        <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>{this.props.phone}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 150 }}>
                            <Text style={{ fontWeight: 'bold' }}>Vehicle Number:</Text>
                        </View>
                        <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>{this.props.vnumber}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 150 }}>
                            <Text style={{ fontWeight: 'bold' }}>Date</Text>
                        </View>
                        <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>{this.props.date}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 150 }}>
                            <Text style={{ fontWeight: 'bold' }}>Time In</Text>
                        </View>
                        <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>{this.props.time}</Text>
                    </View>

                </View>

                <View style={{ width: screenWidth, alignItems: 'center', marginTop: 50 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#45a0e6',
                            width: screenWidth / 2,
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}
                        onPress={() => this.buttonClickded(this.props.Key)}
                    >
                        <Text style={{ fontSize: 20, alignSelf: 'center', marginVertical: 10 }}>Free Slot</Text>
                    </TouchableOpacity>

                </View>

                {/* <View>
                    {this.props.isLoading ? <Loading /> : null}

                </View> */}




            </View>
        )
    }
}
const mapStateTOProps = state => {
    // console.log(state)
    return {
        isLoading: state.auth.isLoading,
    }
}

export default connect(mapStateTOProps, {
    loading
})(Bookingdeatils)