<template>
  <section class="container_chart">
    <!-- 最上層標題 -->
    <div class="top">
      <p v-if="type == 1 || type == 3" class="title">{{ title }}</p>
      <ul v-if="type == 2" class="switch_text" ref="tabs_switch">
        <li class="true" @click="clickTab($event)">製造業</li>
        <li class="false" @click="clickTab($event)">服務業</li>
      </ul>
      <div class="icon_top">
        <!-- <button
          v-on:mouseover="showTooltip($event, 'content')"
          v-on:mouseleave="leaveTooltip"
        >
          <i class="gg-info"></i>
        </button> -->
        <!-- <button><i class="gg-software-download"></i></button> -->
      </div>
    </div>
    <!-- 第二層 tab，可能有可能沒有，或者是出現圖標示圖 -->
    <ul v-if="type == 1 || type == 3" class="switch_text" ref="tabs_switch">
      <li class="true" @click="clickTab($event)">製造業</li>
      <li class="false" @click="clickTab($event)">服務業</li>
    </ul>
    <div class="info">
      <!-- 分數資訊 -->
      <div v-if="type == 2" class="text">
        <p class="text-system-light_05 subtitle_2">{{ data[1].value }} %</p>
        <p class="subtitle_4 text-system-dark_04">{{ data[1].label }}</p>
      </div>
      <!-- <ul v-if="type == 1" class="legends">
        <li class="legend_item" v-for="item in data" :key="item.name">
          <div class="icon"></div>
          {{ item.label }}
        </li>
      </ul> -->
      <div class="pie_chart" ref="chartDOM"></div>
      <!-- <v-chart :option="option" class="chart" /> -->
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { CanvasRenderer } from "echarts/renderers";
import VChart from "vue-echarts";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  LegendComponentOption,
} from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import * as d3 from "d3";
import { number } from "echarts/core";
import { statusStore } from "@/store/index";

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
  props: ["type", "title", "data"],
  setup(props, { attrs }: any) {
    const status = statusStore();
    const tabs_switch = ref();
    const chartDOM = ref();
    const main = ref();
    let legendData: any = [];
    let Tooltip: any;

    for (let item of props.data) {
      legendData.push({ name: item.label, value: item.value });
    }

    onMounted(() => {
      Tooltip = d3
        .select(".container_chart")
        .append("div")
        .style("z-index", 10)
        .style("opacity", 0)
        .attr("class", "tooltips");

      let pie = echarts.init(chartDOM.value);
      switch (props.type) {
        case "1":
          pie.setOption(legendOption);
          break;
        case "2":
          pie.setOption(noLegendOption);
          break;
        case "3":
          pie.setOption(noLegendOption);
          break;

        default:
          break;
      }
      window.addEventListener("resize", () => {
        pie.resize();
      });

      if (status.mode === "dark" && props.type === "1") {
        pie.setOption(legendDarkOption, true);
      }

      watch(
        () => status.mode,
        (newMode) => {
          if (newMode === "dark") {
            switch (props.type) {
              case "1":
                pie.setOption(legendDarkOption);
                break;
              case "2":
                pie.setOption(noLegendOption);
                break;
              case "3":
                pie.setOption(noLegendOption);
                break;

              default:
                break;
            }
          } else {
            switch (props.type) {
              case "1":
                pie.setOption(legendOption);
                break;
              case "2":
                pie.setOption(noLegendOption);
                break;
              case "3":
                pie.setOption(noLegendOption);
                break;

              default:
                break;
            }
          }
        },
        { deep: true }
      );
    });

    function showTooltip(event: any, content: string): void {
      Tooltip.html(content)
        .style("opacity", 1)
        .style("left", event.pageX + "px")
        .style("top", event.pageY + "px");
    }

    function leaveTooltip(): void {
      Tooltip.style("opacity", 0);
    }

    function clickTab(event: any): void {
      for (let item of tabs_switch.value.children) {
        item.className = "false";
      }
      event.path[0].className = "true";
    }

    const colors =
      props.type == 2
        ? ["#8BEAFF", "#00C7F2"]
        : ["#00C7F2", "#7A6FFF", "#FBB42B", "#2BC679", "#666E7A"];

    const legendOption = {
      color: colors,
      legend: {
        orient: "vertical",
        left: "0",
        top: "center",
        icon: "circle",
        textStyle: {
          color: "#383C41",
        },
      },
      tooltip: {
        trigger: "item",
        backgroundColor: "#383C41",
        borderWidth: 0,
        textStyle: {
          color: "#FCFDFE",
        },
        formatter: (params: any, ticket: any, callback: any) => {
          return params.data.name;
        },
      },
      minShowLabelAngle: 10,
      series: [
        {
          type: "pie",
          radius: "80%",
          avoidLabelOverlap: false,
          left: 100,
          label: {
            show: true,
            position: "inside",
            formatter: "{c} %",
          },
          labelLine: {
            show: false,
          },
          data: legendData,
        },
      ],
    };

    const legendDarkOption = {
      color: colors,
      legend: {
        orient: "vertical",
        left: "0",
        top: "center",
        icon: "circle",
        textStyle: {
          color: "#EEF0F4",
        },
      },
      tooltip: {
        trigger: "item",
        backgroundColor: "#383C41",
        borderWidth: 0,
        textStyle: {
          color: "#FCFDFE",
        },
        formatter: (params: any, ticket: any, callback: any) => {
          return params.data.name;
        },
      },
      minShowLabelAngle: 10,
      series: [
        {
          type: "pie",
          radius: "80%",
          avoidLabelOverlap: false,
          left: 100,
          label: {
            show: true,
            position: "inside",
            formatter: "{c} %",
          },
          labelLine: {
            show: false,
          },
          data: legendData,
        },
      ],
    };

    const noLegendOption = {
      color: colors,
      tooltip: {
        trigger: "item",
        backgroundColor: "#383C41",
        borderWidth: 0,
        textStyle: {
          color: "#FCFDFE",
        },
        formatter: (params: any, ticket: any, callback: any) => {
          return params.data.name;
        },
      },
      minShowLabelAngle: 10,
      series: [
        {
          type: "pie",
          radius: "80%",
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "inside",
            formatter: "{c} %",
          },
          labelLine: {
            show: false,
          },
          data: legendData,
        },
      ],
    };

    return {
      tabs_switch,
      clickTab,
      showTooltip,
      leaveTooltip,
      chartDOM,
      main,
    };
  },
});
</script>
