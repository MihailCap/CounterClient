
    <script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import CounterButton from './CounterButton.vue';
import type { CounterDto } from './client';
import { CounterService } from './service/CounterService';

const emit = defineEmits(['changed'])

const counterService = new CounterService();

const props = defineProps<{
    counter: CounterDto | null | undefined,
}>();

const min = ref<number|null>();
const max = ref<number|null>();
const step = ref<number|null>();
const newName = ref<string|null>()

onMounted(() => {
    min.value = props.counter?.min;
    max.value = props.counter?.max;
    step.value = props.counter?.step;
})

watch(()=>props.counter,()=>{
    min.value = props.counter?.min;
    max.value = props.counter?.max;
    step.value = props.counter?.step;
})


const setMin = async () =>{
    if(props.counter != null){
        await counterService.update(props.counter!.name!, {
            name: props.counter?.name,
            min: min.value,
            max: props.counter?.max,
            step: props.counter?.step,
            value: props.counter?.value,
        } as CounterDto);
        emit('changed');
    }
}

const setMax = async () =>{
    if(props.counter != null){
       await counterService.update(props.counter!.name!, {
            name: props.counter?.name,
            min: props.counter?.min,
            max: max.value,
            step: props.counter?.step,
            value: props.counter?.value,
        } as CounterDto);
        emit('changed');
    }
}
const setStep = async () =>{
    if(props.counter != null){
       await counterService.update(props.counter!.name!, {
            name: props.counter?.name,
            min: props.counter?.min,
            max: props.counter?.max,
            step: step.value,
            value: props.counter?.value,
        } as CounterDto);
        emit('changed');
    }
}

const setNewName = async () =>{
    if(props.counter != null){
       await counterService.update(props.counter!.name!, {
            name: newName.value,
            min: props.counter?.min,
            max: props.counter?.max,
            step: props.counter?.step,
            value: props.counter?.value,
        } as CounterDto);
        emit('changed');
    }
}

const incrementa = async () => {
    if(props.counter != null){
        await counterService.increment(props.counter!.name!);
        emit('changed');
    }
}

const decrementa = async () => {
    if(props.counter != null){
        await counterService.decrement(props.counter!.name!);
        emit('changed');
    }
}

const reset = async () => {
    if(props.counter != null){
        await counterService.reset(props.counter!.name!);
        emit('changed');
    }
}

const remove = async () => {
    if(props.counter != null){
        await counterService.remove(props.counter!.name!);
        emit('changed');
    }
}
</script>

<template>  
    <div v-if="counter!=null" id="divMain">
    <h2>{{ counter.name }}</h2>
    <div id="Cont">
        <div id="labels">
        <label for="min">min</label>
        <label for="max">max</label>
        <label for="num">step</label>
        </div>
        <br>
        <div class="inputs">
        <input type="number" id="min" v-model="min" @blur="setMin">
        <input type="number" id="max" v-model="max" @blur="setMax">
        <input type="number" v-model="step"  @blur="setStep" id="step">
        </div>
        <br>
        <br>
        <div style="font-size:40px; color:black">
        {{ counter.value }}
        </div>
        <br>
        <div class="inputs">
        <CounterButton @click="decrementa"  class="bottone">-</CounterButton>
        <CounterButton @click="incrementa"  class="bottone">+</CounterButton>
        <CounterButton @click="reset" class="bottone">reset</CounterButton>
        <CounterButton @click="remove" class="bottone">delete</CounterButton>
        </div>
        <br>
        <label for="text">change counter name: </label>
        <br>
        <input type="text" v-model="newName" @blur="setNewName">
        </div>
    </div>
</template>


<style scoped>
input {
    text-align: center;
    width: 150px;
    display: inline-block;
    
}


div {
    text-align: center;
    color: darkslategray;
    font-size: 25px;
    
}

.inputs{
    display: flex;
    justify-content: space-between;
}

#labels{
    display: flex;
    justify-content: space-between;
    margin:1%;
}

#btnPiù:disabled,
#btnMeno:disabled {
    background-color: grey;
}


label {
    color:darkolivegreen;
    display: inline;
    width: 150px;
    text-align: center;
}

#divMain{
    background-color:whitesmoke
}


#Cont {
    background-color: lightgray;
    border-top: 2px solid black;
    padding: 10%;
}

.bottone {
    margin: 10px;
    width: 160px;
    background-color: ghostwhite;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.bottone:hover{
    background-color: azure;
}

</style>