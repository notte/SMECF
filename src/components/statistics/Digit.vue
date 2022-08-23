<template>
  <section class="container_charts">
    <h6 class="text-system-light_05">數位化工具使用情形</h6>
    <ul class="tabs_statistics">
      <li class="false">目前</li>
      <li class="true">未來三年</li>
    </ul>
    <p class="subtitle_3 text-system-light_01">價值鏈管理</p>
    <section class="wrapper_grid grid-cols-4">
      <BarChartStraight />
      <BarChartStraight />
      <BarChartStraight />
      <BarChartStraight />
      <BarChartStraight />
    </section>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import BarChartStraight from "@/components/common/BarChartStraight.vue";

export default defineComponent({
  components: { BarChartStraight },
  setup() {
    return {};
  },
});
</script>
