// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import store from './store';  // Adjust the path to your store.js file

const app = createApp(App)
store.dispatch('loadUserFromStorage');
app.use(router)
app.use(store);  // Use the store in the app

app.mount('#app')
