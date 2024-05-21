<template>
  <li>
    <slot></slot>
  </li>
</template>

<style scoped>
li {
  margin: 2rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 15px;
}
li h3{
    font-size: 1.5rem;
}
</style>