import axios, {
  AxiosRequestConfig,
  //   AxiosRequestHeaders,
  AxiosResponse,
  Method,
} from "axios";
import { requestFail, responseFail } from "@/utilities/error-handler";
import { ElNotification } from "element-plus";

class handler {
  config: AxiosRequestConfig;

  constructor() {
    this.config = {
      baseURL: "./data/",
      responseType: "json",
    };
  }

  async createAxios(file: string, method: Method): Promise<AxiosResponse> {
    // this.config.headers = await this.GetAuthorizationHeader();
    this.config.url = file;
    this.config.method = method;

    const instance = axios.create();

    instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        requestFail(error);
      }
    );
    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        responseFail(error);
      }
    );

    let result;

    try {
      result = await instance.request(this.config);
      return Promise.resolve(result);
    } catch (error) {
      ElNotification({
        title: "Error",
        message: "get result fail",
        type: "error",
      });
      return Promise.reject(error);
    }
  }
}

const APIhandler = new handler();

export default APIhandler;
