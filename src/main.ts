import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

// include services here
import '@/services/FirebaseService';


createApp(App)
    .use(store)
    .mount('#app')
