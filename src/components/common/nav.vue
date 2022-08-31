<template>
  <div class="container_nav">
    <ul ref="tabs">
      <li
        class="nav_button true"
        @click="clickTab('Dashboard')"
        ref="dashboard"
      >
        <div class="nav_icon">
          <!-- <img src="@/assets/icons/dashboard.svg" /> -->
          <!-- <img src="@/assets/icons/dashboard_focus.svg" /> -->
          <img src="@/assets/icons/dashboard.svg" v-if="!dashboard_status" />
          <img
            src="@/assets/icons/dashboard_focus.svg"
            class="true"
            v-if="dashboard_status"
          />
        </div>
        Dashboard
      </li>
      <li
        class="nav_button false"
        @click="clickTab('Statistics')"
        ref="statistics"
      >
        <div class="nav_icon">
          <!-- <img src="@/assets/icons/chart.svg" /> -->
          <!-- <img src="@/assets/icons/chart_focus.svg" /> -->
          <img src="@/assets/icons/chart.svg" v-if="statistics_status" />
          <img
            src="@/assets/icons/chart_focus.svg"
            class="true"
            v-if="!statistics_status"
          />
        </div>
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
    const dashboard_status = ref(true);
    const statistics_status = ref(true);

    function clickTab(Status: string): void {
      if (Status === "Dashboard") {
        dashboard.value.className = "nav_button true";
        statistics.value.className = "nav_button false";
        dashboard_status.value != dashboard_status.value;
        statistics_status.value != statistics_status.value;
      }
      if (Status === "Statistics") {
        dashboard.value.className = "nav_button false";
        statistics.value.className = "nav_button true";
      }
      dashboard_status.value = !dashboard_status.value;
      statistics_status.value = !statistics_status.value;
      router.push({
        name: Status,
      });
    }

    return {
      clickTab,
      tabs,
      dashboard,
      statistics,
      dashboard_status,
      statistics_status,
    };
  },
});
</script>
