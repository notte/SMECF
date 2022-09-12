<template>
  <div class="title_dropdown">
    <p class="other_subtitle">平均分數</p>
    <b-dropdown text="下載按鈕">
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
      title="Finance 綜合平均分數"
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
      title="未來投資能力"
      :data="data.facetedOverview1"
    />
    <BarChartHorizontal
      class="h-52"
      type="2"
      title="經營成長"
      :data="data.facetedOverview2"
    />
    <BarChartHorizontal
      class="h-52"
      type="2"
      title="財務結構"
      :data="data.facetedOverview3"
    />
  </section>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import DoughnutChart from "@/components/chart/DoughnutChart.vue";
import BarChartHorizontal from "@/components/chart/BarChartHorizontal.vue";
import axios from "axios";
import { IDashboardOtherFinance } from "@/models//interface/dashboardOtherFinance";
import EventBus from "@/utilities/event-bus";
import { statusStore } from "@/store/index";

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
        .get<IDashboardOtherFinance>("./data/dashboard_other_finance.json")
        .then((res) => {
          console.log(res.data);
          data.compositeAveScore = [
            {
              name: res.data.fianceAvgScore.toString(),
              data: res.data.fianceAvgScore,
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
              data: res.data.futureInvestment[0] ?? 0,
              max: 10,
              color: "purple",
            },
            {
              name: "服務業",
              data: res.data.futureInvestment[1] ?? 0,
              max: 10,
              color: "blue",
            },
          ];
          data.facetedOverview2 = [
            {
              name: "製造業",
              data: res.data.businessGrowth[0] ?? 0,
              max: 10,
              color: "purple",
            },
            {
              name: "服務業",
              data: res.data.businessGrowth[1] ?? 0,
              max: 10,
              color: "blue",
            },
          ];
          data.facetedOverview3 = [
            {
              name: "製造業",
              data: res.data.structure[0] ?? 0,
              max: 10,
              color: "purple",
            },
            {
              name: "服務業",
              data: res.data.structure[1] ?? 0,
              max: 10,
              color: "blue",
            },
          ];
        });
    });

    const status = statusStore();

    // 在子組件處理列表資料
    const table: any[] = [
      { type: "製造業", item1: 12, item2: 1, item3: 103, item4: 210, item5: 5 },
      {
        type: "服務業",
        item1: 132,
        item2: 11,
        item3: 103,
        item4: 210,
        item5: 5,
      },
      {
        type: "製造業",
        item1: 124,
        item2: 12,
        item3: 103,
        item4: 210,
        item5: 5,
      },
      {
        type: "服務業",
        item1: 12,
        item2: 13,
        item3: 103,
        item4: 210,
        item5: 5,
      },
      { type: "製造業", item1: 12, item2: 0, item3: 103, item4: 210, item5: 5 },
      {
        type: "製造業",
        item1: 12,
        item2: 15,
        item3: 103,
        item4: 210,
        item5: 3,
      },
      { type: "服務業", item1: 12, item2: 3, item3: 103, item4: 210, item5: 5 },
      { type: "製造業", item1: 1, item2: 1, item3: 13, item4: 210, item5: 54 },
      { type: "服務業", item1: 12, item2: 1, item3: 13, item4: 10, item5: 25 },
      { type: "製造業", item1: 12, item2: 1, item3: 103, item4: 210, item5: 5 },
      {
        type: "製造業",
        item1: 132,
        item2: 1,
        item3: 3,
        item4: 210,
        item5: 5,
      },
    ];

    // 將處理過的資料，儲存在狀態管理套件中
    // 從 ListPopup.vue 中會直接抓儲存的資料
    status.setList(table);

    // 傳送 popup 開啟事件，帶上狀態以及 title
    function openPopup(): void {
      EventBus.emit("listpopup_event", {
        status: true,
        title: "Finance",
      });
    }
    return { data, openPopup };
  },
});
</script>
