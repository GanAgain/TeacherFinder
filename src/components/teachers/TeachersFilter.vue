<template>
  <base-list class="selects">
      <base-subject mode="chemistry" >
        <input type="checkbox" name="filteredSubjects" id="subject-chemistry" value="chemistry" v-model="filteredSubjects"  @change="selectSubject"/>
        <label for="subject-chemistry">chemistry</label>
      </base-subject>
      <base-subject  mode="physics">
        <input type="checkbox" name="filteredSubjects" id="subject-physics" value="physics" v-model="filteredSubjects"  @change="selectSubject"/>
        <label for="subject-physics">physics</label>
      </base-subject>
      <base-subject  mode="biology">
        <input type="checkbox" name="filteredSubjects" id="subject-biology" value="biology" v-model="filteredSubjects"  @change="selectSubject"/>
        <label for="subject-biology">biology</label>
      </base-subject>
      <base-subject  mode="mathematics">
        <input type="checkbox" name="filteredSubjects" id="subject-mathematics" value="mathematics" v-model="filteredSubjects"  @change="selectSubject"/>
        <label for="subject-mathematics">mathematics</label>
      </base-subject>
  </base-list>
</template>

<script>
import BaseList from '@/components/UI/BaseList.vue'
import BaseSubject from '@/components/UI/BaseSubject.vue'

export default {
    emits: ['change-filter'],
    components: {
        BaseSubject,
        BaseList,
    },
    data(){
        return{
            filteredSubjects: [],
        }
    },
    methods: {
        selectSubject() {
            this.$emit('change-filter', this.filteredSubjects)
        }
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
</style>