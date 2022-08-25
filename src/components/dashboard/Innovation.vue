<template>
  <p class="label_large text-system-dark_05">平均分數</p>
  <section class="wrapper_grid">
    <DoughnutChart />
    <DoughnutChart />
  </section>
  <p class="label_large text-system-dark_05">購面概覽</p>
  <section class="wrapper_grid">
    <BarChartHorizontal />
    <BarChartHorizontal />
    <BarChartHorizontal />
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import DoughnutChart from "@/components/common/DoughnutChart.vue";
import BarChartHorizontal from "@/components/common/BarChartHorizontal.vue";

export default defineComponent({
  components: { DoughnutChart, BarChartHorizontal },
  setup() {
    return {};
  },
});
</script>
