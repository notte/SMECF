<template>
  <div class="info">
    <div class="map area" ref="map_size">
      <Map />
    </div>
    <div class="city items-center">
      <h6 class="text-system-light_05">縣市</h6>
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
  setup() {
    const map_size = ref();
    const Current = ref(Status.ManufacturerType.Register);
    const Register = ref(Status.ManufacturerType.Register);
    const Expand = ref(Status.ManufacturerType.Expand);
    const Created = ref(Status.ManufacturerType.Created);
    const Distributed = ref(Status.ManufacturerType.Distributed);
    const tabs = ref();
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

    function clickTab(Status: Status.ManufacturerType, event: any): void {
      for (let item of tabs.value.children) {
        item.className = "false";
      }
      Current.value = Status;
      event.path[0].className = "true";
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
      Register,
      Expand,
      Created,
      Distributed,
    };
  },
});
</script>
