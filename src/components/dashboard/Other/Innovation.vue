<template>
  <p class="other_subtitle">平均分數</p>
  <section class="container_grid">
    <DoughnutChart type="1" title="New 綜合平均分數" :data="data.newAvgScore" :max="10"/>
    <DoughnutChart type="3" title="平均分數" :data="data.avgScore" :max="10"/>
  </section>
  <p class="other_subtitle">構面概覽</p>
  <section class="container_grid">
    <BarChartHorizontal class="h-52" type="2" title="專利研發" :data="data.facetedOverview1" />
    <BarChartHorizontal class="h-52" type="2" title="國際認證" :data="data.facetedOverview2" />
    <BarChartHorizontal class="h-52" type="2" title="創新商用化" :data="data.facetedOverview3" />
  </section>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted} from "vue";
import DoughnutChart from "@/components/chart/DoughnutChart.vue";
import BarChartHorizontal from "@/components/chart/BarChartHorizontal.vue";
import axios from "axios";
import { IDashboardOtherNew } from "@/models//interface/dashboardOtherNew";

export default defineComponent({
  components: { DoughnutChart, BarChartHorizontal },
  setup() {
    const data = reactive({
      newAvgScore: [{ name: "0", data: 0, max: 10 }],
      avgScore: [
        { name: "製造業", data: 0, max: 10 },
        { name: "服務業", data: 0, max: 10 },
      ],
      facetedOverview1: [
        { name: "製造業", data: 0, max: 10, color:"purple" },
        { name: "服務業", data: 0, max: 10, color:"blue" },
      ],
      facetedOverview2: [
        { name: "製造業", data: 0, max: 10, color:"purple" },
        { name: "服務業", data: 0, max: 10, color:"blue" },
      ],
      facetedOverview3: [
        { name: "製造業", data: 0, max: 10, color:"purple" },
        { name: "服務業", data: 0, max: 10, color:"blue" },
      ],
    });
    onMounted(() => {
      axios.get<IDashboardOtherNew>("./data/dashboard_other_new.json")
        .then((res) => {
          console.log(res.data);
          data.newAvgScore = [{ name: res.data.newAvgScore.toString(), data: res.data.newAvgScore, max: 10}];
          data.avgScore = [
            { name: "製造業", data: res.data.avgScore[0]?? 0, max: 10},
            { name: "服務業", data: res.data.avgScore[1]?? 0, max: 10},
          ];
          data.facetedOverview1 = [
            { name: "製造業", data: res.data.patent[0]?? 0, max: 10, color:"purple"},
            { name: "服務業", data: res.data.patent[1]?? 0, max: 10, color:"blue"},
          ];
          data.facetedOverview2 = [
            { name: "製造業", data: res.data.license[0]?? 0, max: 10, color:"purple"},
            { name: "服務業", data: res.data.license[1]?? 0, max: 10, color:"blue"},
          ];
          data.facetedOverview3 = [
            { name: "製造業", data: res.data.ideas[0]?? 0, max: 10, color:"purple"},
            { name: "服務業", data: res.data.ideas[1]?? 0, max: 10, color:"blue"},
          ];
        })
    });
    return {data};
  }, 
});
</script>
