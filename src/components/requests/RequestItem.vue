<template>
  <base-card>
    <div><h3><a :href="emailLink"> {{ request.email }} </a></h3></div>
    <div>  
        <p>{{ request.message }}</p>
    </div>
  </base-card>
</template>

<script>
import BaseCard from '@/components/UI/BaseCard.vue';

export default {
    props: ['request'],
    components: {
        BaseCard
    },  
    computed: {
      emailLink(){
        return 'mailto:' + this.request.email
      }
    }
}
</script>

<style scoped>
div{
    display: block;
    padding: 0 1rem;
    margin: 0 auto;
}
a{
  color: rgb(70, 18, 100);
}
</style>