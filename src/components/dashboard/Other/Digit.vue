<template>
  <div class="title_dropdown">
    <p class="other_subtitle">平均分數</p>
    <b-dropdown no-caret>
      <template #button-content>
        <p>下載按鈕</p>
        <img src="@/assets/icons/dropdown-arrow.svg" alt="" />
      </template>
      <b-dropdown-item href="#">製造業全部分數</b-dropdown-item>
      <b-dropdown-item href="#">服務業全部分數</b-dropdown-item>
    </b-dropdown>
    <b-button variant="outline-primary" @click="openPopup"
      ><p>查看表格</p>
      <img src="@/assets/icons/table.svg" alt="" />
    </b-button>
  </div>
  <section class="container_grid">
    <DoughnutChart
      type="1"
      title="Intelligent 綜合平均分數"
      :data="data.compositeAveScore"
      :max="10"
    />
    <DoughnutChart type="3" title="平均分數" :data="data.avgScore" :max="10" />
  </section>
  <p class="other_subtitle">構面概覽</p>
  <section class="container_grid">
    <BarChartHorizontal
      class="h-52"
      type="2"
      title="價值鏈管理"
      :data="data.facetedOverview1"
    />
    <BarChartHorizontal
      class="h-52"
      type="2"
      title="研發生產"
      :data="data.facetedOverview2"
    />
    <BarChartHorizontal
      class="h-52"
      type="2"
      title="企業營運"
      :data="data.facetedOverview3"
    />
  </section>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import DoughnutChart from "@/components/chart/DoughnutChart.vue";
import BarChartHorizontal from "@/components/chart/BarChartHorizontal.vue";
import axios from "axios";
import { IDashboardOtherIntelligent } from "@/models//interface/dashboardOtherIntelligent";
import EventBus from "@/utilities/event-bus";

export default defineComponent({
  components: { DoughnutChart, BarChartHorizontal },
  setup() {
    const data = reactive({
      compositeAveScore: [{ name: "5.1", data: 5.1, max: 10 }],
      avgScore: [
        { name: "製造業", data: 5.1, max: 10, color: "purple" },
        { name: "服務業", data: 0, max: 10, color: "blue" },
      ],
      facetedOverview1: [
        { name: "製造業", data: 3, max: 10, color: "purple" },
        { name: "服務業", data: 0, max: 10, color: "blue" },
      ],
      facetedOverview2: [
        { name: "製造業", data: 3, max: 10, color: "purple" },
        { name: "服務業", data: 0, max: 10, color: "blue" },
      ],
      facetedOverview3: [
        { name: "製造業", data: 3, max: 10, color: "purple" },
        { name: "服務業", data: 0, max: 10, color: "blue" },
      ],
    });

    onMounted(() => {
      axios
        .get<IDashboardOtherIntelligent>(
          "./data/dashboard_other_intelligent.json"
        )
        .then((res) => {
          console.log(res.data);
          data.compositeAveScore = [
            {
              name: res.data.intelligentAvgScore.toString(),
              data: res.data.intelligentAvgScore,
              max: 10,
            },
          ];
          data.avgScore = [
            {
              name: "製造業",
              data: res.data.avgScore[0] ?? 0,
              max: 10,
              color: "purple",
            },
            {
              name: "服務業",
              data: res.data.avgScore[1] ?? 0,
              max: 10,
              color: "blue",
            },
          ];
          data.facetedOverview1 = [
            {
              name: "製造業",
              data: res.data.valueChainTool[0] ?? 0,
              max: 10,
              color: "purple",
            },
            {
              name: "服務業",
              data: res.data.valueChainTool[1] ?? 0,
              max: 10,
              color: "blue",
            },
          ];
          data.facetedOverview2 = [
            {
              name: "製造業",
              data: res.data.researchTool[0] ?? 0,
              max: 10,
              color: "purple",
            },
            {
              name: "服務業",
              data: res.data.researchTool[1] ?? 0,
              max: 10,
              color: "blue",
            },
          ];
          data.facetedOverview3 = [
            {
              name: "製造業",
              data: res.data.operationTool[0] ?? 0,
              max: 10,
              color: "purple",
            },
            {
              name: "服務業",
              data: res.data.operationTool[1] ?? 0,
              max: 10,
              color: "blue",
            },
          ];
        });
    });

    function openPopup(): void {
      EventBus.emit("listpopup_event", {
        status: true,
        title: "Intelligent",
      });
    }
    return { data, openPopup };
  },
});
</script>
