<template>
  <section>
    <p class="other_subtitle">國內外專利</p>
    <section class="container_grid">
      <PieChart type="2" title="" :data="data.pieTest"/>
      <PieChart title="" :data="data.pieTest"/>
    </section>
    <p class="other_subtitle">國際認證</p>
    <section class="container_grid">
      <PieChart type="2" title="" :data="data.pieTest"/>
      <PieChart title="" :data="data.pieTest"/>
    </section>
    <p class="other_subtitle">創新商業化</p>
    <section class="container_grid">
      <PieChart type="2" title="" :data="data.pieTest"/>
      <PieChart title="" :data="data.pieTest"/>
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
