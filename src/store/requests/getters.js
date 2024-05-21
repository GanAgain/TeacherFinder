export default {
    requestsList(state, _, _2, rootGetters){
        const teacherId = rootGetters.userId
        const test =  state.requests.filter(req => req.teacherid === teacherId)
        console.log(test)
        return state.requests.filter(req => req.teacherid == teacherId)
    },
    hasRequests(_, getters){
      return getters.requestsList && getters.requestsList.length > 0
    }
}