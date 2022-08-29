<template>
  <section class="container_grid">
    <DoughnutChart data="30" />
    <BarChartHorizontal />
    <BarChartHorizontal />
    <DoughnutChart data="60" />
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import DoughnutChart from "@/components/chart/DoughnutChart.vue";
import BarChartHorizontal from "@/components/chart/BarChartHorizontal.vue";

export default defineComponent({
  components: { DoughnutChart, BarChartHorizontal },
  setup() {
    const data = ref<number>(60);
    return { data };
  },
});
</script>
