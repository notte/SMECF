<template>
  <section class="container_chart">
    <!-- 最上層標題 -->
    <div class="top">
      <p class="title"> {{title}} </p>
      <button><i class="gg-software-download"></i></button>
    </div>

    <!-- type1 整體平均 -->
    <div v-if="type==1">
      <div class="info">
      <!-- 分數資訊 -->
      <div class="text">
        <h1 class="percent">
          {{data[0].data}}
          <span class="subtitle_2">/10</span>
        </h1>
        <p class="subtitle_4 text-system-dark_04">整體平均 {{data[0].data}} 分</p>
      </div>
      <v-chart :option="option" class="chart" />
      </div>
    </div>

     <!-- type2-->
    <div v-if="type==2">
      <div class="info">
        <!-- 分數資訊 -->
        <div class="text" ref="tabs">
          <p @click="clickTab('tabs', $event, index)" v-for="(item, index) in data" :key="item.name" :class="(index == 0)? 'true': 'false'">{{item.name}}</p>
        </div>
        <v-chart :option="option" class="chart" />
      </div>
    </div>

     <!-- type3-->
    <div v-if="type==3">
      <ul class="switch_text" ref="tabs_switch">
        <li @click="clickTab('tabs_switch', $event, index)" v-for="(item, index) in data" :key="item.name" :class="(index == 0)? 'true': 'false'">{{item.name}}</li>
      </ul>
      <div class="info">
        <!-- 分數資訊 -->
        <div class="text">
          <h1 class="percent">
            {{data[0].data}}
            <span class="subtitle_2">/10</span>
          </h1>
        </div>
        <v-chart :option="option" class="chart" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { CanvasRenderer } from "echarts/renderers";
import VChart from "vue-echarts";
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
  props: [
    'type',
    'title',
    'data'
  ],
  setup(props, { attrs }) {
    const tabs = ref();
    const tabs_switch = ref();

    var gaugeData = ref([
      {
        value: props.data[0].data,
      },
    ]);
    var detail = ref(props.data[0].max);
    var max = ref(props.data[0].max);
 
    const option = ref({
      // 進度條本身顏色
      color: ["#055FFC"],
      tooltip: {
        trigger: "item",
        backgroundColor: "#383C41",
        borderWidth: 0,
        formatter: '{c}',
        textStyle: {
          color: "#FCFDFE",
        },
        axisPointer: {
          type: "shadow",
        },
      },
      series: [
        {
          type: "gauge",
          startAngle: 90,
          endAngle: -270,
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
          // 甜甜區底設定
          axisLine: {
            lineStyle: {
              width: 10,
              color: [[1, "#383C41"]],
              show: true,
              roundCap: false,
            },
          },
          // 大刻度
          splitLine: {
            show: false,
            distance: 0,
            length: 10,
          },
          // 小刻度
          axisTick: {
            show: false,
          },
          // 秒數數字
          axisLabel: {
            show: false,
            distance: 50,
          },
          detail: {
            fontSize: 16,
            color: "#F7F9FC",
            formatter: detail,
            offsetCenter: ["0%", "5%"],
          },
          min: 0,
          max: max,
        },
      ],
    });

    function clickTab(status: string, event: any, index:number): void {
      // console.log("index: " +index);
      // gaugeData = ref([
      //   {
      //     value: props.data[index].data,
      //   }
      // ]);
      // detail = ref(props.data[index].max);
      // max = ref(props.data[index].max);
     
      if (status === "tabs") {
        for (let item of tabs.value.children) {
          item.className = "false";
        }
      } else {
        for (let item of tabs_switch.value.children) {
          item.className = "false";
        }
      }
      event.path[0].className = "true";
    }

    return { option, tabs_switch, tabs, clickTab, gaugeData };
  },
});
</script>
