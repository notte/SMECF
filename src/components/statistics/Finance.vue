<template>
  <h1>Finance</h1>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import BarChartStraight from "@/components/common/BarChartStraight.vue";
import axios from "axios";
import { IFinanceStatistics } from "@/models/interface/financeStatistics";

export default defineComponent({
  components: { BarChartStraight },
  setup() {
    return {};
  },
  methods: {
    getDashboardBasicData() {
      axios.get<IFinanceStatistics>("./data/finance_statistics.json").then((res) => {
        var financeStatistics: IFinanceStatistics = res.data;
        console.log(financeStatistics);
      });
    }
  }
});
</script>
