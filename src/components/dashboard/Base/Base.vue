<template>
  <section class="container_grid">
    <DoughnutChart type=1 title="綜合平均分數" :data="data.avgScore" :max="10"/>
    <BarChartHorizontal type=1 title="各構面平均分數" :data="data.eachDimensionAvgScore"/>
    <BarChartHorizontal type=1 title="指標亮點業者" :data="data.highlightCompany"/>
    <!-- TODO: 過案廠商樣貌 要換成 PieChart -->
    <!-- <DoughnutChart type=2 title="過案廠商樣貌" :data="data.manufacturer"/> -->
  </section>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted} from "vue";
import DoughnutChart from "@/components/chart/DoughnutChart.vue";
import BarChartHorizontal from "@/components/chart/BarChartHorizontal.vue";
import axios from "axios";
import { IDashboardBasic } from "@/models//interface/dashboardBasic";

export default defineComponent({
  components: { DoughnutChart, BarChartHorizontal },
  setup() {
    const data = reactive({
      avgScore: [{ name: "5.1", data: 5.1 }],
      eachDimensionAvgScore: [
        { name: "財務力", data: 4.9 },
        { name: "數位力", data: 4.9 },
        { name: "創新力", data: 4.9 },
        { name: "市場力", data: 4.9 }
      ],
      highlightCompany: [
        { name: "公司 A", data: 0 },
        { name: "公司 B", data: 0 },
        { name: "公司 C", data: 0 },
        { name: "公司 D", data: 0 },
        { name: "公司 E", data: 0}
      ],
      manufacturer: [
        { name: "公司年資", data: [0, 0] },
        { name: "資本額", data: [0, 0] },
        { name: "員工數", data: [0, 0] },
        { name: "場址地區", data: [0, 0] },
      ],
    })
    
    onMounted(() => {
      axios.get<IDashboardBasic>("./data/dashboard_basic.json")
        .then((res) => {
          console.log(res.data);
          data.avgScore = [
            { name: res.data.avgScore.toString(), data: res.data.avgScore }
          ];
          data.eachDimensionAvgScore = [
            { name: "財務力", data: res.data.eachDimensionAvgScore.F },
            { name: "數位力", data: res.data.eachDimensionAvgScore.I },
            { name: "創新力", data: res.data.eachDimensionAvgScore.N },
            { name: "市場力", data: res.data.eachDimensionAvgScore.D }
          ];
          data.highlightCompany = [
            { name: "公司 A", data: res.data.highlightCompany[1] },
            { name: "公司 B", data: res.data.highlightCompany[2] },
            { name: "公司 C", data: res.data.highlightCompany[3] },
            { name: "公司 D", data: res.data.highlightCompany[4] },
            { name: "公司 E", data: res.data.highlightCompany[5] }
          ];
          data.manufacturer = [
            { name: "公司年資", data: [res.data.manufacturer.date.actual, res.data.manufacturer.date.total] },
            { name: "資本額", data: [res.data.manufacturer.capital.actual, res.data.manufacturer.capital.total] },
            { name: "員工數", data: [res.data.manufacturer.sumPeople.actual, res.data.manufacturer.sumPeople.total] },
            { name: "場址地區", data: [res.data.manufacturer.st.actual, res.data.manufacturer.st.total] },
          ];
        })
      });
      return {data};
  },
});
</script>
