<template>
  <section class="wrapper_chart">
    <!-- 最上層標題 -->
    <div class="title">
      <p class="subtitle_3 text-system-light_01">標題</p>
      <button>下載</button>
    </div>
    <!-- 第二層 tab，可能有可能沒有 -->
    <ul class="switch_chart invisible">
      <li class="false">製造業</li>
      <li class="true">服務業</li>
    </ul>
    <div class="info">
      <!-- 分數資訊 -->
      <div class="data">
        <h1 class="text-system-light_05">
          5.1
          <span class="subtitle_2">/10</span>
        </h1>
        <p class="subtitle_4 text-system-dark_04">整體平均 4.6 分</p>
      </div>
      <!-- 可切換資訊 -->
      <!-- <div class="data">
        <p class="true">公司年資</p>
        <p class="false">資本額</p>
        <p class="false">員工數</p>
        <p class="false">場址地區</p>
      </div> -->
      <!-- 圖表 -->
      <!-- <Doughnut class="chart" /> -->

      <v-chart class="chart" :option="option" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { CanvasRenderer } from "echarts/renderers";
import VChart, { THEME_KEY } from "vue-echarts";
import { use } from "echarts/core";
import { GaugeChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";

use([
  CanvasRenderer,
  GaugeChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

export default defineComponent({
  components: { VChart },
  setup() {
    const gaugeData = [
      {
        value: 60,
        // title: {
        //   offsetCenter: ["-20%", "0%"],
        // },
        // detail: {
        //   valueAnimation: true,
        //   offsetCenter: ["0%", "40%"],
        // },
      },
    ];
    const option = ref({
      series: [
        {
          type: "gauge",
          startAngle: 90,
          endAngle: -270,
          // name:
          // title: {
          // fontSize: 5,
          // offsetCenter: ["0%", "0%"],
          // },
          data: gaugeData,
          // 隱藏指針
          pointer: {
            show: false,
          },
          // 進度條設定
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
          },
          // 進度條設定
          axisLine: {
            lineStyle: {
              width: 10,
            },
          },
          // 大刻度（速度？）
          splitLine: {
            show: false,
            distance: 0,
            length: 10,
          },
          // 小刻度（秒數？）
          axisTick: {
            show: false,
          },
          // 秒數數字
          axisLabel: {
            show: false,
            distance: 50,
          },
          detail: {
            // width: 50,
            // height: 14,
            fontSize: 16,
            color: "#fff",
            // borderColor: "auto",
            // borderRadius: 20,
            // borderWidth: 1,
            formatter: "5.1",
            offsetCenter: ["0%", "5%"],
          },
        },
      ],
    });
    return { option };
  },
});
</script>
