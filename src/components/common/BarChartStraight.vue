<template>
  <section class="wrapper_chart">
    <div class="wrapper_title_button">
      <h3>title</h3>
      <button>下載</button>
    </div>
    <div class="chart">
      <DoughnutChart :chartData="testData" />
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default defineComponent({
  components: { DoughnutChart },
  setup() {
    const testData = {
      labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
      datasets: [
        {
          data: [30, 40, 60, 70, 5],
          backgroundColor: [
            "#77CEFF",
            "#0079AF",
            "#123E6B",
            "#97B0C4",
            "#A5C8ED",
          ],
        },
      ],
    };
    return { testData };
  },
});
</script>
