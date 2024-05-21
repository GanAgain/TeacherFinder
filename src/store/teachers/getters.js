export default {
    teachersList(state){
        return state.teachers
    },
    teacherDetails(state){
        return state.teacherDetails
    },
    hasTeachers(state){
        return state.teachers && state.teachers.length > 0
    },
    isTeacher(_, getters, _2, rootGetters){
        const teachers = getters.teachersList
        const userId = rootGetters.userId
        return teachers.some(teacher => teacher.id === userId)
    },
    shouldUpdate(state){
        const lastFetch = state.lastFetch
        if(!lastFetch){
            return true;
        }
        const currentTimeStamp = new Date().getTime()
        return(currentTimeStamp - lastFetch) / 1000 > 60
    }
}