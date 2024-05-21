import teachersMutations from './mutations.js'
import teachersActions from './actions.js'
import teachersGetters from './getters.js'

export default {
    namespaced: true,
    state(){
        return{
            lastFetch: null,
            teachers: [],
            teacherDetails: []
        }
    },
    mutations: teachersMutations,
    actions: teachersActions,
    getters: teachersGetters,
}