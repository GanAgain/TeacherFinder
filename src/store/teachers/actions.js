import axios from "axios"

export default {
    async loadTeachers(context, payload){
        if(!payload.forceRefresh && !context.getters.shouldUpdate){
            return
        }

        try{
            const response = await axios.get('https://teacher-finder-e0380-default-rtdb.europe-west1.firebasedatabase.app/Teachers.json')
              if(response.status === 200){
                const data = response.data
                const teachers = []
                for(const id in data){
                  teachers.push({
                    id: id, 
                    firstName: data[id].firstname, 
                    lastName: data[id].lastname,
                    price: data[id].price,
                    description: data[id].description,
                    subjects: data[id].subjects,
                  })
                }
                context.commit('setTeachers', teachers)
                context.commit('setFetchTimestamp')
              }
            }
        catch(error){
            const err = new Error(error.message || 'Failed to fetch')
            throw err
        }    
      },
    async loadDetails(context, id){
        try{
            const response = await axios.get(`https://teacher-finder-e0380-default-rtdb.europe-west1.firebasedatabase.app/Teachers/${id}.json`)
                if(response.status === 200){
                const teacherDetails = response.data
                context.commit('setDetails', teacherDetails)
                }
            }
        catch(error){
            const err = new Error(error.message || 'Failed to fetch')
            throw err
        }    
    },
    async registerTeacher(context, payload){
        const userId = context.rootGetters.userId
        const token = context.rootGetters.token

        try{
            await axios.put(`https://teacher-finder-e0380-default-rtdb.europe-west1.firebasedatabase.app/Teachers/${userId}.json?auth=` + token, {
                lastname: payload.lastname,
                firstname: payload.firstname,
                subjects: payload.subjects,
                description: payload.description,
                price: payload.price,
            })
        }
        catch(error){
            const err = new Error(error.message || 'Failed to send!')
            throw err
        }
        context.dispatch('loadTeachers', {
            ...payload,
            forceRefresh: true
        })
    },
}