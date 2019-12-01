import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { API_URL } from '../config';
//import firebase from 'react-native-firebase';Z
let token1 = null
const AuthStr = 'Bearer ';
const _checkUser = async () => {
    token1 = await AsyncStorage.getItem("userToken")
    token1 = JSON.parse(token1)
    if (token1 && token1.accessToken)
        options.headers.Authorization = AuthStr + token1.accessToken
}
_checkUser()
const options = {
    headers: { 'Content-Type': 'application/json' }

};
const login = (phone) =>
    new Promise((resolve, reject) => {
        resolve(response =
            {
                "code": 200,
                "status": "Login successful",
                "data": {
                    "isNewUser": true,
                    "username": "",
                    "customerUUID": "9865a180-0602-11ea-a17b-b760022d5015",
                    "token": {
                        "accessToken": "751bd95a-bb2b-4f52-9995-3093ba1976ef",
                        "refreshToken": "97266237-cbcc-40ba-9a31-24c45518392f",
                        "expirationTime": 1573969480472
                    },
                    "serverTime": 1573641880474
                }
            }
        )
        // firebase.auth().signInWithPhoneNumber('9632192611')
        //     .then(confirmResult => {
        //         console.log(confirmResult)
        //     })   
        //     .catch(error => {
        //         console.log(error)
        //     });
        // axios.post(API_URL + "identity", {
        //     phone,
        // }, options).then((response) => {
        //     AsyncStorage.setItem('userToken', JSON.stringify(response.data.data.token))
        //         .then(() => {
        //             resolve(response);
        //         });
        // }).catch(err => {
        //     reject(err.response)
        // }

        // );
    });
const logout = (getState) => new Promise(async (resolve, reject) => {
    const currentState = await getState();
    await AsyncStorage.removeItem('userToken');
    resolve(currentState)
}).catch(err => reject(err));



const otp = (otp) =>
    new Promise((resolve, reject) => {
        resolve({ data: 'verified' })
    })





export const userService = {
    login,
    logout,
    otp,
};
