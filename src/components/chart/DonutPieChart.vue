<template>
  <section class="container_chart">
    <div class="top">
      <p class="title">過案廠商樣貌</p>
      <!-- <button><i class="gg-software-download"></i></button> -->
    </div>
    <div class="info donut">
      <div class="text">
        <ul class="switch_text" ref="tabs_switch">
          <li class="true" @click="clickTab($event)">公司年資</li>
          <li class="false" @click="clickTab($event)">資本額</li>
          <li class="false" @click="clickTab($event)">員工數</li>
          <li class="false" @click="clickTab($event)">場址地區</li>
        </ul>
      </div>
      <div class="chart" ref="chartDOM"></div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import * as echarts from "echarts/core";
import { statusStore } from "@/store/index";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { TooltipComponent } from "echarts/components";

echarts.use([PieChart, TooltipComponent, CanvasRenderer, LabelLayout]);

export default defineComponent({
  setup() {
    const status = statusStore();
    const chartDOM = ref();
    const tabs_switch = ref();

    onMounted(() => {
      let donut = echarts.init(chartDOM.value);
      window.addEventListener("resize", () => {
        donut.resize();
      });
      donut.setOption(option);
      if (status.mode === "dark") {
        donut.setOption(darkOption, true);
      } else {
        donut.setOption(option, true);
      }
      watch(
        () => status.mode,
        (newMode) => {
          if (newMode === "dark") {
            donut.setOption(darkOption, true);
          } else {
            donut.setOption(option, true);
          }
        },
        { deep: true }
      );
    });

    const darkOption = {
      color: ["#5B4DFF", "#FBB42B", "#0BA7C9", "#055FFC"],
      tooltip: {
        triggerOn: "click",
        trigger: "item",
        backgroundColor: "#383C41",
        borderWidth: 0,
        textStyle: {
          color: "#FCFDFE",
        },
        formatter: (params: any) => {
          return params.name;
        },
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "14",
              borderWidth: 0,
              color: "#FCFDFE",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
          ],
        },
      ],
    };
    const option = {
      color: ["#5B4DFF", "#FBB42B", "#0BA7C9", "#055FFC"],
      tooltip: {
        triggerOn: "click",
        trigger: "item",
        backgroundColor: "#383C41",
        borderWidth: 0,
        textStyle: {
          color: "#FCFDFE",
        },
        formatter: (params: any) => {
          return params.name;
        },
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "14",
              borderWidth: 0,
              color: "#383C41",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
          ],
        },
      ],
    };
    function clickTab(event: any): void {
      for (let item of tabs_switch.value.children) {
        item.className = "false";
      }
      event.path[0].className = "true";
    }
    return { chartDOM, status, tabs_switch, clickTab };
  },
});
</script>
