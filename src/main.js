import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "./registerServiceWorker";
import router from "./router";

const pinia = createPinia();

createApp(App)
  .use(pinia) // Используем Pinia
  .use(router) // Используем router
  .mount("#app");
