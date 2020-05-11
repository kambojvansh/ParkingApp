import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOADING,
    SIGNUP_USER_SUCCESS,
    NAME_CHANGED,
    NUMBER_CHANGED,
    LOGIN_USER_FAIL,
    GETNOTES,
    MODELSHOW,
    ADDRESS_CHANGED,
    FEE_CHANGED,
    SLOT_CHANGED
} from "./types"
import firebase from 'react-native-firebase'
import { Actions } from 'react-native-router-flux'

// import { GoogleSignin } from 'react-native-google-signin'

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
}
// export const nameChanged = (text) => {
//     return {
//         type: NAME_CHANGED,
//         payload: text
//     }
//     // alert(text)
// }
export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
}
export const nameChanged = (text) => {
    return {
        type: NAME_CHANGED,
        payload: text
    }
}
export const numberChanged = (text) => {
    return {
        type: NUMBER_CHANGED,
        payload: text
    }
}
export const addressChanged = (text) => {
    return {
        type: ADDRESS_CHANGED,
        payload: text
    }
}
export const slotChnged = (text) => {
    return {
        type: SLOT_CHANGED,
        payload: text
    }
}
export const feeChanged = (text) => {
    return {
        type: FEE_CHANGED,
        payload: text
    }
}
export const signOut = () => {
    return (dispatch) => {
        dispatch({ type: LOADING, payload: true })
        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch({ type: LOADING, payload: false })
                // dispatch({ type: 'success' })
                Actions.auth()
            })
            .catch(error => {
                alert(error)
                dispatch({ type: LOGIN_USER_FAIL })
            })

    }
}


export const logInUser = (email, password) => {
    return (dispatch) => {
        dispatch({ type: LOADING, payload: true })
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                dispatch({ type: LOGIN_USER_SUCCESS, payload: user })
                // dispatch({ type: 'success' })
                Actions.deshboard()
            })
            .catch(error => {
                alert(error)
                dispatch({ type: LOGIN_USER_FAIL })
            })

    }


}
export const signUpUser = (email, password, name, number, address, slot, fee) => {
    return (dispatch) => {
        dispatch({ type: LOADING, payload: true })
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            // .then(() => this.props.navigation.navigate('Home'))
            .then((user) => {
                dispatch({ type: SIGNUP_USER_SUCCESS, payload: user })
                // alert("sucsess")
                // Actions.place()
                // addNewAdmin(name, number, address, slot, fee)
                // return (dispatch) => {
                // dispatch({ type: LOADING, payload: true })
                const updateDBRef = firebase.firestore().collection("Parkings").doc(address);
                updateDBRef.set({
                    createdAt: new Date().getTime(),
                    Name: name,
                    Number: number,
                    ParkingAddress: address,
                    Slot: slot,
                    ParkingFee: fee,
                    uid: firebase.auth().currentUser.uid
                })
                    .then(() => {
                        // dispatch({ type: LOADING, payload: false })
                        // Actions.notes()
                        // alert("done")
                        // Actions.deshboard()
                        var db = firebase.firestore();
                        // var batch = db.batch()
                        for (let i = 1; i <= slot; i++) {
                            const DBRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc();
                            DBRef.set({
                                createdAt: new Date().getTime(),
                                SlotNumber: "Slot Number " + i,
                                Status: false,
                                BookingId: Math.floor(100000 + Math.random() * 900000)
                                // uid: firebase.auth().currentUser.uid
                            })

                        }
                        dispatch({ type: LOADING, payload: false })





                    })

                    .catch((error) => {
                        alert(error)
                        dispatch({ type: LOADING, payload: false })
                    });
                // }

            })
            .catch(error => {
                alert(error)
                dispatch({ type: LOGIN_USER_FAIL })
            })

    }
}

export const getNotes = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
        // const { Notes, isLikes, notesHeading, notesdate, image, textColor, NotComplete, Complete } = res.data();
        const { SlotNumber,
            Status,
            BookingId,
            Name,
            phone,
            vehicleno,
            TimeIn,
            date,
            email
        } = res.data();
        userArr.push({
            key: res.id,
            res,
            SlotNumber,
            Status,
            BookingId,
            Name,
            phone,
            vehicleno,
            TimeIn,
            date,
            email

        })
        // console.log(userArr)
    })
    return {
        type: GETNOTES,
        payload: userArr
    }

}

// export const countOfNotes = (userArr) => {
//     return (dispatch) => {
//         let key, count = 0
//         for (key in userArr) {
//             if (userArr.hasOwnProperty(key)) {
//                 count++
//             }
//         }
//         dispatch({ type: 'count', payload: count })
//     }
// }
export const countOfNotesCompleted = (userArr) => {
    // console.log(userArr)
    return (dispatch) => {
        let date, completeNote = 0
        const result = userArr.filter(obj => obj.Status === true);
        // console.log(result)
        for (date in result) {
            if (result.hasOwnProperty(date)) {
                completeNote++
                // alert("yes")
            }
        }
        dispatch({ type: 'completeNote', payload: completeNote })
    }
}

export const modalShow = (task) => {
    return {
        type: MODELSHOW,
        payload: task
    }
}





export const loading = (task) => {
    return {
        type: 'loadingShow',
        payload: task
    }
}


