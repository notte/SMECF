<template>
  <div class="wrapper_nav">
    <ul ref="tabs">
      <li
        class="nav_button true"
        @click="clickTab('Dashboard')"
        ref="dashboard"
      >
        <div class="nav_icon"></div>
        Dashboard
      </li>
      <li
        class="nav_button false"
        @click="clickTab('Statistics')"
        ref="statistics"
      >
        <div class="nav_icon"></div>
        Statistics
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {},
  setup() {
    const router = useRouter();
    const dashboard = ref();
    const statistics = ref();
    const tabs = ref();

    function clickTab(Status: string): void {
      if (Status === "Dashboard") {
        dashboard.value.className = "nav_button true";
        statistics.value.className = "nav_button false";
      }
      if (Status === "Statistics") {
        dashboard.value.className = "nav_button false";
        statistics.value.className = "nav_button true";
      }
      router.push({
        name: Status,
      });
    }

    return { clickTab, tabs, dashboard, statistics };
  },
});
</script>
