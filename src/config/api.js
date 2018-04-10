import vue from 'vue'
import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 5000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; 		// 请求头


axios.defaults.baseURL = 'https://z.pinquduo.cn/api_3_0_1/'			// 公共接口

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
        axios.post(url, qs.stringify(data))
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

