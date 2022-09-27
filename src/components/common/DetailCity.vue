<template>
  <div class="info">
    <div class="map color_city" ref="map_size" v-if="mobile_show">
      <Map
        :type="Status.ManufacturerMapType.City"
        :data="dataMaps"
        @showPieSection="showPieSection"
        @hidePieSection="hidePieSection"
      />
    </div>
    <div class="city" v-if="isShow(isShowPieSection)">
      <h6 class="title_h6">{{ cityName }}</h6>
      <ul class="switch_button" ref="tabs">
        <li class="true" @click="clickTab(Capital, $event)">{{ Capital }}</li>
        <li class="false" @click="clickTab(IndustryRate, $event)">
          {{ IndustryRate }}
        </li>
      </ul>
      <div class="chart" ref="pieSection">
        <v-chart :option="option" />
      </div>
      <div class="title_dropdown">
        <b-dropdown no-caret>
          <template #button-content>
            <p>下載按鈕</p>
            <img src="../../assets/icons/dropdown-arrow.svg" alt="" />
          </template>
          <b-dropdown-item href="#">製造業全部分數</b-dropdown-item>
          <b-dropdown-item href="#">服務業全部分數</b-dropdown-item>
        </b-dropdown>
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
      <button class="back" @click="hidePieSection()">
        <img v-if="arrow_status" src="@/assets/icons/arrow_left.svg" />
        <img
          v-if="!arrow_status"
          src="@/assets/icons/arrow_left_dark.svg"
        />回到{{ $props.type }}
      </button>
    </div>
  </div>
  <ul class="checkbox" v-if="mobile_text">
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
  <div class="title_dropdown" v-if="!isShow(isShowPieSection)">
    <b-dropdown no-caret>
      <template #button-content>
        <p>下載按鈕</p>
        <img src="../../assets/icons/dropdown-arrow.svg" alt="" />
      </template>
      <b-dropdown-item href="#">製造業全部分數</b-dropdown-item>
      <b-dropdown-item href="#">服務業全部分數</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
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
  components: { Map, VChart },
  props: ["type", "dataMap", "dataPie"],
  setup(props) {
    const status = statusStore();
    const map_size = ref();
    const Current = ref(Status.ManufacturerSubType.Capital);
    const Capital = ref(Status.ManufacturerSubType.Capital);
    const IndustryRate = ref(Status.ManufacturerSubType.IndustryRate);
    const tabs = ref();
    const isShowPieSection = ref<boolean>(false);
    const cityName = ref<string>();
    const mobile_show = ref<boolean>(true);
    const mobile_text = ref<boolean>(true);
    const arrow_status = ref<boolean>(true);
    let windowWidth = ref(0);
    function resizeWindow() {
      windowWidth.value = window.innerWidth;
    }

    EventBus.on("mobile_map_click", () => {
      mobile_show.value = false;
      // console.log(map_size.value, isShowPieSection.value);
    });

    onMounted(() => {
      window.addEventListener("resize", resizeWindow);
      resizeWindow();

      EventBus.emit("create_map", [
        map_size.value.offsetWidth,
        map_size.value.offsetHeight,
      ]);

      watch(
        () => props.dataPie,
        (newData, oldData) => {
          if (newData != oldData) {
            if (Current.value == IndustryRate.value) {
              option.value.series[0].data = props.dataPie.pieIndustryRate;
            } else {
              option.value.series[0].data = props.dataPie.pieCapital;
            }
          }
        }
      );

      watch(
        () => props.dataMap,
        (newData, oldData) => {
          if (newData != oldData) {
            EventBus.emit("update_map_data", newData);
          }
        }
      );

      if (status.mode === "dark") {
        arrow_status.value = false;
      } else {
        arrow_status.value = true;
      }

      watch(
        () => status.mode,
        (old, newMode) => {
          if (newMode === "dark") {
            arrow_status.value = true;
          } else {
            arrow_status.value = false;
          }
        },
        { deep: true }
      );
    });

    watch(
      () => windowWidth.value,
      (oldWindth, newWindth) => {
        EventBus.emit("create_map", [
          map_size.value.offsetWidth,
          map_size.value.offsetHeight,
        ]);
      },
      { deep: true }
    );

    const dataMaps = ref(props.dataMap);
    const option = ref({
      color: [
        "#7A6FFF",
        "#2BC679",
        "#F3A41B",
        "#666E7A",
        "#00C7F2",
        "#2AE0BF",
        "#EACC64",
      ],
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
            show: true,
            position: "inside",
            formatter: "{c} %",
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

      if (Status == IndustryRate.value) {
        option.value.series[0].data = props.dataPie.pieIndustryRate;
      } else {
        option.value.series[0].data = props.dataPie.pieCapital;
      }
    }

    function isShow(isShowPieSection: boolean): boolean {
      return isShowPieSection;
    }

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
      cityName,
      mobile_show,
      mobile_text,
      arrow_status,
    };
  },
  methods: {
    showPieSection(cityName: string) {
      this.isShowPieSection = true;
      this.cityName = cityName;

      if (window.innerWidth < 640) {
        EventBus.emit("mobile_title_show", false);
        this.mobile_text = false;
      }
    },

    hidePieSection() {
      this.isShowPieSection = false;
      if (window.innerWidth < 640) {
        this.mobile_show = true;
        setTimeout(() => {
          EventBus.emit("create_map", [
            this.map_size.offsetWidth,
            this.map_size.offsetHeight,
          ]);
        }, 100);
        this.mobile_text = true;
        EventBus.emit("mobile_title_show", true);
      }
    },
  },
});
</script>
