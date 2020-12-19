import axios from "axios";
import { message } from 'antd';
// console.log(process.env.REACT_APP_SERVER_URL)

const instance = axios.create({
    timeout: 10000
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
    if(response.status!=200){
		return message.error(response.statusText)
	}
	if (response.data.code != '200') {
		//403登录过期使用refresh_token
		if(response.data.code=='403'){
			return refresh()	
		}
		//501token异常，返回登录页
		if(response.data.code=='501'){
			message.error(response.data.msg)
			// localStorage.removeItem('access_token')
			// localStorage.removeItem('refresh_token')
			// router.push({name:'login'})
			return
		}
		message.error(response.data.msg)
		return
	}
	if (response.data.code == '200') {
		return response;
	}
    return response;
}, function (error) {
    // console.log('err' + error)
    let err_msg = error.message;
    if (err_msg == "Network Error") {
      	err_msg = "后端接口连接异常";
    }
    else if (err_msg.includes("timeout")) {
      	err_msg = "系统接口请求超时";
    }
    else if (err_msg.includes("Request failed with status code")) {
      	err_msg = "系统接口" + err_msg.substr(err_msg.length - 3) + "异常";
    }
    message.error({
		content: err_msg,
		duration: 5
    })
    return Promise.reject(error)
});
//刷新token
function refresh(){
    return
	axios({
		url:`${process.env.VUE_APP_NET_NAME}/oauth/token`,
		method:'get',
		params:{
			grant_type:'refresh_token',
			refresh_token:localStorage.getItem('refresh_token')
		},
		headers:{
			Authorization:'Basic Y2xpZW50X2FkbWluOjEyMzQ1Ng=='
		}
	}).then(response=>{
		// console.log(response)
		if(response.status!=200){
			Message.error(response.statusText)
			return
		}
		if (response.data.code != '200') {
			Message.error(response.data.msg)
			localStorage.removeItem('access_token')
			localStorage.removeItem('refresh_token')
			router.push({name:'login'})
		}else{
			localStorage.setItem('access_token',response.data.data.access_token)
			localStorage.setItem('refresh_token',response.data.data.refresh_token)
			// this.$router.push({name:'home'})
		}
	}).catch(err=>{
		console.log(err)
	})
}
//all表示传递所有的response，默认传递返回的data
//err_back表示是否需要错误的回调，默认不回调
export function get(url, params = {},all=false,err_back=false,config={}) {
	return new Promise((resolve, reject) => {
		instance({
			...{
				url: url,
				method: 'get',
				params: params
			},...config
		}).then(res => {
			if (res) {
				if(all){
					return resolve(res)
				}
				return resolve(res.data);
			}
			if(err_back){
				return resolve()
			}
		}).catch(err => {
			reject(err);
		})
	})
}

export function post(url, params = {},all=false,err_back=false, headers = { 'Content-Type': 'application/json' },config={}) {
	return new Promise((resolve, reject) => {
		instance({
			...{
				url: url,
				method: 'post',
				data: params,
				headers: headers
			},...config
		}).then(res => {
			if (res) {
				if(all){
					resolve(res)
				}
				resolve(res.data);
			}
			if(err_back){
				return resolve()
			}
		}).catch(err => {
			reject(err);
		})
	})
}