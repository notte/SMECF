<template>
  <section class="container_grid">
    <DonutPieChart />
    <DonutPieChart />
    <DonutPieChart />
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import DonutPieChart from "@/components/chart/DonutPieChart.vue";

export default defineComponent({
  components: { DonutPieChart },
  setup() {
    return {};
  },
});
</script>
