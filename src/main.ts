import './assets/main.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { useStore } from './store/store';
import { router } from './router/route';


const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
const store = useStore();
store.initializeStore();
app.mount('#app');