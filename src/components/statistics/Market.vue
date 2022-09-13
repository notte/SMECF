<template>
  <section>
    <p class="other_subtitle">國際供應鏈關鍵地位</p>
    <section class="container_grid">
      <PieChart type="2" title="" :data="data.pieRankInternationality"/>
    </section>
    <p class="other_subtitle">自有品牌海外出貨比例</p>
    <section class="container_grid">
      <PieChart type="2" title="" :data="data.pieSaleAbroad"/>
    </section>
    <p class="other_subtitle">淨零碳排落實狀況</p>
    <section class="container_grid">
      <PieChart type="2" title="" :data="data.pieCarbonSearchHave"/>
      <PieChart type="2" title="" :data="data.pieCarbonSearchDownRoad"/>
      <PieChart type="2" title="" :data="data.pieCarbonSearchProcess"/>
      <PieChart type="2" title="" :data="data.pieCarbonSearchConversion"/>
      <PieChart type="2" title="" :data="data.pieCarbonSearchReuse"/>
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
        { label: "無國際供應鏈關鍵地位", value: 65 },
        { label: "具有國際供應鏈關鍵地位", value: 35 },
      ],
      pieSaleAbroad: [
        { label: "無自有品牌海外出貨比例", value: 65 },
        { label: "自有品牌海外出貨比例", value: 35 },
      ],
      pieCarbonSearchHave: [
        { label: "無盤查碳排放量", value: 65 },
        { label: "有盤查碳排放量", value: 35 },
      ],
      pieCarbonSearchDownRoad: [
        { label: "無規劃具體減碳路徑", value: 65 },
        { label: "規劃具體減碳路徑", value: 35 },
      ],
      pieCarbonSearchProcess: [
        { label: "無改善製程(如設備汰舊更新、導入智慧節能管理系統等)", value: 65 },
        { label: "改善製程(如設備汰舊更新、導入智慧節能管理系統等)", value: 35 },
      ],
      pieCarbonSearchConversion: [
        { label: "無能源轉換(如擴大使用天然氣/生質能、導入綠電/氫能等)", value: 65 },
        { label: "能源轉換(如擴大使用天然氣/生質能、導入綠電/氫能等)", value: 35 },
      ],
      pieCarbonSearchReuse: [
        { label: "無循環經濟(如原料替代、廢棄物衍生燃料、二氧化碳捕捉再利用等)", value: 65 },
        { label: "循環經濟(如原料替代、廢棄物衍生燃料、二氧化碳捕捉再利用等)", value: 35 },
      ],
    })
    
    onMounted(() => {
      axios.get<IDevelopStatistics>("./data/develop_statistics.json")
        .then((res) => {
          // console.log(res.data);
          data.pieRankInternationality = [
            { label: "無國際供應鏈關鍵地位", value: res.data.rankInternationality[0] },
            { label: "具有國際供應鏈關鍵地位", value: res.data.rankInternationality[1] },
          ];
          data.pieSaleAbroad = [
            { label: "無自有品牌海外出貨比例", value: res.data.saleAbroad[0] },
            { label: "自有品牌海外出貨比例", value: res.data.saleAbroad[1] },
          ];
          data.pieCarbonSearchHave = [
            { label: "無盤查碳排放量", value: res.data.carbonSearch.have[0] },
            { label: "有盤查碳排放量", value: res.data.carbonSearch.have[1] },
          ];
          data.pieCarbonSearchDownRoad = [
            { label: "無規劃具體減碳路徑", value: res.data.carbonSearch.downRoad[0] },
            { label: "規劃具體減碳路徑", value: res.data.carbonSearch.downRoad[1] },
          ];
          data.pieCarbonSearchProcess = [
            { label: "無改善製程(如設備汰舊更新、導入智慧節能管理系統等)", value: res.data.carbonSearch.process[0] },
            { label: "改善製程(如設備汰舊更新、導入智慧節能管理系統等)", value: res.data.carbonSearch.process[1] },
          ];
          data.pieCarbonSearchConversion = [
            { label: "無能源轉換(如擴大使用天然氣/生質能、導入綠電/氫能等)", value: res.data.carbonSearch.conversion[0] },
            { label: "能源轉換(如擴大使用天然氣/生質能、導入綠電/氫能等)", value: res.data.carbonSearch.conversion[1] },
          ];
          data.pieCarbonSearchReuse = [
            { label: "無循環經濟(如原料替代、廢棄物衍生燃料、二氧化碳捕捉再利用等)", value: res.data.carbonSearch.reuse[0] },
            { label: "循環經濟(如原料替代、廢棄物衍生燃料、二氧化碳捕捉再利用等)", value: res.data.carbonSearch.reuse[1] },
          ];
        })
      });
      return {data};
  },
});
</script>
