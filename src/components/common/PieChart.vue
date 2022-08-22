<template>
  <section class="wrapper_chart">
    <div style="width: 100%; height: 100%">
      <div class="title">
        <p class="subtitle_3 text-system-light_01">標題</p>
        <button>下載</button>
      </div>
      <ul class="tabs">
        <li class="false">製造業</li>
        <li class="true">服務業</li>
      </ul>
      <div class="info">
        <div class="data">
          <h1 class="text-system-light_05">5.1</h1>
          <p class="text-system-light_05">/10</p>
        </div>
        <div class="chart"><DoughnutChart v-bind="doughnutChartProps" /></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { DoughnutChart, useDoughnutChart } from "vue-chart-3";
import { Chart, ChartData, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  components: { DoughnutChart },
  setup() {
    const dataValues = ref([0.3]);

    const testData = computed<ChartData<"doughnut">>(() => ({
      datasets: [
        {
          borderColor: "transparent",
          data: dataValues.value,
          borderRadius: 100,
          weight: 1,
          backgroundColor: ["#055FFC"],
        },
      ],
      plugin: [],
    }));

    const { doughnutChartProps } = useDoughnutChart({
      chartData: testData,
    });

    return {
      doughnutChartProps,
    };
  },
});
</script>
