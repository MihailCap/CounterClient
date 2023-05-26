<script setup lang="ts">
import type { CounterDto } from './client';
import { onMounted, ref } from 'vue';
import { CounterService } from './service/CounterService';

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

}
</script>

<template>
  <div class="counter-layout">
    <div class="counter-sidebar">
      <div>
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
    <div class="counter-body"></div>
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
  }
  .counter-body{
    padding: 2rem;
    margin: 0;
    flex: 1 0 auto;
  }
  input{
    display:block;
    margin-bottom: 5px;
    padding: 6px;
    border-radius: 6px;
    width:100%;
    border: thin solid #121212;
  }
  button{
    margin-bottom: 5px;
    padding: 6px;
    border-radius: 6px;
    border: thin solid #121212;
  }
  button:hover{
    background-color: #cdcdcd;
    cursor: pointer;
  }

  .counter-item{
    margin-bottom: 5px;
    padding: 6px;
    border-radius: 6px;
    border: thin solid #121212;
  }
  .counter-item:hover{
    background-color: #cdcdcd;
    cursor: pointer;
  }
</style>
