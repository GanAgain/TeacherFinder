<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/">Teachers</router-link>
        </li>
        <li v-if="!isTeacher && isLoggedIn">
          <router-link to="/register">Register as a Teacher</router-link> 
        </li>
        <li v-if="isLoggedIn && isTeacher">
          <router-link to="/requests">Requests</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/auth">Login</router-link> 
        </li>
        <li v-else>
          <base-button @click="logout">Logout</base-button> 
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import BaseButton from '../UI/BaseButton.vue';

export default{
  components: {
    BaseButton
  },  
  computed: {
    isLoggedIn(){
      return this.$store.getters.isAuthenticated
    },
    isTeacher() {
      return this.$store.getters['teachers/isTeacher'];
    },
  },
  methods: {
    logout(){
      this.$store.dispatch('logout')
      this.$router.replace('/teachers')
    }
  }
}
</script>

<style scoped>
header{
  width: 100%;
  background-color: blueviolet;
  height: 4rem;
}
nav{
  height: 100%;
}
ul{
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
li{
  margin: 0 2rem;
}
a{
  text-decoration: none;
  font-size: 1.2rem;
  color: white;
  padding: 0.5rem 1.5rem;
  display: inline-block;
}

</style>