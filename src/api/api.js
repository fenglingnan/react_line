import axios from "axios";
import { message } from 'antd';
// console.log(process.env.REACT_APP_SERVER_URL)

const instance = axios.create({
    timeout: 5000
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export function get(url,data={}){
    return new Promise((resolve,reject)=>{
        instance({
            url:url,
            method:'get',
            params:data
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

export function post(url,data={},headers={'Content-Type':'application/json'}){
    return new Promise((resolve,reject) => {
        instance({
            url:url,
            method:'post',
            data:data,
            headers: headers
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}