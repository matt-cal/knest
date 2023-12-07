import "@/assets/main.css";
import "purecss";

import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import { createApp } from "vue";

import VueGoogleMaps from "@fawmi/vue-google-maps";

import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import Slider from "primevue/slider";

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
app.use(PrimeVue);
app.component("SliderComponent", Slider);
app.component("InputText", InputText);

app.mount("#app");
