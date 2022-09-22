<template>
  <section>
    <p class="other_subtitle">國際供應鏈關鍵地位</p>
    <section class="container_grid">
      <PieChart type="2" title="國際供應鏈關鍵地位" :data="data.pieRankInternationality"/>
    </section>
    <p class="other_subtitle">自有品牌海外出貨比例</p>
    <section class="container_grid">
      <PieChart type="2" title="近 2 年海外出貨比例" :data="data.pieSaleAbroad"/>
    </section>
    <p class="other_subtitle">淨零碳排落實狀況</p>
    <section class="container_grid">
      <PieChart type="2" title="盤查碳排放量" :data="data.pieCarbonSearchHave"/>
      <PieChart type="2" title="規劃具體減碳路徑" :data="data.pieCarbonSearchDownRoad"/>
      <PieChart type="2" title="改善製程(如設備汰舊更新、導入智慧節能管理系統等)" :data="data.pieCarbonSearchProcess"/>
      <PieChart type="2" title="能源轉換(如擴大使用天然氣/生質能、導入綠電/氫能等)" :data="data.pieCarbonSearchConversion"/>
      <PieChart type="2" title="循環經濟(如原料替代、廢棄物衍生燃料、二氧化碳捕捉再利用等)" :data="data.pieCarbonSearchReuse"/>
    </section>
  </section>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import PieChart from "@/components/chart/PieChart.vue";
import axios from "axios";
import { IDevelopStatistics } from "@/models/interface/developStatistics";

export default defineComponent({
  components: { PieChart },
  //TODO
  setup() {
    const data = reactive({
      pieRankInternationality: [
        { label: "無", value: 0 },
        { label: "有", value: 0 },
      ],
      pieSaleAbroad: [
        { label: "無", value: 0 },
        { label: "有", value: 0 },
      ],
      pieCarbonSearchHave: [
        { label: "無", value: 0 },
        { label: "有", value: 0 },
      ],
      pieCarbonSearchDownRoad: [
        { label: "無", value: 0 },
        { label: "有", value: 0 },
      ],
      pieCarbonSearchProcess: [
        { label: "無", value: 0 },
        { label: "有", value: 0 },
      ],
      pieCarbonSearchConversion: [
        { label: "無", value: 0 },
        { label: "有", value: 0 },
      ],
      pieCarbonSearchReuse: [
        { label: "無", value: 0 },
        { label: "有", value: 0 },
      ],
    })
    
    onMounted(() => {
      axios.get<IDevelopStatistics>("./data/develop_statistics.json")
        .then((res) => {
          // console.log(res.data);
          data.pieRankInternationality = [
            { label: "無", value: res.data.rankInternationality[0] },
            { label: "有", value: res.data.rankInternationality[1] },
          ];
          data.pieSaleAbroad = [
            { label: "無", value: res.data.saleAbroad[0] },
            { label: "有", value: res.data.saleAbroad[1] },
          ];
          data.pieCarbonSearchHave = [
            { label: "無", value: res.data.carbonSearch.have[0] },
            { label: "有", value: res.data.carbonSearch.have[1] },
          ];
          data.pieCarbonSearchDownRoad = [
            { label: "無", value: res.data.carbonSearch.downRoad[0] },
            { label: "有", value: res.data.carbonSearch.downRoad[1] },
          ];
          data.pieCarbonSearchProcess = [
            { label: "無", value: res.data.carbonSearch.process[0] },
            { label: "有", value: res.data.carbonSearch.process[1] },
          ];
          data.pieCarbonSearchConversion = [
            { label: "無", value: res.data.carbonSearch.conversion[0] },
            { label: "有", value: res.data.carbonSearch.conversion[1] },
          ];
          data.pieCarbonSearchReuse = [
            { label: "無", value: res.data.carbonSearch.reuse[0] },
            { label: "有", value: res.data.carbonSearch.reuse[1] },
          ];
        })
      });
      return {data};
  },
});
</script>
