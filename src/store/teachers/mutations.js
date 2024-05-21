export default {
    setTeachers(state,payload){
        state.teachers = payload
    },
    setDetails(state, payload){
        state.teacherDetails = payload
    },
    setFetchTimestamp(state){
        state.lastFetch = new Date().getTime();
    }
}