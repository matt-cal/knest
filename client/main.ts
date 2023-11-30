import "@/assets/main.css";
import "purecss";

import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import { createApp } from "vue";

import VueGoogleMaps from "@fawmi/vue-google-maps";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

app.use(pinia);
app.use(router);
app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyC5zhtPj89UIAmGzpvjYFEOi8htimHIUiw",
    libraries: "places",
  },
});

app.mount("#app");
