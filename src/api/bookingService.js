import { AsyncStorage } from 'react-native';
import { API_URL } from '../config';
import Axios from 'axios';

let token1 = null
const AuthStr = 'Bearer ';
const _checkUser = async () => {
    token1 = await AsyncStorage.getItem("userToken")
    token1 = JSON.parse(token1)
    if (token1 && token1.accessToken)
        options.headers.Authorization = AuthStr + token1.accessToken
}
const options = {
    headers: { 'Content-Type': 'application/json' }
};
_checkUser()

const getBookingslist = (username) =>
    new Promise((resolve, reject) => {
        resolve({ data: 'dymmy token' })
        // axios.post(`${API_URL}/user/auth`, {
        //     username,
        //     password,
        // }).then((response) => {
        AsyncStorage.setItem('userToken', "response.data.token")
        //         .then(() => {
        //             resolve(response);
        AsyncStorage.setItem('userData', JSON.stringify("response.data.user"));
        //         });
        // }).catch(err => reject(err));
    });
const addService = async data => {
    await _checkUser();
    new Promise((resolve, reject) => {
        Axios.post(API_URL + 'sercive', data, options).then(res => {
            resolve(res)
        }).catch(err => {
            console.log(err)
        })
    })
}


export const bookingService = {
    getBookingslist,
    addService
}