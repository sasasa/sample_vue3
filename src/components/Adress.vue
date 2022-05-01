<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'
import { useAdressStore } from '@/stores/adress'
import { ref, onMounted, watch } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
const props = defineProps({
  prefecture: {
    type: String,
    required: true
  }
})
const addNum = ref(1)
const counterStore = useCounterStore()
const store = useAdressStore()
const { counter, doubleCount } = storeToRefs(counterStore)
const { list, sortedAdresses, loading, adressDetail } = storeToRefs(store)
onMounted(() => {
  store.fetchAdresssList(props.prefecture)
})
watch(
  () => props.prefecture,
  (value) => {
    store.fetchAdresssList(value)
  }
)
</script>

<template>
  <div v-if="loading">
    読み込み中。。。
  </div>
  <div v-else class="greetings">
    <h1 class="green">アドレス一覧 / {{ prefecture }}</h1>
    <select v-model="addNum">
      <option v-bind:value="1">1</option>
      <option v-bind:value="2">2</option>
      <option v-bind:value="3">3</option>
    </select>
    <button v-on:click="counterStore.increment(addNum)">{{ counter }} / {{ doubleCount }}</button>
    <h3>市区町村</h3>
    <ul>
      <li v-for="(adress, i) in sortedAdresses" v-bind:key="adress">
        <a v-on:click.prevent="store.fetchAdresssDetail(prefecture, adress)">{{ i }}:{{ adress }}</a>
      </li>
    </ul>
    <h3>町域</h3>
    <ul>
      <li v-for="(a, i) in adressDetail" v-bind:key="a">
        <RouterLink v-bind:to="`/adress/${a.lat}/${a.lng}`">{{ i }}:{{ a.town }}</RouterLink>
      </li>
    </ul>
  </div>
  <RouterView />
</template>

<style scoped>

</style>