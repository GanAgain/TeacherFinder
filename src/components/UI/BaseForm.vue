<template>
    <form>
        <slot></slot>
        <slot name="button">
          <div class="option">
            <base-button mode="submit">{{name}}</base-button>
          </div>
        </slot>
    </form>
</template>

<script>
import BaseButton from '@/components/UI/BaseButton.vue';

export default{
  components: {
    BaseButton
  },
  props: ['name']  
}
</script>

<style scoped>
form{
  margin: 0.5rem auto;
  max-width: 40rem;
  border-radius: 15px;
  padding: 2rem;
  box-shadow:  0 2px 8px rgba(0, 0, 0, 0.26);
}
.option{
    margin: 1rem auto 0rem;
    display: flex;
    justify-content:end;
    align-items:end;
}
  </style>