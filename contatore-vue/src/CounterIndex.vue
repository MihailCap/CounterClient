<script setup lang="ts">
    import axios from 'axios';
    import { ref } from 'vue';
    let name = ref<string|null>(null);
    
   
  const creaCounter = () => {
    axios.post('http://localhost:5053/counter/', { input: name })
      .then(response => {
        let counter = response;
      })
      .catch(error => {
        console.error(error);
      });
  }
  



</script>

<template>
    <label for="name">nome</label>
    <input type="text" v-model="name" />
    <button @click="creaCounter()"> crea </button>

</template>

<style>
</style>