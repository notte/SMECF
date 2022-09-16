<template>
  <section class="container_chart">
    <!-- 最上層標題 -->
    <div class="top">
      <p class="title">{{ title }}</p>
      <!-- <button><i class="gg-software-download"></i></button> -->
    </div>

    <!-- type1 整體平均 -->
    <div class="info bar" v-if="type == 1">
      <!-- 分數資訊 -->
      <div class="text">
        <h1 class="percent">
          {{ data[data_index].data }}
          <span class="subtitle_2">/10</span>
        </h1>
        <p class="subtitle_4 text-system-dark_04">
          整體平均 {{ data[data_index].data }} 分
        </p>
      </div>
      <div class="chart" ref="oneDOM" style="height: 120px"></div>
    </div>

    <!-- type2-->
    <div v-if="type == 2" class="info bar">
      <!-- 分數資訊 -->
      <div class="text" ref="tabs">
        <p
          @click="clickTab('tabs', $event, index)"
          v-for="(item, index) in data"
          :key="item.name"
          :class="index == 0 ? 'true' : 'false'"
        >
          {{ item.name }}
        </p>
      </div>
      <div class="chart" ref="secDOM" style="height: 120px"></div>
    </div>

    <!-- type3-->
    <div v-if="type == 3" style="width: 100%; height: 100%">
      <ul class="switch_text" ref="tabs_switch">
        <li
          @click="clickTab('tabs_switch', $event, index)"
          v-for="(item, index) in data"
          :key="item.name"
          :class="index == 0 ? 'true' : 'false'"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="info bar">
        <!-- 分數資訊 -->
        <div class="text">
          <h1 class="percent">
            {{ data[data_index].data }}
            <span class="subtitle_2">/10</span>
          </h1>
        </div>
        <div class="chart" ref="thirdDOM" style="height: 120px"></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { CanvasRenderer } from "echarts/renderers";
import * as echarts from "echarts/core";
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { GaugeChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { statusStore } from "@/store/index";

use([
  CanvasRenderer,
  GaugeChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

export default defineComponent({
  components: { VChart },
  props: ["type", "title", "data"],
  setup(props, { attrs }) {
    const oneDOM = ref();
    const secDOM = ref();
    const thirdDOM = ref();
    const tabs = ref();
    const tabs_switch = ref();
    const status = statusStore();
    let doughnut: any;

    const data_index = ref(0);

    onMounted(() => {
      switch (props.type) {
        case "1":
          doughnut = echarts.init(oneDOM.value);
          break;
        case "2":
          doughnut = echarts.init(secDOM.value);
          break;
        case "3":
          doughnut = echarts.init(thirdDOM.value);
          break;
        default:
          break;
      }
      if (status.mode === "dark") {
        doughnut.setOption(darkOption, true);
      } else if (status.mode === "light") {
        doughnut.setOption(option, true);
      }

      window.addEventListener("resize", () => {
        doughnut.resize();
      });

      watch(
        () => status.mode,
        (newMode) => {
          if (newMode === "dark") {
            doughnut.setOption(darkOption, true);
          } else {
            doughnut.setOption(option, true);
          }
        },
        { deep: true }
      );

      watch(() => props.data, (newData, oldData) => {
        if(newData!=oldData) {
          let gaugeData = [{
            value: newData[data_index.value].data,
          }];
          // let detail = newData[data_index.value].max;
          let max = newData[data_index.value].max;

          darkOption.series[0].data = gaugeData;
          // darkOption.series[0].detail = detail;
          darkOption.series[0].max = max;
          option.series[0].data = gaugeData;
          // option.series[0].detail = detail;
          option.series[0].max = max;

          if (status.mode === "dark") {
            doughnut.setOption(darkOption, true);
          } else {
            doughnut.setOption(option, true);
          }
        }
      });

      watch(() => data_index.value, (newIndex, oldIndex) => {
        if(newIndex!=oldIndex) {
          let gaugeData = [{
            value: props.data[newIndex].data,
          }];
          let max = props.data[newIndex].max;

          darkOption.series[0].data = gaugeData;
          darkOption.series[0].max = max;
          option.series[0].data = gaugeData;
          option.series[0].max = max;

          if (status.mode === "dark") {
            doughnut.setOption(darkOption, true);
          } else {
            doughnut.setOption(option, true);
          }
        }
      });
      
    });

    const darkOption = {
      // 進度條本身顏色
      color: ["#055FFC"],
      tooltip: {
        trigger: "item",
        backgroundColor: "#383C41",
        borderWidth: 0,
        formatter: "{c}",
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
          data: [
            {
              value: props.data[data_index.value].data
            }
          ],
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
            formatter: "{value}",
            offsetCenter: ["0%", "5%"],
          },
          min: 0,
          max: props.data[data_index.value].max,
        },
      ],
    };

    const option = {
      // 進度條本身顏色
      color: ["#055FFC"],
      tooltip: {
        trigger: "item",
        backgroundColor: "#383C41",
        borderWidth: 0,
        formatter: "{c}",
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
          data: [
            {
              value: props.data[data_index.value].data
            }
          ],
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
              color: [[1, "#D8DEE7"]],
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
            color: "#383C41",
            formatter: "{value}",
            offsetCenter: ["0%", "5%"],
          },
          min: 0,
          max: props.data[data_index.value].max,
        },
      ],
    };

    function clickTab(status: string, event: any, index: number): void {
      if (status === "tabs") {
        for (let item of tabs.value.children) {
          item.className = "false";
        }
      } else {
        for (let item of tabs_switch.value.children) {
          item.className = "false";
        }
        data_index.value = index;
      }
      event.path[0].className = "true";
    }

    return {
      option,
      tabs_switch,
      tabs,
      clickTab,
      oneDOM,
      secDOM,
      thirdDOM,
      data_index
    };
  },
});
</script>
