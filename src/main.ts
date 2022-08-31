import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "./assets/index.scss";
import FloatingVue from "floating-vue";

createApp(App).use(router).use(FloatingVue).mount("#app");
