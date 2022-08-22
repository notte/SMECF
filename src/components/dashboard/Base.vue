<template>
  <section class="wrapper_grid grid-cols-4">
    <PieChart />
    <BarChartHorizontal />
    <BarChartHorizontal />
    <PieChart />
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import PieChart from "@/components/common/PieChart.vue";
import BarChartHorizontal from "@/components/common/BarChartHorizontal.vue";

export default defineComponent({
  components: { PieChart, BarChartHorizontal },
  setup() {
    return {};
  },
});
</script>
