<template>
  <section>
    contact {{ teacherId }}
    <h1>Contact with Your Teacher!</h1>
    <base-form @submit.prevent="contactTeacher" name="Contact">
      <div class="form-control" :class="{invalid: emailValidation}">
        <label for="email">Your Email:</label>
        <input type="email" id="email" name="email" v-model.trim="email" @blur="validateText(email, 'emailValidity')">
        <p v-if="emailValidation">Please Enter a valid email!</p>
      </div>
      <div class="form-control" :class="{invalid: messageValidation}">
        <label for="message">Write a message:</label>
        <textarea id="message" name="message" v-model.trim="message" @blur="validateText(message, 'messageValidity')"></textarea>
        <p v-if="messageValidation">Please Enter a valid message!</p>
      </div>
    </base-form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import BaseForm from '@/components/UI/BaseForm.vue';
import BaseButton from '@/components/UI/BaseButton.vue';

export default {
  components: {
    BaseForm,
    BaseButton
  },  
  props: ['teacherId'],
  data(){
    return{
      message: '',
      email: '',
      messageValidity: 'pending',
      emailValidity: 'pending'
    }
  },
  computed: {
    emailValidation(){
      return this.emailValidity === 'invalid'
    },
    messageValidation(){
      return this.messageValidity === 'invalid'
    }
  },
  methods: {
    ...mapActions('requests', ['setRequest']),
    validateText(text, validity){
      if(text === ''){
        this[validity] = 'invalid'
      }
      else{
        this[validity] = 'valid'
      }
    },
    contactTeacher(){
      if(
          this.emailValidity !== 'valid' ||
          this.messageValidity !== 'valid' 
          )
      {
          alert("enter valid data!")
          return
      }

      const request = {
        email: this.email,
        message: this.message,
        teacherid: this.teacherId
      }

      this.setRequest(request)
      this.$router.replace('/requests');
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
input,textarea {
  display: block;
}
textarea{
  width: 100%;
  min-height: 8rem;
  resize: none;
}
.form-control.invalid input{
  border-color: red;
}
.form-control.invalid label{
  color: red;
}
</style>