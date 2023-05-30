<script setup lang="ts">
import type { CounterDto } from './client';
import { onMounted, ref, watch } from 'vue';
import { CounterService } from './service/CounterService';
import CounterView from './CounterView.vue';

const counterService = new CounterService();
const counters = ref<CounterDto[]>([]);
const selectedCounter = ref <CounterDto|null>();

const name = ref("");
onMounted(async () => {
  await loadCounters();
  
});

const create = async () => {
  let counter = await counterService.create(name.value);
  if(counter != null){
    counters.value = await counterService.getAll() ?? [];
  }
}

const loadCounters = async () => {
  counters.value = await counterService.getAll() ?? [];
  if(selectedCounter.value != null){
    selectedCounter.value = counters.value.find((c) => c.name == selectedCounter.value!.name);
  }
}


</script>

<template>
  <div class="counter-layout">
    <div class="counter-sidebar">
      <div >
       <input type="text" v-model="name"/>
        <button @click="create">create counter</button>
      </div>
      <div>
        <ul>
          <li v-for="(counter, index) in counters" v-bind:key="index" @click="selectedCounter = counter" class="counter-item">
            {{ counter.name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="counter-body">
      <CounterView :counter="selectedCounter" @changed="loadCounters"></CounterView>
    </div>
  </div>
</template>

<style>
  .counter-layout{
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: stretch;
    margin: 0!important;
    padding: 0!important;
  }
  .counter-sidebar{
    width: 300px;
    padding: 2rem;
    margin: 0;
    text-align: center;
    flex: 0 1 auto;
    border-right: 2px solid black;
    background-color: aliceblue;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .counter-body{
    padding: auto;
    margin: 0;
    flex: 1 0 auto;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: whitesmoke
  }
  input{
    display:block;
    margin-bottom: 5px;
    padding: 6px;
    border-radius: 6px;
    width:270px;
    border: thin solid #121212;
    height:20px;
  }
  button{
    margin-bottom: 30px;
    padding: 6px;
    border-radius: 6px;
    border: thin solid #121212;
    height: 50px;
    width: 50%;
    background-color: rgb(255, 255, 255);
  }
  button:hover{
    background-color: #cdcdcd;
    cursor: pointer;
  }

  .counter-item{
    margin-bottom: 20px;
    padding: 6px;
    border-radius: 6px;
    border: thin solid #121212;
    background-color: rgb(239, 253, 255);
    height: 40px;
  }
  .counter-item:hover{
    background-color: #cdcdcd;
    cursor: pointer;
  }
  
  
</style>
