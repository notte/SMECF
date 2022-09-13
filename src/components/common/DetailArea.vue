<template>
  <div class="info">
    <div class="map color_area" ref="map_size">
      <Map :type="Status.ManufacturerMapType.Area" />
    </div>
    <div class="city items-center">
      <h6 class="title_h6">{{Current}}</h6>
      <div class="chart">
        <v-chart :option="option" />
      </div>
      <ul class="legends_row">
        <li class="legend_item">
          <div class="icon"></div>
          製造業
        </li>
        <li class="legend_item">
          <div class="icon"></div>
          服務業
        </li>
      </ul>
    </div>
  </div>
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
  props: ['data'],
  setup(props) {
    const map_size = ref();
    const Current = ref(Status.ManufacturerRegionType.North);
    const North = ref(Status.ManufacturerRegionType.North);
    const South = ref(Status.ManufacturerRegionType.South);
    const East = ref(Status.ManufacturerRegionType.East);
    const West = ref(Status.ManufacturerRegionType.West);

    const tabs = ref();
    const option = ref({
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
      series: [
        {
          type: "pie",
          radius: ["0%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "inside",
            formatter: '{c} %'
          },
          labelLine: {
            show: false,
          },
          data: props.data.north,
        },
      ],
    });

    function clickTab(Status: Status.ManufacturerRegionType, event: any): void {
      for (let item of tabs.value.children) {
        item.className = "false";
      }
      Current.value = Status;
      event.path[0].className = "true";

      switch(Status) {
        default:
        case North.value:
          option.value.series[0].data = props.data.north;
          break;
        case South.value:
          option.value.series[0].data = props.data.north;
          break;
        case East.value:
          option.value.series[0].data = props.data.east;
          break;
        case West.value:
          option.value.series[0].data = props.data.west;
          break;
      }
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
      Current,
      North,
      South,
      East,
      West,
      Status
    };
  },
});
</script>
