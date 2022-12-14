<template>
  <div class="title_dropdown">
    <p class="other_subtitle">平均分數</p>
    <b-button variant="outline-primary" @click="openPopup"
      ><p>查看表格</p>

      <img src="@/assets/icons/table.svg" alt="" />
    </b-button>
  </div>
  <section class="container_grid">
    <CircleProgressChart
      type="1"
      title="Finance 綜合平均分數"
      :data="data.compositeAveScore"
    />
    <CircleProgressChart type="3" title="平均分數" :data="data.avgScore" />
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
import CircleProgressChart from "@/components/chart/CircleProgressChart.vue";
import BarChartHorizontal from "@/components/chart/BarChartHorizontal.vue";
import axios from "axios";
import { IDashboardOtherFinance } from "@/models//interface/dashboardOtherFinance";
import EventBus from "@/utilities/event-bus";
import { statusStore } from "@/store/index";

export default defineComponent({
  components: { CircleProgressChart, BarChartHorizontal },
  setup() {
    const data = reactive({
      compositeAveScore: [{ name: "", data: 0, max: 0 }],
      avgScore: [
        { name: "製造業", data: 0, max: 0 },
        { name: "服務業", data: 0, max: 0 },
      ],
      facetedOverview1: [
        { name: "製造業", data: 0, max: 0, color: "purple" },
        { name: "服務業", data: 0, max: 0, color: "blue" },
      ],
      facetedOverview2: [
        { name: "製造業", data: 0, max: 0, color: "purple" },
        { name: "服務業", data: 0, max: 0, color: "blue" },
      ],
      facetedOverview3: [
        { name: "製造業", data: 0, max: 0, color: "purple" },
        { name: "服務業", data: 0, max: 0, color: "blue" },
      ],
    });
    onMounted(() => {
      axios
        .get<IDashboardOtherFinance>("./data/dashboard_other_finance.json")
        .then((res) => {
          // console.log(res.data);
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
            },
            {
              name: "服務業",
              data: res.data.avgScore[1] ?? 0,
              max: 10,
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
