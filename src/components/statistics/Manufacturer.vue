<template>
  <section class="map"><Map /></section>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import BarChartStraight from "@/components/common/BarChartStraight.vue";
import Map from "@/components/statistics/Taiwan.vue";
import EventBus from "@/utilities/event-bus";

export default defineComponent({
  components: { BarChartStraight, Map },
  setup() {
    onMounted(() => {
      EventBus.emit("create_map");
    });
    return {};
  },
});
</script>
