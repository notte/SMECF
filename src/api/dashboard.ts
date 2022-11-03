import APIhandler from "@/utilities/api-handler";
import * as Model from "@/models/interface/dashboardBasic";
import { Method } from "axios";

interface IRequestConfig {
  file: string;
  method: Method;
}

export default {
  async getDashboardBasic(): Promise<Model.IDashboardBasic[]> {
    const config: IRequestConfig = {
      file: "dashboard_basic.json",
      method: "get",
    };
    const result = await APIhandler.createAxios(config.file, config.method);
    return <Model.IDashboardBasic[]>result.data;
  },
};
