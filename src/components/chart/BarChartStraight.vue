<template>
  <section class="container_chart">
    <div class="top">
      <p class="title">{{ title }}</p>
      <!-- <button><i class="gg-software-download"></i></button> -->
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
      <div class="bar_straight" ref="chartDOM"></div>
      <!-- <v-chart :option="option"  /> -->
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
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
import { statusStore } from "@/store/index";

echarts.use([
  DatasetComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
]);

export default defineComponent({
  components: { VChart },
  props: ["title", "data"],
  setup(props) {
    const status = statusStore();
    const chartDOM = ref();

    onMounted(() => {
      let barStraight = echarts.init(chartDOM.value);
      window.addEventListener("resize", () => {
        barStraight.resize();
      });

      if (status.mode === "dark") {
        barStraight.setOption(darkOption, true);
      } else {
        barStraight.setOption(option, true);
      }

      watch(
        () => status.mode,
        (newMode) => {
          if (newMode === "dark") {
            barStraight.setOption(darkOption, true);
          } else {
            barStraight.setOption(option, true);
          }
        },
        { deep: true }
      );

      watch(() => props.data, (newData, oldData) => {        
        if(newData!=oldData) {
          option.series = [
            { type: "bar", data: newData.data },
            { type: "bar", data: newData.data },
          ];
          option.xAxis.data = newData.xAxis;
          darkOption.series = [
            { type: "bar", data: newData.data },
            { type: "bar", data: newData.data },
          ];
          darkOption.xAxis.data = newData.xAxis;
          if (status.mode === "dark") {
            barStraight.setOption(darkOption, true);
          } else {
            barStraight.setOption(option, true);
          }
        }
      });
    });
    const option = {
      backgroundColor: "transparent",
      textStyle: {
        color: "#8A93A1",
      },
      lineStyle: {
        color: "#8A93A1",
      },
      borderColor: "#D8DEE7",
      color: ["#00C7F2", "#695CFB"],
      legend: { show: false },
      tooltip: { show: false },
      grid: {
        show: true,
        top: 20,
        left: 40,
        right: 0,
        height: 80,
        borderColor: "#D8DEE7",
      },
      xAxis: {
        type: "category",
        data: props.data.xAxis,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
      },
      yAxis: {
        splitLine: {
          show: true,
          lineStyle: { color: "#D8DEE7" },
        },
        type: "value",
        // min: 0,
        // max: Math.max(props.data.data),
        // interval: 1000,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          // formatter: "{value}k",
          formatter: function (value: number, index: number) {
            if (value >= 1000) return value / 1000 + "k";
            else return value;
          },
        },
      },
      series: [
        { type: "bar", data: props.data.data },
        { type: "bar", data: props.data.data },
      ],
    };

    const darkOption = {
      backgroundColor: "transparent",
      textStyle: {
        color: "#8A93A1",
      },
      borderColor: "#383C41",
      color: ["#00C7F2", "#695CFB"],
      legend: { show: false },
      tooltip: { show: false },
      grid: {
        show: true,
        top: 20,
        left: 40,
        right: 0,
        height: 80,
        borderColor: "#383C41",
      },
      xAxis: {
        type: "category",
        data: props.data.xAxis,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
      },
      yAxis: {
        splitLine: {
          show: true,
          lineStyle: { color: "#383C41" },
        },
        type: "value",
        // min: 0,
        // max: Math.max(props.data.data),
        // interval: 1000,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          // formatter: "{value}k",
          formatter: function (value: number, index: number) {
            if (value >= 1000) return value / 1000 + "k";
            else return value;
          },
        },
      },
      series: [
        { type: "bar", data: props.data.data },
        { type: "bar", data: props.data.data },
      ],
    };
    return { chartDOM, status };
  },
});
</script>
