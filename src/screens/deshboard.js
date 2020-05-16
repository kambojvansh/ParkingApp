import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    Alert,
    BackHandler,
    ScrollView,
    FlatList,
    Modal
} from 'react-native'
import OptionsMenu from "react-native-options-menu"
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'
import {
    signOut,
    getNotes,
    countOfNotes,
    countOfNotesCompleted,
    countOfNotesNotCompleted,
    addNewAdmin,
    modalShow,
    loading
} from "../redux/actions"
import Loading from "../redux/components/loading"
import { Actions } from 'react-native-router-flux'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const MoreIcon = require("../../images/moreOption.png");


class Deshboard extends Component {

    constructor() {
        super()
        // this.id = firebase.auth().currentUser.uid !== "" ? firebase.currentUser.uid : this.props.userArr.id
        this.getref = firebase.firestore().collection(firebase.auth().currentUser.uid).orderBy('SlotNumber', 'ASC')
    }
    componentDidMount() {
        this.unsubscribe = this.getref.onSnapshot(this.props.getNotes)
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    componentWillUnmount() {
        this.unsubscribe();
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    logOutUser = () => {
        Alert.alert(
            'Logout User',
            'Are you sure?',
            [
                { text: 'Yes', onPress: () => this.props.signOut() },
                { text: 'No', onPress: () => console.log('User not signout'), style: 'cancel' },
            ],
            {
                cancelable: true
            }
        );
    }
    // getCount() {
    //     // let key, count = 0
    //     let Complete, completeNote = 0
    //     for (Complete == true in this.props.userArr) {
    //         if (this.props.userArr.hasOwnProperty(isLikes)) {
    //             completeNote++
    //         }
    //     }
    //     return count
    // }
    onBackPress = () => {
        Alert.alert(
            'Exit',
            'Are you sure?',
            [
                { text: 'Yes', onPress: () => BackHandler.exitApp() },
                { text: 'No', onPress: () => console.log('User not exit'), style: 'cancel' },
            ],
            {
                cancelable: true
            }
        );
        return true;
    }

    buttonClickded = (bookingId, key) => {
        Alert.alert(
            "Free Slot ",
            "Are you sure? ",
            [
                {
                    text: "Yes", onPress: () => {
                        this.props.modalShow(false)
                        this.props.loading(true)
                        const DBRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc(key);
                        DBRef.update({
                            // createdAt: new Date().getTime(),
                            // SlotNumber: "Slot Number " + i,
                            Status: false,
                            // BookingId: Math.floor(100000 + Math.random() * 900000)
                            // uid: firebase.auth().currentUser.uid
                        }).then(() => this.props.loading(false))
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
        // this.getCollection
        let { userArr } = this.props
        // this.props.countOfNotes(userArr)
        this.props.countOfNotesCompleted(userArr)
        // this.props.countOfNotesNotCompleted(userArr)
        return (

            <View style={{ flex: 1, backgroundColor: '#45a0e6' }}>
                {/* for top option bar */}



                <View
                    style={{
                        backgroundColor: '#45a0e6',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: screenWidth,
                        height: 50
                    }}
                >
                    <Text
                        style={{ alignSelf: 'center', fontSize: 25 }}
                    >
                        Deshboard
            </Text>
                    <View
                        style={{ position: 'absolute', right: 10 }}
                    >
                        <OptionsMenu
                            button={MoreIcon}
                            buttonStyle={{
                                width: 20,
                                height: 30,
                                margin: 7.5,
                                resizeMode: "contain",
                                // position: 'absolute',
                                // alignSelf: 'center',
                                // left: 70
                            }}
                            destructiveIndex={1}
                            options={["Logout"]}
                            actions={[this.logOutUser]}
                        />

                    </View>
                </View>
                {/* <ScrollView> */}
                <View style={{ backgroundColor: 'white', marginTop: 2 }}>

                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        margin: 10
                    }}>Today's Status</Text>
                </View>
                <View style={{
                    marginTop: 2,
                    flexDirection: 'row',
                }}>

                    <View style={{
                        flex: 1,
                        backgroundColor: 'white',
                        marginLeft: 1,
                        justifyContent: 'center',
                    }}>
                        <View
                            style={{ marginLeft: 30, padding: 10, marginBottom: 10 }}
                        >
                            <Text
                                style={{ fontSize: 40 }}
                            >{this.props.bookings}</Text>
                            <Text
                                style={{ color: 'gray' }}
                            >BOOKED SLOT</Text>

                        </View>
                    </View>
                </View>


                <FlatList
                    style={{ backgroundColor: '#45a0e6', marginTop: 2, alignSelf: 'center' }}
                    data={userArr}
                    numColumns={2}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{
                                marginTop: 2,
                                // flexDirection: 'row',
                                // justifyContent: 'center',
                                alignItems: 'center',
                                // alignSelf: 'center'
                            }}>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: 'white',
                                    margin: 10,
                                    justifyContent: 'center',
                                    borderBottomLeftRadius: 30,
                                    borderBottomRightRadius: 30,
                                    borderTopLeftRadius: 30,
                                    borderTopRightRadius: 30,
                                }}>
                                    <View
                                        // style={{ marginLeft: 30, padding: 10, marginBottom: 10 }}
                                        style={{
                                            width: screenWidth / 2.5,
                                        }}
                                    >
                                        <TouchableOpacity
                                            style={{

                                            }}
                                            onPress={() => {
                                                // this.buttonClickded(item.BookingId, item.key)
                                                // this.props.modalShow(true)
                                                console.log(this.props.Token)
                                                Actions.booking({
                                                    Key: item.key,
                                                    bookingId: item.BookingId,
                                                    Name: item.Name,
                                                    phone: item.phone,
                                                    vnumber: item.vehicleno,
                                                    time: item.TimeIn,
                                                    date: item.date
                                                })
                                            }}
                                        >
                                            <View style={{
                                                // flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: 150
                                            }}>
                                                <Text
                                                    style={{}}
                                                >{item.SlotNumber}</Text>
                                                {/* <Text
                                                    style={{}}
                                                >{item.BookingId}</Text> */}
                                                {item.Status == true ?
                                                    <Image
                                                        source={require("../../images/car.png")}
                                                        style={styles.imageicon}
                                                    /> :
                                                    <Text>Free</Text>
                                                }


                                            </View>
                                            {/* <Text
                                                style={{ fontSize: 40 }}
                                            >{3}</Text>
                                            <Text
                                                style={{ color: 'gray' }}
                                            >TOTAL SLOT</Text> */}

                                        </TouchableOpacity>
                                    </View>


                                </View>




                            </View>
                        )
                    }
                    }
                    keyExtractor={(index, item) => index + item}
                >

                </FlatList>
                {/* <View>
                    {this.props.isLoading ? <Loading /> : null}

                </View> */}
                {/* </ScrollView> */}




            </View >
        )
    }
}

const styles = StyleSheet.create({
    cards: {
        backgroundColor: '#b52c09',
        height: screenHeight / 7,
        width: screenWidth / 3.5,
        margin: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10

    },
    imageicon: {
        height: 100
        , resizeMode: 'contain',
        width: 100,
        alignSelf: 'center'
    },
    cardText: {
        color: 'white'
    },
    progressBar: {
        width: screenWidth / 2,
        height: screenHeight / 70,
        backgroundColor: '#b52c09',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    progressBorder: {
        borderWidth: 1,
        padding: 5,
        marginHorizontal: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: 'gray',
        flexDirection: 'row',
        alignItems: 'center'
    },
    progressCount: {
        fontSize: 10,
        position: 'absolute',
        right: 15,
        fontWeight: 'bold'
    }
})
const mapStateTOProps = state => {
    // console.log(state)
    return {
        isLoading: state.auth.isLoading,
        name: state.auth.name,
        number: state.auth.number,
        user: state.auth.user,
        userArr: state.auth.userArr,
        count: state.auth.count,
        bookings: state.auth.bookings,
        modelVisible: state.auth.ModelVisible,
        Token: state.auth.firbaseToken,
    }
}

export default connect(mapStateTOProps, {
    signOut,
    getNotes,
    countOfNotes,
    countOfNotesCompleted,
    countOfNotesNotCompleted,
    addNewAdmin,
    modalShow,
    loading
})(Deshboard)
// export default


{/* <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={this.props.modelVisible}>
                                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center' }}>
                                        <View
                                            style={{
                                                backgroundColor: '#45a0e6',
                                                marginHorizontal: 10,
                                                height: screenHeight / 2,
                                                // justifyContent: 'center',
                                                borderBottomLeftRadius: 20,
                                                borderBottomRightRadius: 20,
                                                borderTopLeftRadius: 20,
                                                borderTopRightRadius: 20,
                                            }}
                                        >
                                            <View>
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    marginLeft: 20

                                                }}>Booking ID:- {item.BookingId}</Text>
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    marginLeft: 20

                                                }}>Vical Number:- {item.vehicleno}</Text>
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    marginLeft: 20

                                                }}>Booking Date:- {item.date}</Text>
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    marginLeft: 20

                                                }}>Time In:- {item.TimeIn}</Text>

                                            </View>


                                            <TouchableOpacity style={[styles.btn, {
                                                // marginBottom: 20,
                                                position: 'absolute',
                                                right: 10,
                                            }]}
                                                onPress={() => {
                                                    this.props.modalShow(false)
                                                }}
                                            >
                                                <Image
                                                    style={[styles.img, { height: 30, width: 30, }]}
                                                    source={require('../../images/colorClose.png')}
                                                ></Image>
                                            </TouchableOpacity>
                                            {/* <View style={{ flexDirection: "row" }}> */}

                                //             <TouchableOpacity
                                //                 style={{
                                //                     position: 'absolute',
                                //                     right: screenWidth / 2.3,
                                //                     top: screenHeight / 2.3,
                                //                     borderBottomLeftRadius: 20,
                                //                     borderBottomRightRadius: 20,
                                //                     borderTopLeftRadius: 20,
                                //                     borderTopRightRadius: 20,
                                //                     borderWidth: 1,
                                //                     backgroundColor: 'white'
                                //                 }}
                                //                 onPress={() => this.buttonClickded(item.BookingId, item.key)}
                                //             >
                                //                 <Text style={{
                                //                     fontWeight: 'bold',
                                //                     alignSelf: 'center',
                                //                     fontSize: 20,
                                //                     margin: 10

                                //                 }}>Free Slot</Text>
                                //             </TouchableOpacity>

                                //             {/* </View> */}

                                //         </View>
                                //     </View>

                                // </Modal> */}