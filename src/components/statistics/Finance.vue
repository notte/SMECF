<template>
  <section>
    <h6 class="text-system-light_05">企業近3年財務現況</h6>
    <section class="container_grid">
      <BarChartStraight />
      <BarChartStraight />
      <BarChartStraight />
      <PieChart />
      <BarChartStraight />
      <PieChart />
    </section>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import BarChartStraight from "@/components/chart/BarChartStraight.vue";
import PieChart from "@/components/chart/PieChart.vue";
import axios from "axios";
import { IFinanceStatistics } from "@/models/interface/financeStatistics";

export default defineComponent({
  components: { BarChartStraight, PieChart },
  setup() {
    return {};
  },
  methods: {
    getDashboardBasicData() {
      axios
        .get<IFinanceStatistics>("./data/finance_statistics.json")
        .then((res) => {
          var financeStatistics: IFinanceStatistics = res.data;
          console.log(financeStatistics);
        });
    },
  },
});
</script>
