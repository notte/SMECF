<template>
  <section class="container_charts">
    <p class="subtitle_3 text-system-light_01">國內外專利</p>
    <section class="wrapper_grid">
      <PieChart />
      <PieChart />
    </section>
    <p class="subtitle_3 text-system-light_01">國際認證</p>
    <section class="wrapper_grid">
      <PieChart />
      <PieChart />
    </section>
    <p class="subtitle_3 text-system-light_01">創新商業化</p>
    <section class="wrapper_grid">
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
