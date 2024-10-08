import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import PrimeVue from "primevue/config";
app.use(PrimeVue);

import Button from "primevue/button";
app.component("PrimeButton", Button);
import DataTable from "primevue/datatable";
app.component("PrimeDataTable", DataTable);
import Column from "primevue/column";
app.component("PrimeColumn", Column);
import Dialog from "primevue/dialog";
app.component("PrimeDialog", Dialog);
import Panel from "primevue/panel";
app.component("PrimePanel", Panel);
import InputText from "primevue/inputtext";
app.component("PrimeInputText", InputText);
import Toast from "primevue/toast";
app.component("PrimeToast", Toast);

import router from "./router";
app.use(router);

app.mount("#app");
