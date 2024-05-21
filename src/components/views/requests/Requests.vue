<template>
  <section>
    <base-dialog :show="!!error" title="An Error Occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <h3 v-if="isLoading">Loading Requests...</h3>
    <base-list v-else-if="hasRequests && !isLoading">
      <request-item
        v-for="request in requestsList"
        :key="request"
        :request="request">
      </request-item>
    </base-list>
    <h3 v-else>You have no requests!</h3>
  </section>
</template>

<script>
import RequestItem from '@/components/requests/RequestItem.vue';
import BaseList from '@/components/UI/BaseList.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    RequestItem,
    BaseList,
  },
  data(){
    return{
      isLoading: false,
      error: null
    }
  },
  computed:{
    ...mapGetters('requests', ['requestsList', 'hasRequests']),
  },  
  methods: {
    // ...mapActions('requests', ['loadRequests']),
    async loadRequests(){
      try{
        this.isLoading = true
        await this.$store.dispatch('requests/loadRequests')
        this.isLoading = false
      }catch(error){
        this.error = error.message || 'something went wrong!'
        this.isLoading = false
      }
      console.log(this.error)
    },
    handleError(){
      this.error = null;
    }
  },
  created(){
    this.loadRequests()
  }
}
</script>
<style scoped>
h3{
  text-align: center;
}
</style>