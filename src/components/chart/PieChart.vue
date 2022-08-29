<template>
  <section class="container_chart">
    <!-- 最上層標題 -->
    <div class="top">
      <p class="title">標題</p>
      <!-- <ul class="switch_text" ref="tabs_switch">
        <li class="true" @click="clickTab($event)">製造業</li>
        <li class="false" @click="clickTab($event)">服務業</li>
      </ul> -->
      <button><i class="gg-software-download"></i></button>
    </div>
    <!-- 第二層 tab，可能有可能沒有，或者是出現圖標示圖 -->
    <ul class="switch_text" ref="tabs_switch">
      <li class="true" @click="clickTab($event)">製造業</li>
      <li class="false" @click="clickTab($event)">服務業</li>
    </ul>
    <div class="info">
      <!-- 分數資訊 -->
      <!-- <div class="text">
        <p class="text-system-light_05 subtitle_2">5.1</p>
        <p class="subtitle_4 text-system-dark_04">整體平均 4.6 分</p>
      </div> -->
      <ul class="legends">
        <li class="legend_item">
          <div class="icon"></div>
          製造業
        </li>
        <li class="legend_item">
          <div class="icon"></div>
          服務業
        </li>
        <li class="legend_item">
          <div class="icon"></div>
          服務業
        </li>
      </ul>
      <v-chart :option="option" class="chart" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { CanvasRenderer } from "echarts/renderers";
import VChart from "vue-echarts";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

export default defineComponent({
  components: { VChart },
  setup(props, { attrs }) {
    const tabs_switch = ref();

    function clickTab(event: any): void {
      for (let item of tabs_switch.value.children) {
        item.className = "false";
      }
      event.path[0].className = "true";
    }
    const option = {
      color: ["#7A6FFF", "#2BC679", "#F3A41B", "#666E7A", "#00C7F2"],
      tooltip: {
        trigger: "item",
        backgroundColor: "#383C41",
        borderWidth: 0,
        textStyle: {
          color: "#FCFDFE",
        },
        formatter: (params: any, ticket: any, callback: any) => {
          return params.data.label;
        },
      },
      // legend: {
      //   top: "5%",
      //   left: "center",
      // },
      series: [
        {
          type: "pie",
          radius: ["0%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          // emphasis: {
          //   label: {
          //     show: true,
          //     fontSize: "40",
          //     fontWeight: "bold",
          //   },
          // },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, label: "缺乏專業/專責財務人員" },
            { value: 735, label: "缺乏專業/專責財務人員" },
            { value: 580, label: "缺乏專業/專責財務人員" },
            { value: 484, label: "缺乏專業/專責財務人員" },
            { value: 300, label: "缺乏專業/專責財務人員" },
          ],
        },
      ],
    };

    return { tabs_switch, clickTab, option };
  },
});
</script>
