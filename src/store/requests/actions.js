import axios from "axios"

export default {
    async loadRequests(context){
        const token = context.rootGetters.token

        try{
          const response = await axios.get(`https://teacher-finder-e0380-default-rtdb.europe-west1.firebasedatabase.app/Requests.json?auth=` + token)
          if(response.status === 200){
            const data = response.data
            const requests = []
            for(const id in data){
              requests.push({
                id: id,
                email: data[id].email,
                message: data[id].message,
                teacherid: data[id].teacherid
              })
            }
            context.commit('setRequests', requests)
          }
        }
        catch(error){
          const err = new Error(error.message || 'Failed to send request!')
          throw err
        }
    },
    async setRequest(context, payload){

        const newRequest = {
          email: payload.email,
          message: payload.message,
          teacherid: payload.teacherid 
        }
        const response = axios.post('https://teacher-finder-e0380-default-rtdb.europe-west1.firebasedatabase.app/Requests.json', {
            email: payload.email,
            message: payload.message,
            teacherid: payload.teacherid 
            
        }).catch((error) => {
            const err = new Error(error.message || 'Failed to send request!')
            throw err
        })
        const responseData = await response

        newRequest.id = responseData.name

        context.commit('addRequest', newRequest)
    }
}