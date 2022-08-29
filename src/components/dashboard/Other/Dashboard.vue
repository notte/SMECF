<template>
  <section>
    <h1>基本平均表現</h1>
    <div class="container_title_button">
      <div><button>製造業</button> <button>服務業</button></div>
      <div>
        <button>全部數據下載</button>
      </div>
    </div>
    <section class="container_grid grid-cols-4">
      <PieChart />
      <PieChart />
      <PieChart />
      <PieChart />
    </section>
  </section>
  <section>
    <h1>基本平均表現</h1>
    <div class="container_title_button">
      <div><button>製造業</button> <button>服務業</button></div>
      <div>
        <button>全部數據下載</button>
      </div>
    </div>
    <section class="container_grid grid-cols-4">
      <PieChart />
      <PieChart />
      <PieChart />
      <PieChart />
    </section>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import PieChart from "@/components/chart/PieChart.vue";
import axios from "axios";
import { IDashboardBasic } from "@/models/interface/dashboardBasic";
import { IDashboardOtherFinance } from "@/models/interface/dashboardOtherFinance";
import { IDashboardOtherIntelligent } from "@/models/interface/dashboardOtherIntelligent";

export default defineComponent({
  components: { PieChart },
  setup() {
    return {};
  },
  methods: {
    getDashboardBasicData() {
      axios.get<IDashboardBasic>("./data/dashboard_basic.json").then((res) => {
        var dashboardBasic: IDashboardBasic = res.data;
        console.log(dashboardBasic);
      });
    },

    getDashboardOtherFinanceData() {
      axios
        .get<IDashboardOtherFinance>("./data/dashboard_other_finance.json")
        .then((res) => {
          var dashboardOtherFinance: IDashboardOtherFinance = res.data;
          console.log(dashboardOtherFinance);
        });
    },

    getDashboardOtherIntelligentData() {
      axios
        .get<IDashboardOtherIntelligent>(
          "./data/dashboard_other_intelligent.json"
        )
        .then((res) => {
          var dashboardOtherIntelligent: IDashboardOtherIntelligent = res.data;
          console.log(dashboardOtherIntelligent);
        });
    },
  },
});
</script>
