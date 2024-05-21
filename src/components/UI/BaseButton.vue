<template>
  <button :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
    props: ['mode']
}
</script>

<style scoped>
button{
    margin: 0 1rem;
    padding: 0.6rem;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 15px;
}
.contact,
.submit,
.refresh{
    background-color: orange;
    color: white;
    border: none;
}
.details,
.instead{
    background-color: white;
    border: 1px solid orange;
}

</style>