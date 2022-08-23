<template>
  <section class="wrapper_grid grid-cols-4">
    <DoughnutChart />
    <BarChartHorizontal />
    <BarChartHorizontal />
    <DoughnutChart />
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
