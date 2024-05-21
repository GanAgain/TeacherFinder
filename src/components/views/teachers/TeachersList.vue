<template>
  <section>
    <base-dialog :show="!!error" title="An Error Occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <teachers-filter @change-filter="setFilters"> </teachers-filter>
    <div class="option">
        <base-button @click="loadTeachers(true)" mode="submit">Refresh</base-button>
    </div>
    <base-list v-if="hasTeachers">
      <teacher-item 
          v-for="teacher in filteredTeachers" 
          :key="teacher" 
          :teacher="teacher"
      ></teacher-item>
    </base-list>
    <h3 v-else-if="isLoading">Loading Data...</h3>
    <h3 v-else>No coaches found!</h3>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TeacherItem from '../../teachers/TeacherItem.vue'
import BaseList from '@/components/UI/BaseList.vue'
import BaseSubject from '@/components/UI/BaseSubject.vue'
import TeachersFilter from '../../teachers/TeachersFilter.vue'
import BaseButton from '@/components/UI/BaseButton.vue'

export default {
    components: {
        TeacherItem,
        BaseSubject,
        BaseList,
        TeachersFilter,
        BaseButton,
    },
    data(){
        return {
            filteredTeachers: [],
            activeSubjects: [],
            isLoading: false,
            error: null
        }
    },
    computed: {
        // ...mapGetters('teachers', ['hasTeachers']),
        hasTeachers(){
          return !this.isLoading && this.$store.getters['teachers/hasTeachers']
        },
        filteredTeachers(){
          const teachers = this.$store.getters['teachers/teachersList']
          const filteredData = Object.values(teachers).filter(teacher => {
              return this.activeSubjects.every(subject => teacher.subjects.includes(subject));
          });
          return filteredData
        }
    },
    methods: {
        // ...mapActions('teachers', ['loadTeachers']),
        async loadTeachers(refresh = false){
          this.isLoading = true
          try{
            await this.$store.dispatch('teachers/loadTeachers', {forceRefresh: refresh})
          }catch(error){
            this.error = error.message || 'something went wrong!'
          }
          this.isLoading = false
          console.log(this.error)
          
        },
        setFilters(filteredSubjects) {
          this.activeSubjects = filteredSubjects
        },
        handleError(){
          this.error = null;
        }
    },
    created(){
        this.loadTeachers()
        this.filteredTeachers = this.teachersList
    }
}
</script>

<style scoped>
.selects{
    display: flex;
    justify-content: center;
}
.selects li{
    margin: 1rem auto;
    cursor: pointer;
}
input[type='checkbox'],
input[type='radio'] {
  display: none;
}
label{
  cursor: pointer;
}
input[type="checkbox"]:checked + label {
  text-decoration: underline;
}
h3{
  text-align: center;
}
.option{
    margin: 1.6rem auto 0rem;
    display: flex;
    justify-content:end;
    align-items:end;
    max-width: 35rem;
}
</style>