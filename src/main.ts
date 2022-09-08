import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "./assets/index.scss";
import FloatingVue from "floating-vue";
import BootstrapVue3 from "bootstrap-vue-3";
import { createPinia } from "pinia";

createApp(App)
  .use(router)
  .use(BootstrapVue3)
  .use(createPinia())
  .use(FloatingVue)
  .mount("#app");
