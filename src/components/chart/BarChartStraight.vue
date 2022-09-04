<template>
  <section class="container_chart">
    <div class="top">
      <p class="title">{{title}}</p>
      <button><i class="gg-software-download"></i></button>
    </div>
    <ul class="switch_text">
      <li class="legend_item">
        <div class="icon"></div>
        製造業
      </li>
      <li class="legend_item">
        <div class="icon"></div>
        服務業
      </li>
    </ul>
    <div class="info">
      <v-chart :option="option" class="barBase" style="height: 120px" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as echarts from "echarts/core";
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { propsToAttrMap } from "@vue/shared";
import { keyCodesByKeyName } from "@vue/test-utils/dist/createDomEvent";

echarts.use([
  DatasetComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
]);

export default defineComponent({
  components: { VChart },
  props: [
    'title',
    'data'
  ],
  setup(props) {
    const option = {
      color: ["#00C7F2", "#695CFB"],
      legend: { show: false },
      tooltip: { show: false },
      grid: { show: true, top: 20, left: 30, right: 0, height: 80 },
      xAxis: {
        type: "category",
        axisLine: { lineStyle: { color: "#8A93A1" } },
        data: props.data.xAxis,
      },
      yAxis: [
        {
          type: "value",
          // min: 0,
          // max: Math.max(props.data.data),
          // interval: 1000,
          axisLabel: {
            // formatter: "{value}k",
            formatter: function (value: number, index:number) {
              if(value >= 1000)
                return (value/1000) +'k';
              else 
                return value;
            },
          },
        },
      ],
      series: [
        { type: "bar", data: props.data.data },
        { type: "bar", data: props.data.data },
      ],
    };

    return { option };
  },
});
</script>
