<template>
  <section class="container_grid">
    <DoughnutChart type=1 title="綜合平均分數" :data="data.avgScore"/>
    <BarChartHorizontal type=1 title="各構面平均分數" :data="data.eachDimensionAvgScore"/>
    <BarChartHorizontal type=1 title="指標亮點業者" :data="data.highlightCompany"/>
    <!-- TODO: 過案廠商樣貌 要換成 PieChart -->
    <DoughnutChart type=2 title="過案廠商樣貌" :data="data.manufacturer"/>
    <!-- <PieChart type="2" title="" :data="data.manufacturer"/> -->
  </section>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted} from "vue";
import DoughnutChart from "@/components/chart/DoughnutChart.vue";
import BarChartHorizontal from "@/components/chart/BarChartHorizontal.vue";
import PieChart from "@/components/chart/PieChart.vue";
import axios from "axios";
import { IDashboardBasic } from "@/models//interface/dashboardBasic";

export default defineComponent({
  components: { DoughnutChart, BarChartHorizontal },
  setup() {
    const data = reactive({
      avgScore: [{ name: "5.1", data: 5.1, max: 10 }],
      eachDimensionAvgScore: [
        { name: "財務力", data: 4.9, max: 10, color: "purple" },
        { name: "數位力", data: 4.9, max: 10, color: "blue" },
        { name: "創新力", data: 4.9, max: 10, color: "green" },
        { name: "市場力", data: 4.9, max: 10, color: "orange" }
      ],
      highlightCompany: [
        { name: "公司 A", data: 4.9, max: 10 },
        { name: "公司 B", data: 4.9, max: 10 },
        { name: "公司 C", data: 4.9, max: 10 },
        { name: "公司 D", data: 4.9, max: 10 },
        { name: "公司 E", data: 4.9, max: 10 }
      ],
      manufacturer: [
        { name: "公司年資", data: 25, max: 75 },
        { name: "資本額", data: 25, max: 200 },
        { name: "員工數", data: 45, max: 60 },
        { name: "場址地區", data: 35, max: 100 },
      ],
    })
    
    onMounted(() => {
      axios.get<IDashboardBasic>("./data/dashboard_basic.json")
        .then((res) => {
          console.log(res.data);
          data.avgScore = [
            { name: res.data.avgScore.toString(), data: res.data.avgScore, max:10 }
          ];
          data.eachDimensionAvgScore = [
            { name: "財務力", data: res.data.eachDimensionAvgScore.F, max: 10, color: "purple" },
            { name: "數位力", data: res.data.eachDimensionAvgScore.I, max: 10, color: "blue" },
            { name: "創新力", data: res.data.eachDimensionAvgScore.N, max: 10, color: "green" },
            { name: "市場力", data: res.data.eachDimensionAvgScore.D, max: 10, color: "orange" }
          ];
          data.highlightCompany = [
            { name: "公司 A", data: res.data.highlightCompany[1], max: 10 },
            { name: "公司 B", data: res.data.highlightCompany[2], max: 10 },
            { name: "公司 C", data: res.data.highlightCompany[3], max: 10 },
            { name: "公司 D", data: res.data.highlightCompany[4], max: 10 },
            { name: "公司 E", data: res.data.highlightCompany[5], max: 10 }
          ];
          data.manufacturer = [
            { name: "公司年資", data: res.data.manufacturer.date.actual, max: res.data.manufacturer.date.total },
            { name: "資本額", data: res.data.manufacturer.capital.actual, max: res.data.manufacturer.capital.total },
            { name: "員工數", data: res.data.manufacturer.sumPeople.actual, max: res.data.manufacturer.sumPeople.total },
            { name: "場址地區", data: res.data.manufacturer.st.actual, max: res.data.manufacturer.st.total },
          ];
        })
      });
      return {data};
  },
});
</script>
