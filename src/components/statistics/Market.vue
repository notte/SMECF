<template>
  <section>
    <p class="other_subtitle">國際供應鏈關鍵地位</p>
    <section class="container_grid">
      <PieChart />
    </section>
    <p class="other_subtitle">自有品牌海外出貨比例</p>
    <section class="container_grid">
      <PieChart />
    </section>
    <p class="other_subtitle">淨零碳排落實狀況</p>
    <section class="container_grid">
      <PieChart />
      <PieChart />
      <PieChart />
      <PieChart />
      <PieChart />
    </section>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import PieChart from "@/components/chart/PieChart.vue";

export default defineComponent({
  components: { PieChart },
  setup() {
    return {};
  },
});
</script>
