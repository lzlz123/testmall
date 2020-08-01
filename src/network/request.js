import axios from "axios";


export default function request(config) {
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:8000/api/z8',
        timeout: 5000
    })

    //请求拦截，config 是一个请求
    instance.interceptors.request.use(
        config => config,
        error => console.log(error)
    );
    //响应拦截  res 是一个返回信息
    instance.interceptors.response.use(res => {
        return res.data
    }, error => {
        console.log(error)
    });


    return instance(config)
}
