<template>
  <section class="wrapper_grid">
    <DoughnutChart data="30" />
    <BarChartHorizontal />
    <BarChartHorizontal />
    <DoughnutChart data="60" />
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import DoughnutChart from "@/components/common/DoughnutChart.vue";
import BarChartHorizontal from "@/components/common/BarChartHorizontal.vue";

export default defineComponent({
  components: { DoughnutChart, BarChartHorizontal },
  setup() {
    const data = ref<number>(60);
    return { data };
  },
});
</script>
