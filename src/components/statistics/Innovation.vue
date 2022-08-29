<template>
  <section>
    <p class="other_subtitle">國內外專利</p>
    <section class="container_grid">
      <PieChart />
      <PieChart />
    </section>
    <p class="other_subtitle">國際認證</p>
    <section class="container_grid">
      <PieChart />
      <PieChart />
    </section>
    <p class="other_subtitle">創新商業化</p>
    <section class="container_grid">
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
