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
      title="Develop 綜合平均分數"
      :data="data.developAvgScore"
      :max="10"
    />
    <DoughnutChart type="3" title="平均分數" :data="data.avgScore" :max="10" />
  </section>
  <p class="other_subtitle">構面概覽</p>
  <section class="container_grid">
    <BarChartHorizontal
      class="h-52"
      type="2"
      title="國際供應鏈排名"
      :data="data.facetedOverview1"
    />
    <BarChartHorizontal
      class="h-52"
      type="2"
      title="自有品牌國際化"
      :data="data.facetedOverview2"
    />
    <BarChartHorizontal
      class="h-52"
      type="2"
      title="淨零碳排放落實"
      :data="data.facetedOverview3"
    />
  </section>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import DoughnutChart from "@/components/chart/DoughnutChart.vue";
import BarChartHorizontal from "@/components/chart/BarChartHorizontal.vue";
import axios from "axios";
import { IDashboardOtherDevelop } from "@/models//interface/dashboardOtherDevelop";
import EventBus from "@/utilities/event-bus";

export default defineComponent({
  components: { DoughnutChart, BarChartHorizontal },
  setup() {
    const data = reactive({
      developAvgScore: [{ name: "0", data: 0, max: 10 }],
      avgScore: [
        { name: "製造業", data: 0, max: 10 },
        { name: "服務業", data: 0, max: 10 },
      ],
      facetedOverview1: [
        { name: "製造業", data: 0, max: 10, color: "purple" },
        { name: "服務業", data: 0, max: 10, color: "blue" },
      ],
      facetedOverview2: [
        { name: "製造業", data: 0, max: 10, color: "purple" },
        { name: "服務業", data: 0, max: 10, color: "blue" },
      ],
      facetedOverview3: [
        { name: "製造業", data: 0, max: 10, color: "purple" },
        { name: "服務業", data: 0, max: 10, color: "blue" },
      ],
    });
    onMounted(() => {
      axios
        .get<IDashboardOtherDevelop>("./data/dashboard_other_develop.json")
        .then((res) => {
          console.log(res.data);
          data.developAvgScore = [
            {
              name: res.data.developAvgScore.toString(),
              data: res.data.developAvgScore,
              max: 10,
            },
          ];
          data.avgScore = [
            { name: "製造業", data: res.data.avgScore[0] ?? 0, max: 10 },
            { name: "服務業", data: res.data.avgScore[1] ?? 0, max: 10 },
          ];
          data.facetedOverview1 = [
            {
              name: "製造業",
              data: res.data.rankInternationality[0] ?? 0,
              max: 10,
              color: "purple",
            },
            {
              name: "服務業",
              data: res.data.rankInternationality[1] ?? 0,
              max: 10,
              color: "blue",
            },
          ];
          data.facetedOverview2 = [
            {
              name: "製造業",
              data: res.data.saleAbroad[0] ?? 0,
              max: 10,
              color: "purple",
            },
            {
              name: "服務業",
              data: res.data.saleAbroad[1] ?? 0,
              max: 10,
              color: "blue",
            },
          ];
          data.facetedOverview3 = [
            {
              name: "製造業",
              data: res.data.zeroCarbon[0] ?? 0,
              max: 10,
              color: "purple",
            },
            {
              name: "服務業",
              data: res.data.zeroCarbon[1] ?? 0,
              max: 10,
              color: "blue",
            },
          ];
        });
    });
    function openPopup(): void {
      EventBus.emit("listpopup_event", {
        status: true,
        title: "Develop",
      });
    }
    return { data, openPopup };
  },
});
</script>
