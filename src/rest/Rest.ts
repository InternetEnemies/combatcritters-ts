import {IRest} from "./IRest";
import axios, {AxiosInstance, AxiosRequestConfig} from "axios"
import {wrapper} from 'axios-cookiejar-support'
import {CookieJar} from "tough-cookie";

export class Rest  implements IRest {
    private Axios:AxiosInstance;
    
    constructor(private readonly api: string) {
        this.Axios = wrapper(axios.create({
            baseURL:api,
            withCredentials: true,
            jar: new CookieJar()
        }))
    }
    private async request(config:AxiosRequestConfig) {
        // todo at some point this function should also handle/wrap errors
        return (await this.Axios.request(config)).data
    }

    async get(resource: string) {
        return this.request({
            method: "get",
            url: resource
        })
    }
    async delete(resource: string) {
        return this.request({
            method: "delete",
            url: resource
        })
    }
    async put(resource: string, payload: any) {
        return this.request({
            method: "put",
            url: resource,
            data: payload
        })
    }
    async post(resource: string, payload: any) {
        return this.request({
            method: "post",
            url: resource,
            data: payload
        })
    }
    async patch(resource: string, payload: any) {
        return this.request({
            method: "patch",
            url: resource,
            data: payload
        })
    }
    
}