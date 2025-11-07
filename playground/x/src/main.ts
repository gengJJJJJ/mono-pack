import './assets/main.css'
import 'uno.css'
import {createApp} from 'vue'
import {createPinia} from 'pinia'
import monoComponent from '@gengjjjjj/component'
import {useViewportScale} from '@gengjjjjj/composables'
import App from './App.vue'
import router from './router'
import 'virtual:svg-icons-register'

const app = createApp(App)
useViewportScale({
	designWidth: 1920,
	respectDPR: false
})
app.use(createPinia())
app.use(router)
app.use(monoComponent)

app.mount('#app')
