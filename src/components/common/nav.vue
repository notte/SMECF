<template>
  <button @click="clickNav('Dashboard')">Dashboard</button>
  <button @click="clickNav('Statistics')">Statistics</button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {},
  setup() {
    const router = useRouter();
    function clickNav(url: string): void {
      router.push({
        name: url,
      });
    }
    return { clickNav };
  },
});
</script>
