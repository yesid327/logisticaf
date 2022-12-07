import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import router from './routes'
import $ from "jquery"
window.$ = $;
window.HOST ="http://127.0.0.1:4000/api/v1";

const app = createApp(App)

app.use(router)
app.mount('#app')

