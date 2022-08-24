<template>
  <section class="container_charts">
    <p class="subtitle_3 text-system-light_01">國際供應鏈關鍵地位</p>
    <section class="wrapper_grid">
      <PieChart />
    </section>
    <p class="subtitle_3 text-system-light_01">自有品牌海外出貨比例</p>
    <section class="wrapper_grid">
      <PieChart />
    </section>
    <p class="subtitle_3 text-system-light_01">淨零碳排落實狀況</p>
    <section class="wrapper_grid">
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
import PieChart from "@/components/common/PieChart.vue";

export default defineComponent({
  components: { PieChart },
  setup() {
    return {};
  },
});
</script>
