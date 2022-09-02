<template>
  <p class="other_subtitle">平均分數</p>
  <section class="container_grid">
    <DoughnutChart type=1 title="Develop 綜合平均分數" :data="5" />
    <DoughnutChart type=3 title="平均分數" :data="6" />
  </section>
  <p class="other_subtitle">構面概覽</p>
  <section class="container_grid">
    <BarChartHorizontal class="h-52" type=2 title="國際供應鏈排名" :data="1" />
    <BarChartHorizontal class="h-52" type=2 title="自有品牌國際化" :data="2" />
    <BarChartHorizontal class="h-52" type=2 title="淨零碳排放落實" :data="3" />
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
