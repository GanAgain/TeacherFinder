<template>
  <section>
    <h1>Register Yourself!</h1>
    <base-form @submit.prevent="register" name="Register">
        <div class="form-control" :class="{invalid: firstNameValidation}">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" v-model.trim="firstName" @blur="validateText(firstName, 'firstNameValidity')">
          <p v-if="firstNameValidation">Please Enter a valid firstname!</p>
        </div>
        <div class="form-control" :class="{invalid: lastNameValidation}">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" v-model.trim="lastName" @blur="validateText(lastName, 'lastNameValidity')">
          <p v-if="lastNameValidation">Please Enter a valid lastname!</p>
        </div>
        <div class="form-control" :class="{invalid: priceValidation}">
          <label for="price">Your Pricing: (PLN/hr)</label>
          <input type="number" id="price" name="price" v-model.trim="price"  @blur="validatePrice(price, 'priceValidity')">
          <p v-if="priceValidation">A price must be a positive number!</p>
        </div>
        <div class="form-control" :class="{invalid: descriptionValidation}">
          <label for="description">Describe Yourself:</label>
          <textarea id="description" name="description" v-model.trim="description" @blur="validateText(description, 'descriptionValidity')"></textarea>
          <p v-if="descriptionValidation">Please Enter a valid description!</p>
        </div>
        <div class="form-control" :class="{invalid: subjectsValidation}">
          <h2>Select Your Subjects:</h2>
          <base-list class="selects">
            <base-subject mode="chemistry">
              <input type="checkbox" name="subjects" id="subject-chemistry" value="chemistry" v-model="subjects">
              <label for="subject-chemistry">chemistry</label>
            </base-subject>
            <base-subject mode="physics">
              <input type="checkbox" name="subjects" id="subject-physics" value="physics" v-model="subjects">
              <label for="subject-physics">physics</label>
            </base-subject>
            <base-subject mode="biology">
              <input type="checkbox" name="subjects" id="subject-biology" value="biology" v-model="subjects">
              <label for="subject-biology">biology</label>
            </base-subject>
            <base-subject mode="mathematics">
              <input type="checkbox" name="subjects" id="subject-mathematics" value="mathematics" v-model="subjects">
              <label for="subject-mathematics">mathematics</label>
            </base-subject>
          </base-list>
          <p v-if="subjectsValidation">Please select at least one subject!</p>
        </div>
        <p v-if="invalidInputs">
          One or more input fields are invalid. Please check your provided data.
        </p>
    </base-form>
  </section>

</template>

<script>
import BaseSubject from '@/components/UI/BaseSubject.vue';
import BaseForm from '@/components/UI/BaseForm.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseList from '@/components/UI/BaseList.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    BaseSubject,
    BaseForm,
    BaseButton,
    BaseList
  },  
  data(){
    return{
      firstName: '',
      lastName: '',
      price: null,
      subjects: [],
      error: null,
      description: '',
      firstNameValidity: 'pending',
      lastNameValidity: 'pending',
      descriptionValidity: 'pending',
      priceValidity: 'pending',
      subjectsValidity: 'pending',
      invalidInputs: false
    }
  },
  computed: {
    firstNameValidation(){
      return this.firstNameValidity === 'invalid'
    },
    lastNameValidation(){
      return this.lastNameValidity === 'invalid'
    },
    descriptionValidation(){
      return this.descriptionValidity === 'invalid'
    },
    priceValidation(){
      return this.priceValidity === 'invalid'
    },
    subjectsValidation(){
      return this.subjectsValidity === 'invalid'
    }
  },
  methods: {
    ...mapActions('teachers', ['registerTeacher']),
    register(){
      this.invalidInputs = false
      if(
        this.firstNameValidity !== 'valid' ||
        this.lastNameValidity !== 'valid' ||
        this.descriptionValidity !== 'valid' ||
        this.priceValidity !== 'valid'
        )
      {
        this.invalidInputs = true
        return
      }
      if(this.subjects.length < 1){
        this.subjectsValidity = 'invalid'
        return
      }

      const teacherData = {
        lastname: this.lastName,
        firstname: this.firstName,
        subjects: this.subjects,
        description: this.description,
        price: this.price,
      }
      this.registerTeacher(teacherData)
      this.$router.replace('/teachers');
    },
    validateText(text, validity){
      if(text === ''){
        this[validity] = 'invalid'
      }
      else{
        this[validity] = 'valid'
      }
    },
    validatePrice(number, validity){
      console.log(isNaN(number))
      if(number <= 0){
        this[validity] = 'invalid'
      }
      else{
        this[validity] = 'valid'
      }
    }
  },

}
</script>

<style scoped>
h1{
  text-align: center;
  font-size: 2rem;
}
.form-control{
  margin: 1rem auto;
}
input,
textarea{
  display: block;
}
textarea{
  width: 100%;
  min-height: 8rem;
  resize: none;
}
.form-control.invalid input,
.form-control.invalid textarea{
  border-color: red;
}
.form-control.invalid label{
  color: red;
}
input[type='checkbox'],
input[type='radio'] {
  display: none;
}
.selects{
    display: flex;
    justify-content: center;
}
.selects li{
    margin: 1rem auto;
    cursor: pointer;
}
label{
  cursor: pointer;
}
input[type="checkbox"]:checked + label {
  text-decoration: underline;
}
</style>