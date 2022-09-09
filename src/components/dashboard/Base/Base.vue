<template>
  <section class="container_grid">
    <DoughnutChart type=1 title="綜合平均分數" :data="data.avgScore"/>
    <BarChartHorizontal type=1 title="各構面平均分數" :data="data.eachDimensionAvgScore"/>
    <BarChartHorizontal type=1 title="指標亮點業者" :data="data.highlightCompany"/>
    <!-- TODO: 過案廠商樣貌 要換成 PieChart -->
    <!-- <DoughnutChart type=2 title="過案廠商樣貌" :data="data.manufacturer"/> -->
    <PieChart type="2" title="過案廠商樣貌" :data="data.manufacturer"/>
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
        { name: "公司年資", data: [
          { label: "5年以下", value: 0 },
          { label: "6-20年", value: 0 },
          { label: "21-50年", value: 0 },
          { label: "51年以上", value: 0 },
        ]},
        { name: "資本額", data: [
          { label: "2億以上", value: 0 },
          { label: "1億-2億", value: 0 },
          { label: "7500萬-1億", value: 0 },
          { label: "5000萬-7500萬", value: 0 },
          { label: "2500萬-5000萬", value: 0 },
          { label: "1000萬-2500萬", value: 0 },
          { label: "1000萬以下", value: 0 },
        ]},
        { name: "員工數", data: [
          { label: "10人以下", value: 0 },
          { label: "11-100人", value: 0 },
          { label: "101-200人", value: 0 },
          { label: "201人以上", value: 0 },
        ]},
        { name: "場址地區", data: [
          { label: "東", value: 0 },
          { label: "南", value: 0 },
          { label: "西", value: 0 },
          { label: "北", value: 0 },
        ]},
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
            { name: "公司年資", data: [
              { label: "5年以下", value: res.data.manufacturer.date[1] },
              { label: "6-20年", value: res.data.manufacturer.date[2]  },
              { label: "21-50年", value: res.data.manufacturer.date[3]  },
              { label: "51年以上", value: res.data.manufacturer.date[4]  }]
            },
            { name: "資本額", data: [
              { label: "2億以上", value: res.data.manufacturer.capital[1] },
              { label: "1億-2億", value: res.data.manufacturer.capital[2] },
              { label: "7500萬-1億", value: res.data.manufacturer.capital[3] },
              { label: "5000萬-7500萬", value: res.data.manufacturer.capital[4] },
              { label: "2500萬-5000萬", value: res.data.manufacturer.capital[5] },
              { label: "1000萬-2500萬", value: res.data.manufacturer.capital[6] },
              { label: "1000萬以下", value: res.data.manufacturer.capital[7] },
            ]},
            { name: "員工數", data: [
              { label: "10人以下", value: res.data.manufacturer.sumPeople[1] },
              { label: "11-100人", value: res.data.manufacturer.sumPeople[2] },
              { label: "101-200人", value: res.data.manufacturer.sumPeople[3] },
              { label: "201人以上", value: res.data.manufacturer.sumPeople[4] }
            ]},
            { name: "場址地區", data: [
              { label: "東", value: res.data.manufacturer.st[1] },
              { label: "南", value: res.data.manufacturer.st[2] },
              { label: "西", value: res.data.manufacturer.st[3] },
              { label: "北", value: res.data.manufacturer.st[4] }
            ]},
          ];
        })
      });
      return {data};
  },
});
</script>
