<template>
  <section class="container_charts">
    <h3>價值鏈管理</h3>
    <p>採用數位工具或技術</p>
    <section class="wrapper_grid grid-cols-5">
      <BarChartStraight />
      <BarChartStraight />
      <BarChartStraight />
      <BarChartStraight />
      <BarChartStraight />
    </section>
  </section>
  <section class="container_charts">
    <h3>研發生產</h3>
    <p>採用數位工具或技術</p>

    <div class="wrapper_grid grid-cols-5">
      <BarChartStraight />
      <BarChartStraight />
      <BarChartStraight />
      <BarChartStraight />
      <BarChartStraight />
    </div>
  </section>
  <section class="container_charts">
    <h3>企業管理</h3>
    <p class="body_16">採用數位工具或技術</p>

    <div class="wrapper_grid grid-cols-5">
      <BarChartStraight />
      <BarChartStraight />
    </div>
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
