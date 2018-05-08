import vue from 'vue'
import axios from 'axios'
import qs from 'qs'

import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';

axios.defaults.timeout = 5000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; 		// 请求头


axios.defaults.baseURL = 'http://api.dev-pqd.com/'			// 公共接口

// 请求拦截器
axios.interceptors.request.use((config) => {
        return config
    }, (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
axios.interceptors.response.use((response) => {
        return response
    }, (error) => {
        return Promise.reject(error)
    }
)

// 封装axios

// get
export function get(url,params = {}) {
    return new Promise((resolve,reject) => {
        axios.get(url,{params:params})
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}
// post
export function post(url, data) {
    return new Promise((resolve, reject) => {
        Indicator.open({
            text: '加载中...',
            spinnerType: 'double-bounce'
        });
        axios.post(url, qs.stringify(data,data.version='5.0.0'))
            .then((response) => {
                Indicator.close();
                if (response.data.code == '200') {
                    resolve(response.data.data.result)
                } else {
                    let instance = Toast(response.data.msg);
                    setTimeout(() => {
                        instance.close();
                    }, 2000);
                }

            })
            .catch((error) => {
                reject(error)
            })
    })
}

