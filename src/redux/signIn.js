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
    Image
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';
import { connect } from 'react-redux';
import {
    emailChanged,
    passwordChanged,
    logInUser,
    onLoginOrRegisterGoogle,
    onLoginOrRegisterFacebook
} from "./actions"
import Loading from "./components/loading"
import firebase from 'react-native-firebase'
import { GoogleSignin } from '@react-native-community/google-signin'
import { LoginButton, AccessToken } from 'react-native-fbsdk'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


export class SignIn extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            (user ? Actions.deshboard() : null)
        })
    }

    onEmailchanged(text) {
        this.props.emailChanged(text)

    }
    onPasswordChanged(text) {
        this.props.passwordChanged(text)
    }
    buttonPressed() {
        const { email, pass } = this.props
        this.props.logInUser(email, pass)
        // if (this.props.isLogin) {
        //     this.props.navigation.navigate('Deshboard')
        // }
        // this.props.navigation.navigate('Deshboard')
    }
    // loginSuccess = () => {
    //     this.props.navigation.navigate('Deshboard')

    // }

    render() {


        // console.log(this.props.email)
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAwareScrollView>
                    <View
                        style={{
                            // flex: 1,
                            backgroundColor: 'white',
                            height: screenHeight,
                            // marginVertical: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={require('../../images/appicon.png')}
                            style={styles.img}
                        />

                        <View style={{
                            alignItems: 'center',
                        }}>
                            <View style={{
                                width: screenWidth / 1.5
                            }}>
                                <FilledTextField
                                    label='example@gmail.com'
                                    keyboardType='email-address'
                                    lineType='none'
                                    onChangeText={this.onEmailchanged.bind(this)}
                                    value={this.props.email}
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
                                    label='Password'
                                    keyboardType='name-phone-pad'
                                    lineType='none'
                                    onChangeText={this.onPasswordChanged.bind(this)}
                                    value={this.props.pass}
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
                            </View>

                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => {
                                    // if (this.props.email == "" && this.props.pass == "")
                                    //     return
                                    this.buttonPressed()

                                }
                                }
                            >
                                <Text style={styles.text}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ marginTop: 20 }}
                                // onPress={() => this.props.navigation.navigate('signup')}
                                onPress={() =>
                                    // Actions.signUp()
                                    Actions.place()
                                }
                            >
                                <Text style={{ color: 'gray' }}>Don't have an account? REGISTER</Text>

                            </TouchableOpacity>




                        </View>
                        <View>
                            {this.props.isLoading ? <Loading /> : null}

                        </View>

                    </View>

                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>

        )
    }
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

const mapStateTOProps = state => {
    // console.log(state)
    return {
        email: state.auth.email,
        pass: state.auth.pass,
        isLoading: state.auth.isLoading,
        isLogin: state.auth.isLogin
    }
}
export default connect(mapStateTOProps, {
    emailChanged,
    passwordChanged,
    logInUser,
    onLoginOrRegisterGoogle,
    onLoginOrRegisterFacebook
})(SignIn)