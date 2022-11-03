<template>
  <section class="container_grid">
    <CircleProgressChart type="1" title="綜合平均分數" :data="data.avgScore" />
    <BarChartHorizontal
      type="1"
      title="各構面平均分數"
      :data="data.eachDimensionAvgScore"
    />
    <BarChartHorizontal
      type="1"
      title="指標亮點業者"
      :data="data.highlightCompany"
    />
    <DonutPieChart title="過案廠商樣貌" :data="data.manufacturer" />
  </section>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import CircleProgressChart from "@/components/chart/CircleProgressChart.vue";
import BarChartHorizontal from "@/components/chart/BarChartHorizontal.vue";
import DonutPieChart from "@/components/chart/DonutPieChart.vue";
import axios from "axios";
import { IDashboardBasic } from "@/models//interface/dashboardBasic";
import Api from "@/api/dashboard";

export default defineComponent({
  components: { CircleProgressChart, BarChartHorizontal, DonutPieChart },
  setup() {
    Api.getDashboardBasic().then((res) => {
      console.log(res);
    });
    const data = reactive({
      avgScore: [{ name: "0", data: 0, max: 0 }],
      eachDimensionAvgScore: [
        { name: "財務力", data: 0, max: 0, color: "purple" },
        { name: "數位力", data: 0, max: 0, color: "blue" },
        { name: "創新力", data: 0, max: 0, color: "green" },
        { name: "市場力", data: 0, max: 0, color: "orange" },
      ],
      highlightCompany: [
        { name: "公司 A", data: 0, max: 0 },
        { name: "公司 B", data: 0, max: 0 },
        { name: "公司 C", data: 0, max: 0 },
        { name: "公司 D", data: 0, max: 0 },
        { name: "公司 E", data: 0, max: 0 },
      ],
      manufacturer: [
        {
          name: "公司年資",
          data: [
            { name: "5年以下", value: 0 },
            { name: "6-20年", value: 0 },
            { name: "21-50年", value: 0 },
            { name: "51年以上", value: 0 },
          ],
        },
        {
          name: "資本額",
          data: [
            { name: "2億以上", value: 0 },
            { name: "1億-2億", value: 0 },
            { name: "7500萬-1億", value: 0 },
            { name: "5000萬-7500萬", value: 0 },
            { name: "2500萬-5000萬", value: 0 },
            { name: "1000萬-2500萬", value: 0 },
            { name: "1000萬以下", value: 0 },
          ],
        },
        {
          name: "員工數",
          data: [
            { name: "10人以下", value: 0 },
            { name: "11-100人", value: 0 },
            { name: "101-200人", value: 0 },
            { name: "201人以上", value: 0 },
          ],
        },
        {
          name: "場址地區",
          data: [
            { name: "東", value: 0 },
            { name: "南", value: 0 },
            { name: "中", value: 0 },
            { name: "北", value: 0 },
          ],
        },
      ],
    });

    onMounted(() => {
      axios.get<IDashboardBasic>("./data/dashboard_basic.json").then((res) => {
        // console.log(res.data);
        data.avgScore = [
          {
            name: res.data.avgScore.toString(),
            data: res.data.avgScore,
            max: 10,
          },
        ];
        data.eachDimensionAvgScore = [
          {
            name: "財務力",
            data: res.data.eachDimensionAvgScore.F,
            max: 10,
            color: "purple",
          },
          {
            name: "數位力",
            data: res.data.eachDimensionAvgScore.I,
            max: 10,
            color: "blue",
          },
          {
            name: "創新力",
            data: res.data.eachDimensionAvgScore.N,
            max: 10,
            color: "green",
          },
          {
            name: "市場力",
            data: res.data.eachDimensionAvgScore.D,
            max: 10,
            color: "orange",
          },
        ];
        data.highlightCompany = [
          {
            name: res.data.highlightCompany[1].name,
            data: res.data.highlightCompany[1].score,
            max: 10,
          },
          {
            name: res.data.highlightCompany[2].name,
            data: res.data.highlightCompany[2].score,
            max: 10,
          },
          {
            name: res.data.highlightCompany[3].name,
            data: res.data.highlightCompany[3].score,
            max: 10,
          },
          {
            name: res.data.highlightCompany[4].name,
            data: res.data.highlightCompany[4].score,
            max: 10,
          },
          {
            name: res.data.highlightCompany[5].name,
            data: res.data.highlightCompany[5].score,
            max: 10,
          },
        ];
        data.manufacturer = [
          {
            name: "公司年資",
            data: [
              { name: "5年以下", value: res.data.manufacturer.date[1] },
              { name: "6-20年", value: res.data.manufacturer.date[2] },
              { name: "21-50年", value: res.data.manufacturer.date[3] },
              { name: "51年以上", value: res.data.manufacturer.date[4] },
            ],
          },
          {
            name: "資本額",
            data: [
              { name: "2億以上", value: res.data.manufacturer.capital[1] },
              { name: "1億-2億", value: res.data.manufacturer.capital[2] },
              { name: "7500萬-1億", value: res.data.manufacturer.capital[3] },
              {
                name: "5000萬-7500萬",
                value: res.data.manufacturer.capital[4],
              },
              {
                name: "2500萬-5000萬",
                value: res.data.manufacturer.capital[5],
              },
              {
                name: "1000萬-2500萬",
                value: res.data.manufacturer.capital[6],
              },
              { name: "1000萬以下", value: res.data.manufacturer.capital[7] },
            ],
          },
          {
            name: "員工數",
            data: [
              { name: "10人以下", value: res.data.manufacturer.sumPeople[1] },
              { name: "11-100人", value: res.data.manufacturer.sumPeople[2] },
              { name: "101-200人", value: res.data.manufacturer.sumPeople[3] },
              { name: "201人以上", value: res.data.manufacturer.sumPeople[4] },
            ],
          },
          {
            name: "場址地區",
            data: [
              { name: "東", value: res.data.manufacturer.st[1] },
              { name: "南", value: res.data.manufacturer.st[2] },
              { name: "西", value: res.data.manufacturer.st[3] },
              { name: "北", value: res.data.manufacturer.st[4] },
            ],
          },
        ];
      });
    });
    return { data };
  },
});
</script>
