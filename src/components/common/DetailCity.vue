<template>
  <div class="info">
    <div class="map color_city" ref="map_size">
      <Map :type="Status.ManufacturerMapType.City" :data="dataMaps" @showPieSection="showPieSection" @hidePieSection="hidePieSection"/>
    </div>
    <div class="city" v-if="isShow(isShowPieSection)">
      <h6 class="title_h6">縣市</h6>
      <ul class="switch_button" ref="tabs">
        <li class="true" @click="clickTab(Capital, $event)">{{Capital}}</li>
        <li class="false" @click="clickTab(IndustryRate, $event)">{{IndustryRate}}</li>
      </ul>
      <div class="chart" ref="pieSection">
        <v-chart :option="option" />
      </div>
      <!-- <ul class="checkbox">
        <li class="label_item">
          <label class="container">
            <input type="checkbox" checked />
            <span class="checkmark"><i class="gg-check"></i></span>
            <p>製造業</p>
          </label>
        </li>
        <li class="label_item">
          <label class="container">
            <input type="checkbox" checked />
            <span class="checkmark"><i class="gg-check"></i></span>
            <p>服務業</p>
          </label>
        </li>
      </ul> -->
      <button class="back" @click="hidePieSection()">回到 {{$props.type}}</button>
    </div>
  </div>
  <ul class="checkbox">
    <li class="label_item">
      <label class="container">
        <input type="checkbox" checked />
        <span class="checkmark"><i class="gg-check"></i></span>
        <p>製造業</p>
      </label>
    </li>
    <li class="label_item">
      <label class="container">
        <input type="checkbox" checked />
        <span class="checkmark"><i class="gg-check"></i></span>
        <p>服務業</p>
      </label>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Map from "@/components/common/Map.vue";
import EventBus from "@/utilities/event-bus";
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
import * as Status from "@/models/status/type";

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);
export default defineComponent({
  components: { Map, VChart },
  props: ['type', 'dataMap', 'dataPie'],
  setup(props) {
    const map_size = ref();
    const Current = ref(Status.ManufacturerSubType.Capital);
    const Capital = ref(Status.ManufacturerSubType.Capital);
    const IndustryRate = ref(Status.ManufacturerSubType.IndustryRate);
    const tabs = ref();
    const isShowPieSection = ref<boolean>(true);

    const dataMaps = ref(props.dataMap);
    const option = ref({
      color: ["#7A6FFF", "#2BC679", "#F3A41B", "#666E7A", "#00C7F2", "#2AE0BF", "#EACC64"],
      tooltip: {
        trigger: "item",
        backgroundColor: "#383C41",
        borderWidth: 0,
        textStyle: {
          color: "#FCFDFE",
        },
        formatter: (params: any) => {
          return params.data.label;
        },
      },
      series: [
        {
          type: "pie",
          radius: ["0%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          labelLine: {
            show: false,
          },
          data: props.dataPie.pieCapital,
        },
      ],
    });

    function clickTab(Status: Status.ManufacturerSubType, event: any): void {
      for (let item of tabs.value.children) {
        item.className = "false";
      }
      Current.value = Status;
      event.path[0].className = "true";

      if( Status == IndustryRate.value ) {
        option.value.series[0].data = props.dataPie.pieIndustryRate;
      } else {
        option.value.series[0].data = props.dataPie.pieCapital;
      }
    }

    function isShow(isShowPieSection: boolean): boolean {
      return isShowPieSection;
    }

    onMounted(() => {
      EventBus.emit("create_map", [
        map_size.value.offsetWidth,
        map_size.value.offsetHeight,
      ]);
    });

    return {
      map_size,
      option,
      tabs,
      clickTab,
      Capital,
      IndustryRate,
      dataMaps,
      Status,
      isShowPieSection,
      isShow,
    };
  },
  methods: {
    showPieSection() {
      this.isShowPieSection = true;
    },

    hidePieSection() {
      this.isShowPieSection = false;
    }
  }
});
</script>
