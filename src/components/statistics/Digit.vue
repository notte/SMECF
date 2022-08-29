<template>
  <section>
    <h6 class="text-system-light_05">數位化工具使用情形</h6>
    <ul class="switch_button">
      <li class="false">目前</li>
      <li class="true">未來三年</li>
    </ul>
    <p class="other_subtitle">價值鏈管理</p>
    <section class="container_grid">
      <PieChart />
      <BarChartHorizontal />
    </section>
    <p class="other_subtitle">研發生產</p>
    <section class="container_grid">
      <PieChart />
      <BarChartHorizontal />
    </section>
    <p class="other_subtitle">企業管理</p>
    <section class="container_grid">
      <PieChart />
      <BarChartHorizontal />
    </section>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import BarChartHorizontal from "@/components/chart/BarChartHorizontal.vue";
import PieChart from "@/components/chart/PieChart.vue";

export default defineComponent({
  components: { BarChartHorizontal, PieChart },
  setup() {
    return {};
  },
});
</script>
