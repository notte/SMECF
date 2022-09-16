<template>
  <section>
    <h6 class="title_h6">企業近3年財務現況</h6>
    <section class="container_grid">
      <BarChartStraight title="營業額" :data="data.barRevenue" />
      <BarChartStraight title="平均員工數" :data="data.barSumPeople" />
      <BarChartStraight title="稅前淨利" :data="data.barProfits" />
      <PieChart type="1" title="最近年度財務結構" :data="data.pieStructure" />
      <BarChartStraight title="研發支出" :data="data.barDevelop" />
      <PieChart type="3" title="財務問題(%)" :data="data.pieDifficult" />
    </section>
  </section>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import BarChartStraight from "@/components/chart/BarChartStraight.vue";
import PieChart from "@/components/chart/PieChart.vue";
import axios from "axios";
import { IFinanceStatistics } from "@/models/interface/financeStatistics";

export default defineComponent({
  components: { BarChartStraight, PieChart },
  setup() {
    const data = reactive({
      pieStructure: [
        { label: "總資產", value: 0 }, 
        { label: "股東權益", value: 0 },
        { label: "總負債", value: 0 },
      ],
      pieDifficult: [
        { label: "缺乏專業/專責財務人員", value: 0 }, 
        { label: "近年財務體質欠佳", value: 0 },
        { label: "自有資金不足，資金籌措困難", value: 0 },
        { label: "訴訟中或其他負債待解決", value: 0 },
        { label: "其他", value: 0 },
      ],
      barRevenue: { 
        xAxis: [ "前兩年", "前年", "去年" ],
        data: [ 0, 0, 0 ],
      },
      barSumPeople: { 
        xAxis: [ "前兩年", "前年", "去年" ],
        data: [ 0, 0, 0 ],
      },
      barProfits: { 
        xAxis: [ "前兩年", "前年", "去年" ],
        data: [ 0, 0, 0 ],
      },
      barDevelop: { 
        xAxis: [ "前兩年", "前年", "去年" ],
        data: [ 0, 0, 0] ,
      },
    });

    onMounted(() => {
      axios
        .get<IFinanceStatistics>("./data/finance_statistics.json")
        .then((res) => {
          data.pieStructure = [
            { label: "總資產", value: res.data.structure.asset },
            { label: "股東權益", value: res.data.structure.equity },
            { label: "總負債", value: res.data.structure.debt },
          ];
          data.pieDifficult = [
            { label: "缺乏專業/專責財務人員", value: res.data.difficult[1] },
            { label: "近年財務體質欠佳", value: res.data.difficult[2] },
            {
              label: "自有資金不足，資金籌措困難",
              value: res.data.difficult[3],
            },
            { label: "訴訟中或其他負債待解決", value: res.data.difficult[4] },
            { label: "其他", value: res.data.difficult[5] },
          ];
          data.barRevenue = {
            xAxis: ["前兩年", "前年", "去年"],
            data: res.data.revenue,
          };
          data.barSumPeople = {
            xAxis: ["前兩年", "前年", "去年"],
            data: res.data.sumPeople,
          };
          data.barProfits = {
            xAxis: ["前兩年", "前年", "去年"],
            data: res.data.profits,
          };
          data.barDevelop = {
            xAxis: ["前兩年", "前年", "去年"],
            data: res.data.develop,
          };
        });
    });
    return { data };
  },
});
</script>
