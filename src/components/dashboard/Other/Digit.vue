<template>
  <p class="other_subtitle">平均分數</p>
  <section class="container_grid">
    <DoughnutChart />
    <DoughnutChart />
  </section>
  <p class="other_subtitle">購面概覽</p>
  <section class="container_grid">
    <BarChartHorizontal class="h-52" />
    <BarChartHorizontal class="h-52" />
    <BarChartHorizontal class="h-52" />
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import DoughnutChart from "@/components/chart/DoughnutChart.vue";
import BarChartHorizontal from "@/components/chart/BarChartHorizontal.vue";

export default defineComponent({
  components: { DoughnutChart, BarChartHorizontal },
  setup() {
    return {};
  },
});
</script>
