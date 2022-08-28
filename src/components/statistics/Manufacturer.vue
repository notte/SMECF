<template>
  <section class="container_map">
    <h6 class="text-system-light_05">產業區域分布</h6>
    <ul class="switch">
      <li class="true">登記地區</li>
      <li class="false">擴建廠房分佈</li>
      <li class="false">新建廠房分佈</li>
      <li class="false">產業別區域分佈</li>
    </ul>
    <div class="map" ref="map_size">
      <Map />
      <h6 class="text-system-light_05">產業區域分布</h6>
    </div>
    <div class="data">
      <h6 class="text-system-light_05">產業區域分布</h6>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Map from "@/components/common/Map.vue";
import EventBus from "@/utilities/event-bus";
import PieChart from "@/components/common/PieChart.vue";

export default defineComponent({
  components: { PieChart, Map },
  setup() {
    const map_size = ref();
    onMounted(() => {
      EventBus.emit("create_map", [
        map_size.value.offsetWidth,
        map_size.value.offsetHeight,
      ]);
    });
    return { map_size };
  },
});
</script>
