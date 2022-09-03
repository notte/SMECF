<template>
  <section>
    <p class="other_subtitle">國際供應鏈關鍵地位</p>
    <section class="container_grid">
      <PieChart type="2" title="" :data="data.pieTest"/>
    </section>
    <p class="other_subtitle">自有品牌海外出貨比例</p>
    <section class="container_grid">
      <PieChart type="2" title="" :data="data.pieTest"/>
    </section>
    <p class="other_subtitle">淨零碳排落實狀況</p>
    <section class="container_grid">
      <PieChart type="2" title="" :data="data.pieTest"/>
      <PieChart type="2" title="" :data="data.pieTest"/>
      <PieChart type="2" title="" :data="data.pieTest"/>
      <PieChart type="2" title="" :data="data.pieTest"/>
      <PieChart type="2" title="" :data="data.pieTest"/>
    </section>
  </section>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import PieChart from "@/components/chart/PieChart.vue";

export default defineComponent({
  components: { PieChart },
  //TODO
  setup() {
    const data = reactive({
      pieTest: [
        { label: "總資產", value: 0 }, 
        { label: "股東權益", value: 0 },
        { label: "總負債", value: 0 },
      ],
    })
    return {data};
  },
});
</script>
