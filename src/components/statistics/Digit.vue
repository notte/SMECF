<template>
  <section>
    <h6 class="title_h6">數位化工具使用情形</h6>
    <ul class="switch_button">
      <li class="false">目前</li>
      <li class="true">未來三年</li>
    </ul>
    <p class="other_subtitle">價值鏈管理</p>
    <section class="container_grid">
      <PieChart type="2" title="" :data="data.pieValueChainTool" />
      <BarChartHorizontal type="3" title="價值鏈管理 - 採用數位工具或技術" :data="data.barValueChainTool"/>
    </section>
    <p class="other_subtitle">研發生產</p>
    <section class="container_grid">
      <PieChart type="2" title="" :data="data.pieResearchTool" />
      <BarChartHorizontal type="3" title="研發生產 - 採用數位工具或技術" :data="data.barResearchTool"/>
    </section>
    <p class="other_subtitle">企業管理</p>
    <section class="container_grid">
      <PieChart type="2" title="" :data="data.pieOperationTool" />
      <BarChartHorizontal type="3" title="企業管理 - 採用數位工具或技術" :data="data.barOperationTool"/>
    </section>
  </section>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import BarChartHorizontal from "@/components/chart/BarChartHorizontal.vue";
import PieChart from "@/components/chart/PieChart.vue";
import axios from "axios";
import { IIntelligentStatistics } from "@/models//interface/intelligentStatistics";

export default defineComponent({
  components: { BarChartHorizontal, PieChart },
  setup() {
    const data = reactive({
      pieValueChainTool: [
        { label: "無採用數位化工具", value: 0 }, 
        { label: "有採用數位化工具", value: 0 },
      ],
      barValueChainTool: [
        { name: "庫存與訂單管理", data: 0, max: 0 },
        { name: "物料搬運", data: 0, max: 0 },
        { name: "顧客經營與行銷", data: 0, max: 0 },
        { name: "數據分析決策", data: 0, max: 0 },
      ],
      pieResearchTool: [
        { label: "無採用數位化工具", value: 0 }, 
        { label: "有採用數位化工具", value: 0 },
      ],
      barResearchTool: [
        { name: "產品研發設計", data: 0, max: 0 },
        { name: "生產設備監測", data: 0, max: 0 },
        { name: "產線自動化", data: 0, max: 0 },
        { name: "生產管理系統", data: 0, max: 0 },
        { name: "數據分析決策", data: 0, max: 0 },
      ],
      pieOperationTool: [
        { label: "無採用數位化工具", value: 0 }, 
        { label: "有採用數位化工具", value: 0 }
      ],
      barOperationTool: [
        { name: "企業資源管理", data: 0, max: 0 },
        { name: "人事管理系統", data: 0, max: 0 },
        { name: "財務會計系統", data: 0, max: 0 },
        { name: "內部溝通工具", data: 0, max: 0 },
        { name: "數據分析決策", data: 0, max: 0 },
      ]
    });

    onMounted(() => {
      axios
        .get<IIntelligentStatistics>("./data/intelligent_statistics.json")
        .then((res) => {
          data.pieValueChainTool = [
            {
              label: "無採用數位化工具",
              value: res.data.valueChainTool.isUseTool[0],
            },
            {
              label: "有採用數位化工具",
              value: res.data.valueChainTool.isUseTool[1],
            },
          ];
          data.barValueChainTool = [
            { name: "庫存與訂單管理", data: res.data.valueChainTool.order, max: 100 },
            { name: "物料搬運", data: res.data.valueChainTool.carry, max: 100 },
            { name: "顧客經營與行銷", data: res.data.valueChainTool.customer, max: 100 },
            { name: "數據分析決策", data: res.data.valueChainTool.analyze, max: 100 },
          ];
          data.pieResearchTool = [
            {
              label: "無採用數位化工具",
              value: res.data.researchTool.isUseTool[0],
            },
            {
              label: "有採用數位化工具",
              value: res.data.researchTool.isUseTool[1],
            },
          ];
          data.barResearchTool = [
            { name: "產品研發設計", data: res.data.researchTool.design, max: 100 },
            { name: "生產設備監測", data: res.data.researchTool.monitor, max: 100 },
            { name: "產線自動化", data: res.data.researchTool.auto, max: 100 },
            { name: "生產管理系統", data: res.data.researchTool.manage, max: 100 },
            { name: "數據分析決策", data: res.data.researchTool.analyze, max: 100 },
          ];
          data.pieOperationTool = [
            {
              label: "無採用數位化工具",
              value: res.data.operationTool.isUseTool[0],
            },
            {
              label: "有採用數位化工具",
              value: res.data.operationTool.isUseTool[1],
            },
          ];
          data.barOperationTool = [
            { name: "企業資源管理", data: res.data.operationTool.erp, max: 100 },
            { name: "人事管理系統", data: res.data.operationTool.hrs, max: 100 },
            { name: "財務會計系統", data: res.data.operationTool.fas, max: 100 },
            { name: "內部溝通工具", data: res.data.operationTool.ics, max: 100 },
            { name: "數據分析決策", data: res.data.operationTool.analyze, max: 100 },
          ];
        });
    });
    return { data };
  },
});
</script>
