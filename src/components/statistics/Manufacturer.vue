<template>
  <Map />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import BarChartStraight from "@/components/common/BarChartStraight.vue";
import Map from "@/components/statistics/Taiwan.vue";

export default defineComponent({
  components: { BarChartStraight, Map },
  setup() {
    return {};
  },
});
</script>
