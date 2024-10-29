import { IRest } from "./IRest";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class Rest implements IRest {
  private Axios: AxiosInstance;

  constructor(
    private readonly api: string,
    axiosInstance: AxiosInstance | null = null
  ) {
    if (!axiosInstance) {
      this.Axios = axios.create({
        baseURL: api,
        withCredentials: true,
      });
    } else {
      this.Axios = axiosInstance;
    }
  }

  private async request(config: AxiosRequestConfig) {
    return (await this.Axios.request(config)).data;
  }

  async get(resource: string) {
    return this.request({
      method: "get",
      url: resource,
    });
  }
  async delete(resource: string) {
    return this.request({
      method: "delete",
      url: resource,
    });
  }
  async put(resource: string, payload: any) {
    return this.request({
      method: "put",
      url: resource,
      data: payload,
    });
  }
  async post(resource: string, payload: any) {
    return this.request({
      method: "post",
      url: resource,
      data: payload,
    });
  }
  async patch(resource: string, payload: any) {
    return this.request({
      method: "patch",
      url: resource,
      data: payload,
    });
  }
}
