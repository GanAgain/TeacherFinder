<template>
    <section>
      <base-dialog :show="!!error" title="An Error Occured" @close="handleError">
        <p>{{ error }}</p>
      </base-dialog>
      <base-dialog :show="isLoading" title="Authenticating..." fixed>
        <p>Please Wait</p>
      </base-dialog>
      <h1>{{authTitle}}</h1>
      <base-form @submit.prevent="submitForm" :name="submitButtonCaption">
          <div class="form-control">
              <label for="email">Email</label>
              <input type="email" id="email" v-model.trim="email">
          </div>
          <div class="form-control">
              <label for="password">Password (min. 6 characters)</label>
              <input type="password" id="password" v-model.trim="password">
          </div>
          <p v-if="!formIsValid">Please enter a valid email and password!</p>
          <div class="option">
              <base-button type="button" mode="instead" @click="switchAuthMode">{{switchModeButtonCaption}}</base-button>
          </div>
      </base-form>
    </section>
  </template>
  
  <script>
  import BaseForm from '@/components/UI/BaseForm.vue'
  import BaseButton from '@/components/UI/BaseButton.vue'
  
  export default {
      components: {
          BaseForm,
          BaseButton,
      },
      computed: {
        submitButtonCaption(){
            if(this.mode === 'login'){
                return 'Login'
            } else {
                return 'Signup'
            }
        },
        switchModeButtonCaption(){
            if(this.mode === 'login'){
                return 'Signup instead'
            } else {
                return 'Login instead'
            }
        },
        authTitle(){
            if(this.mode === 'login'){
                return 'Login to your account'
            } else {
                return 'Create account'
            }
        }
      },
      data(){
          return{
              email: '',
              password: '',
              formIsValid: true,
              mode: 'login',
              isLoading: false,
              error: null
          }
      },
      methods: {
          async submitForm(){
            this.formIsValid = true
            if(
                this.email === '' || 
                !this.email.includes('@') || 
                this.password.length < 6
            ){
                this.formIsValid = false
                return
            }

            this.isLoading = true;

            const actionPayload = {
                email: this.email,
                password: this.password
            }

            try {
                if(this.mode === 'login'){
                    await this.$store.dispatch('login', actionPayload)
                } else {
                    await this.$store.dispatch('signup', actionPayload)
                }
                this.$router.replace('/teachers')
            }
            catch(err){
                this.error = err.message || 'Failed to authenticate, try later.'
            }

            this.isLoading = false;

          },
          switchAuthMode(){
            if(this.mode === 'login'){
                this.mode = 'signup'
            } else {
                this.mode = 'login'
            }
          },
          handleError() {
            this.error = null
          }
      }
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
  .option{
      margin: 1.6rem auto 0rem;
      display: flex;
      justify-content:end;
      align-items:end;
  }
  </style>