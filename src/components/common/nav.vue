<template>
  <div class="wrapper_nav">
    <div class="nav_button true">
      <div class="nav_icon"></div>
      <button @click="clickNav('Dashboard')">Dashboard</button>
    </div>
    <div class="nav_button false">
      <div class="nav_icon"></div>
      <button @click="clickNav('Statistics')">Statistics</button>
    </div>
  </div>
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
