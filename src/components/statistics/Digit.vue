<template>
  <section class="container_charts">
    <h6 class="text-system-light_05">數位化工具使用情形</h6>
    <ul class="switch">
      <li class="false">目前</li>
      <li class="true">未來三年</li>
    </ul>
    <p class="subtitle_3 text-system-light_01">價值鏈管理</p>
    <section class="wrapper_grid">
      <PieChart />
      <BarChartHorizontal />
    </section>
    <p class="subtitle_3 text-system-light_01">研發生產</p>
    <section class="wrapper_grid">
      <PieChart />
      <BarChartHorizontal />
    </section>
    <p class="subtitle_3 text-system-light_01">企業管理</p>
    <section class="wrapper_grid">
      <PieChart />
      <BarChartHorizontal />
    </section>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import BarChartHorizontal from "@/components/common/BarChartHorizontal.vue";
import PieChart from "@/components/common/PieChart.vue";

export default defineComponent({
  components: { BarChartHorizontal, PieChart },
  setup() {
    return {};
  },
});
</script>
