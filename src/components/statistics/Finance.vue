<template>
  <section class="container_charts">
    <h6 class="text-system-light_05">企業近3年財務現況</h6>
    <section class="wrapper_grid grid-cols-4">
      <BarChartStraight />
      <BarChartStraight />
      <BarChartStraight />
      <PieChart />
      <BarChartStraight />
      <PieChart />
    </section>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import BarChartStraight from "@/components/common/BarChartStraight.vue";
import PieChart from "@/components/common/PieChart.vue";

export default defineComponent({
  components: { BarChartStraight, PieChart },
  setup() {
    return {};
  },
});
</script>
