<template>
  <p class="other_subtitle">平均分數</p>
  <section class="container_grid">
    <DoughnutChart type="1" title="Finance 綜合平均分數" :data="data.compositeAveScore" :max="10"/>
    <DoughnutChart type="3" title="平均分數" :data="data.avgScore" :max="10"/>
  </section>
  <p class="other_subtitle">構面概覽</p>
  <section class="container_grid">
    <BarChartHorizontal class="h-52" type="2" title="未來投資能力" :data="data.facetedOverview1" />
    <BarChartHorizontal class="h-52" type="2" title="經營成長" :data="data.facetedOverview2" />
    <BarChartHorizontal class="h-52" type="2" title="財務結構" :data="data.facetedOverview3" />
  </section>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted} from "vue";
import DoughnutChart from "@/components/chart/DoughnutChart.vue";
import BarChartHorizontal from "@/components/chart/BarChartHorizontal.vue";
import axios from "axios";
import { IDashboardOtherFinance } from "@/models//interface/dashboardOtherFinance";

export default defineComponent({
  components: { DoughnutChart, BarChartHorizontal },
  setup() {
    const data = reactive({
      compositeAveScore: [{ name: "5.1", data: 5.1 }],
      avgScore: [
        { name: "", data: 0 },
        { name: "", data: 0 }
      ],
      facetedOverview1: [
        { name: "", data: 0 },
        { name: "", data: 0 }
      ],
      facetedOverview2: [
        { name: "", data: 0 },
        { name: "", data: 0 }
      ],
      facetedOverview3: [
        { name: "", data: 0 },
        { name: "", data: 0 }
      ],
    })
    onMounted(() => {
      axios.get<IDashboardOtherFinance>("./data/dashboard_other_finance.json")
        .then((res) => {
          console.log(res.data);
          data.compositeAveScore = [{ name: res.data.fianceAvgScore.toString(), data: res.data.fianceAvgScore }];
          data.avgScore = [
            { name: "製造業", data: res.data.avgScore[0]?? 0 },
            { name: "服務業", data: res.data.avgScore[1]?? 0 }
          ];
          data.facetedOverview1 = [
            { name: "製造業", data: res.data.futureInvestment[0]?? 0 },
            { name: "服務業", data: res.data.futureInvestment[1]?? 0 }
          ];
          data.facetedOverview2 = [
            { name: "製造業", data: res.data.businessGrowth[0]?? 0 },
            { name: "服務業", data: res.data.businessGrowth[1]?? 0 }
          ];
          data.facetedOverview3 = [
            { name: "製造業", data: res.data.structure[0]?? 0 },
            { name: "服務業", data: res.data.structure[1]?? 0 }
          ];
        })
      });
    return {data};
  },
});
</script>
