import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "./assets/index.scss";
import BootstrapVue3 from "bootstrap-vue-3";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

createApp(App)
  .use(router)
  .use(BootstrapVue3)
  .use(ElementPlus)
  .use(createPinia())
  .mount("#app");
