<template>
  <section class="container_map">
    <div class="map" ref="map">
      <Map />
    </div>
    <div class="data"></div>
  </section>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Map from "@/components/statistics/Taiwan.vue";
import EventBus from "@/utilities/event-bus";
import PieChart from "@/components/common/PieChart.vue";

export default defineComponent({
  components: { PieChart, Map },
  setup() {
    const map = ref();
    onMounted(() => {
      EventBus.emit("create_map", [
        map.value.offsetWidth,
        map.value.offsetHeight,
      ]);
    });
    return { map };
  },
});
</script>
