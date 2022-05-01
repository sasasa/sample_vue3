<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const props = defineProps({
  lng: {
    type: Number,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
})
let center = reactive(props)
let markers = ref([
  {
    position: props,
  },
])
watch(
  () => route.params,
  (value) => {
    console.log(value)
    center = reactive(value)
    markers = ref([
      {
        position: value,
      },
    ])
  }
)
</script>

<template>
  <GMapMap
      :center="center"
      :zoom="10"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
  >
    <GMapCluster>
      <GMapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
      />
    </GMapCluster>
  </GMapMap>
</template>

<style scoped>

</style>