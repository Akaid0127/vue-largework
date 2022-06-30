import {createApp} from 'vue'

import router from './router/index'
import VueCookies from 'vue-cookies'
import ElementPlus from 'element-plus'
import App from "@/App";

import 'element-plus/dist/index.css'


const app = createApp(App);

app.use(router);
app.use(VueCookies);
app.use(ElementPlus);

app.mount('#app');



