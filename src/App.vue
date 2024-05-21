<template>
  <TheNavigation/>
  <main>
    <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
    </router-view>
  </main>
</template>

<script>
import TheNavigation from './components/nav/TheNavigation.vue'

export default{
  components: {
    TheNavigation
  },
  computed: {
    didAutologout(){
      return this.$store.getters.didAutologout
    }
  }, 
  created(){
    this.$store.dispatch('tryLogin')
  },
  watch: {
    didAutologout(curValue, oldValue){
      if(curValue && curValue !== oldValue){
        this.$router.replace('/teachers')
      }
    }
  }
}
</script>

<style>
*{
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
.route-enter-from{
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to{
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-active{
  transition: all 0.3s ease-out;
}
.route-leave-active{
  transition: all 0.3s ease-in;
}
.route-enter-to,
.route-leave-from{
  opacity: 1;
  transform: translateY(0);
}
</style>
