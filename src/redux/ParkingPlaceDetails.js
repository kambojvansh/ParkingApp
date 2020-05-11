import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Modal,
    BackHandler,
    Image,
    ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';
import { useDispatch, useSelector } from 'react-redux';
import {
    emailChanged,
    nameChanged,
    numberChanged,
    feeChanged,
    slotChnged,
    addressChanged,
    addNewAdmin,
    passwordChanged,
    signUpUser
} from "./actions"
import Loading from "./components/loading"
import firebase from 'react-native-firebase'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


export const Place = () => {
    const name = useSelector(state => state.auth.name)
    const number = useSelector(state => state.auth.number)
    const isLoading = useSelector(state => state.auth.isLoading)
    const add = useSelector(state => state.auth.address)
    const slot = useSelector(state => state.auth.slot)
    const fee = useSelector(state => state.auth.fee)
    const email = useSelector(state => state.auth.email)
    const pass = useSelector(state => state.auth.pass)
    const dispatch = useDispatch()



    const onParkingAddressChanged = (text) => {

        dispatch(addressChanged(text))

    }
    const onNameChanged = (text) => {
        dispatch(nameChanged(text))

    }
    const onNumberChanged = (text) => {
        dispatch(numberChanged(text))
    }
    const onParkingFeeChanged = (fee) => {
        dispatch(feeChanged(fee))
    }
    const onParkingSloteChanged = (slot) => {
        dispatch(slotChnged(slot))
    }
    const onButtonPressed = (email, pass, name, number, add, slot, fee) => {
        dispatch(signUpUser(email, pass, name, number, add, slot, fee))
        // dispatch(addNewAdmin(name, number, add, slot, fee))
    }
    const onEmailchanged = (text) => {
        // this.props.emailChanged(text)
        dispatch(emailChanged(text))

    }
    const onPasswordChanged = (text) => {
        // this.props.passwordChanged(text)
        dispatch(passwordChanged(text))
    }


    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAwareScrollView>

                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'white',
                        height: screenHeight,
                        // marginVertical: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor: 'pink'
                    }}
                >
                    {/* <Image
                        source={require('../../images/appicon.png')}
                        style={styles.img}
                    /> */}


                    <View style={{
                        alignItems: 'center',
                    }}>

                        <View style={{
                            width: screenWidth / 1.5
                        }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Get Started</Text>
                            <Text style={{ color: 'gray', marginBottom: 10 }}>Let's create your Parking account!</Text>

                            {/* <ScrollView style={{ height: screenHeight / 2 }}> */}

                            <FilledTextField
                                label='example@example.com'
                                keyboardType='email-address'
                                lineType='none'
                                onChangeText={(email) => onEmailchanged(email)}
                                value={email}
                                inputContainerStyle={{
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    borderWidth: 1,
                                    borderColor: "lightgray",
                                    backgroundColor: 'white'
                                }}
                                labelTextStyle={{ textAlign: 'center', }}
                            >
                            </FilledTextField>
                            <FilledTextField
                                label='Password'
                                keyboardType='name-phone-pad'
                                lineType='none'
                                onChangeText={(pass) => onPasswordChanged(pass)}
                                value={pass}
                                inputContainerStyle={{
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    borderWidth: 1,
                                    borderColor: "lightgray",
                                    backgroundColor: 'white'
                                }}
                                labelTextStyle={{ textAlign: 'center', }}
                                secureTextEntry={true}
                                title="Minimum 6 characters"
                            >
                            </FilledTextField>
                            <FilledTextField
                                label='Full Name'
                                keyboardType='name-phone-pad'
                                lineType='none'
                                onChangeText={(name) => onNameChanged(name)}
                                value={name}
                                inputContainerStyle={{
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    borderWidth: 1,
                                    borderColor: "lightgray",
                                    backgroundColor: 'white'
                                }}
                                labelTextStyle={{ textAlign: 'center', }}
                            // formatText={this.formatText}
                            // onSubmitEditing={this.onSubmit}
                            // ref={this.fieldRef}
                            >
                            </FilledTextField>
                            <FilledTextField
                                label='Phone Number'
                                keyboardType='number-pad'
                                lineType='none'
                                onChangeText={(num) => onNumberChanged(num)}
                                value={number}
                                inputContainerStyle={{
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    borderWidth: 1,
                                    borderColor: "lightgray",
                                    backgroundColor: 'white'
                                }}
                                labelTextStyle={{ textAlign: 'center', }}
                            // secureTextEntry={true}
                            // title="Minimum 6 characters"
                            >
                            </FilledTextField>

                            <FilledTextField
                                label=' Parking Address'
                                keyboardType='name-phone-pad'
                                lineType='none'
                                onChangeText={(add) => onParkingAddressChanged(add)}
                                value={add}
                                inputContainerStyle={{
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    borderWidth: 1,
                                    borderColor: "lightgray",
                                    backgroundColor: 'white'
                                }}
                                labelTextStyle={{ textAlign: 'center', }}
                            // secureTextEntry={true}
                            // title="Minimum 6 characters"
                            >
                            </FilledTextField>

                            <FilledTextField
                                label='Total Slots'
                                keyboardType='number-pad'
                                lineType='none'
                                onChangeText={(slot) => onParkingSloteChanged(slot)}
                                value={slot}
                                inputContainerStyle={{
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    borderWidth: 1,
                                    borderColor: "lightgray",
                                    backgroundColor: 'white'
                                }}
                                labelTextStyle={{ textAlign: 'center', }}
                                // secureTextEntry={true}
                                title="Enter here how many parking slots you have"
                            >
                            </FilledTextField>
                            <FilledTextField
                                label='Parking Fee'
                                keyboardType='number-pad'
                                lineType='none'
                                onChangeText={(fee) => onParkingFeeChanged(fee)}
                                value={fee}
                                inputContainerStyle={{
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    borderWidth: 1,
                                    borderColor: "lightgray",
                                    backgroundColor: 'white'
                                }}
                                labelTextStyle={{ textAlign: 'center', }}
                            // secureTextEntry={true}
                            // title="In indain rupee"
                            >
                            </FilledTextField>





                            {/* </ScrollView> */}
                        </View>

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {
                                onButtonPressed(email, pass, name, number, add, slot, fee)
                            }
                            }
                        >
                            <Text style={styles.text}>Create</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginTop: 20 }}
                            onPress={() => Actions.login()}
                        >
                            <Text style={{ color: 'gray' }}>Already have an account? LOGIN</Text>

                        </TouchableOpacity>

                    </View>
                    <View>
                        {isLoading ? <Loading /> : null}

                    </View>

                </View>


            </KeyboardAwareScrollView>
            {/* </ScrollView> */}
        </TouchableWithoutFeedback>


    )
    // }
}


const styles = StyleSheet.create({
    img: {
        height: screenHeight / 6,
        resizeMode: 'contain',
        marginBottom: 20
    },
    inputtext: {
        borderWidth: 1,
        // borderBottomColor: '#3498db',
        width: screenWidth / 1.5,
        borderColor: "lightgray",
        margin: 10,
        marginHorizontal: 50,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        textAlign: 'center'
    },
    btn: {
        // borderWidth: 1,
        backgroundColor: '#45a0e6',
        width: screenWidth / 1.5,
        height: 50,
        // borderColor: "lightgray",
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 50,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        // fontWeight: 'bold',
        color: 'white',
        fontSize: 25

    },
    btnLink: {
        borderWidth: 2,
        // backgroundColor: '#45a0e6',
        width: screenWidth / 3.5,
        height: 30,
        borderColor: "#3498db",
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row"
    },
})

// const mapStateTOProps = state => {
//     // console.log(state)
//     return {
//         email: state.auth.email,
//         pass: state.auth.pass,
//         isLoading: state.auth.isLoading,
//         isLogin: state.auth.isLogin
//     }
// }
// export default connect(mapStateTOProps, {
//     emailChanged,
//     passwordChanged,
//     logInUser,
//     onLoginOrRegisterGoogle,
//     onLoginOrRegisterFacebook
// })(Place)
export default Place