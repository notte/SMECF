<template>
  <div class="container_map">
    <div class="map" ref="map_size">
      <Map />
    </div>
    <div class="city"><City /></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Map from "@/components/common/Map.vue";
import City from "@/components/common/City.vue";
import EventBus from "@/utilities/event-bus";

export default defineComponent({
  components: { Map, City },
  setup() {
    const map_size = ref();

    onMounted(() => {
      EventBus.emit("create_map", [
        map_size.value.offsetWidth,
        map_size.value.offsetHeight,
      ]);
    });
    return { map_size };
  },
});
</script>
