<template>
  <p class="other_subtitle">平均分數</p>
  <section class="container_grid">
    <DoughnutChart type="1" title="Develop 綜合平均分數" :data="data.compositeAveScore" :max="10"/>
    <DoughnutChart type="3" title="平均分數" :data="data.avgScore" :max="10"/>
  </section>
  <p class="other_subtitle">構面概覽</p>
  <section class="container_grid">
    <BarChartHorizontal class="h-52" type="2" title="國際供應鏈排名" :data="data.facetedOverview1"/>
    <BarChartHorizontal class="h-52" type="2" title="自有品牌國際化" :data="data.facetedOverview2"/>
    <BarChartHorizontal class="h-52" type="2" title="淨零碳排放落實" :data="data.facetedOverview3"/>
  </section>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted} from "vue";
import DoughnutChart from "@/components/chart/DoughnutChart.vue";
import BarChartHorizontal from "@/components/chart/BarChartHorizontal.vue";
import axios from "axios";

export default defineComponent({
  components: { DoughnutChart, BarChartHorizontal },
  setup() {
    const data = reactive({
      compositeAveScore: [{ name: "", data: 0 }],
      avgScore: [
        { name: "製造業", data: 0 },
        { name: "服務業", data: 0 },
      ],
      facetedOverview1: [
        { name: "製造業", data: 0 },
        { name: "服務業", data: 0 },
      ],
      facetedOverview2: [
        { name: "製造業", data: 0 },
        { name: "服務業", data: 0 },
      ],
      facetedOverview3: [
        { name: "製造業", data: 0 },
        { name: "服務業", data: 0 },
      ],
    });
    // onMounted(() => {
    // });
    return {data};
  },
});
</script>
