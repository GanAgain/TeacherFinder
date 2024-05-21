import { createStore } from 'vuex'
import teachersModule from './teachers/index.js'
import requestsModule from './requests/index.js'
import authModule from './auth/index.js'

const store = createStore({
  modules: {
    teachers: teachersModule,
    requests: requestsModule,
    auth: authModule
  },
  
})

export default store
