import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import BaseDialog from './components/UI/BaseDialog.vue'

const BaseDialog = defineAsyncComponent(() => import('./components/UI/BaseDialog.vue'))

const app = createApp(App)

app.component('base-dialog', BaseDialog)

app.use(store).use(router).mount('#app')
