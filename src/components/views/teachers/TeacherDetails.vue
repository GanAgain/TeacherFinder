<template>
  <section>
    <div class="details">
      <h2>First Name: {{ teacherDetails.firstname }}</h2>
      <h2>Last Name: {{ teacherDetails.lastname }}</h2>
      <h3>description: {{ teacherDetails.description }}</h3>
      <h3>Price: {{ teacherDetails.price }} PLN/hr</h3>
      <ul class="subjects">
          <base-subject  
          v-for="subject in teacherDetails.subjects" 
          :key="subject"
          :mode="subject">
              {{ subject }}
          </base-subject>
      </ul>
      <div class="contact">
        <base-button mode="contact">
          <router-link :to="teacherContactLink">Contact Teacher</router-link>
        </base-button>
      </div>
    </div>
  </section>
</template>

<script>
import BaseSubject from '@/components/UI/BaseSubject.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  props: ['teacherId'],
  components: {
    BaseSubject,
    BaseButton
  },  
  data(){
    return{
      teacher: []
    }
  },
  computed: {
    teacherContactLink(){
        return{
            name: 'contact-teacher',
            params: { teacherId: this.teacher.id }
        }
    },
    ...mapGetters('teachers', ['teacherDetails'])
  },
  methods: {
    ...mapActions('teachers', ['loadDetails'])
  },
  created(){
    this.loadDetails(this.teacherId)
  }
}
</script>

<style>
ul.subjects{
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content:left;
    align-items:left;
}
.details{
  margin: 2rem auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  padding: 1.2rem;
  border-radius: 15px;
  max-width: 40rem;
}
.contact{
    margin: 1.6rem auto 1rem;
    display: flex;
    justify-content:end;
    align-items:end;
}
a{
    text-decoration: none;
    color: black;
}
.contact a {
    color: white;
}
</style>