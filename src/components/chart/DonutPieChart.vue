<template>
  <section class="container_chart">
    <div class="top">
      <p class="title">{{title}}</p>
      <!-- <button><i class="gg-software-download"></i></button> -->
    </div>
    <div class="info donut">
      <div class="text">
        <ul class="switch_text" ref="tabs_switch"> 
          <li @click="clickTab($event, index)" v-for="(item, index) in data" :key="item.name" :class="index == 0 ? 'true' : 'false'">{{item.name}}</li>
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
  props: ["title", "data"],
  setup(props) {
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

    let darkSeries: { 
      name: any; 
      type: string; 
      radius: string[]; 
      avoidLabelOverlap: boolean; 
      label: { 
        show: boolean; 
        position: string; 
        formatter: (params: any) => any; 
      }; 
      emphasis: { 
        label: { 
          show: boolean; 
          fontSize: string; 
          borderWidth: number; 
          color: string; 
          fontWeight: string; 
        }; 
      }; 
      labelLine: { 
        show: boolean; 
      }; 
      data: any; 
    }[] = [];

    let series: { 
      name: any; 
      type: string; 
      radius: string[]; 
      avoidLabelOverlap: boolean; 
      label: { 
        show: boolean; 
        position: string; 
        formatter: (params: any) => any; 
      }; 
      emphasis: { 
        label: { 
          show: boolean; 
          fontSize: string; 
          borderWidth: number; 
          color: string; 
          fontWeight: string; 
        }; 
      }; 
      labelLine: { 
        show: boolean; 
      }; 
      data: any; 
    }[] = [];

    for(var i=0; i<props.data.length; i++) {
      let item = {
        name: props.data[i].name,
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "inside",
          formatter : function (params: any){
            return  params.value;
          },
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
        data: props.data[i].data,
      };
      
      let darkItem = {
        name: props.data[i].name,
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "inside",
          formatter : function (params: any){
            return  params.value;
          },
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
        data: props.data[i].data,
      };
      series.push(item);
      darkSeries.push(darkItem);
    }
    
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
      series: darkSeries[0],
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
      series: series[0],
    };

    function clickTab(event: any, index: number): void {
      for (let item of tabs_switch.value.children) {
        item.className = "false";
      }
      event.path[0].className = "true";
      //TODO: update series data with tabs_switch selected.
      // option.series = series[index];
      // darkOption.series = darkSeries[index];
    }
    return { chartDOM, status, tabs_switch, clickTab };
  },
});
</script>
