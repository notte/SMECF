<template>
  <div class="info">
    <div class="map color_city" ref="map_size">
      <Map />
    </div>
    <div class="city">
      <h6 class="text-system-light_05">縣市</h6>
      <ul class="switch_button" ref="tabs">
        <li class="true" @click="clickTab(Register, $event)">登記地區</li>
        <li class="false" @click="clickTab(Expand, $event)">擴建廠房分佈</li>
        <li class="false" @click="clickTab(Created, $event)">新建廠房分佈</li>
        <li class="false" @click="clickTab(Distributed, $event)">
          產業別區域分佈
        </li>
      </ul>
      <div class="chart">
        <v-chart :option="option" />
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
          <label>
            <input type="checkbox" checked />
            <span><i class="gg-check"></i></span>
            <p>服務業</p>
          </label>
        </li>
      </ul>
      <button class="back">回到產業區域分布</button>
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
      <label>
        <input type="checkbox" checked />
        <span><i class="gg-check"></i></span>
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
