<template>
  <div class="container_nav">
    <ul ref="tabs">
      <li
        class="nav_button true"
        @click="clickTab('Dashboard')"
        ref="dashboard"
      >
        <div class="nav_content">
          <div class="nav_icon">
            <img
              v-show="isShow(Dark)"
              class="icon_mobile"
              src="@/assets/icons/dashboard_mobile.svg"
            />
            <img
              v-show="isShow(Light)"
              src="@/assets/icons/dashboard.svg"
              v-if="!dashboard_status"
            />
            <img
              src="@/assets/icons/dashboard_focus.svg"
              class="true"
              v-if="dashboard_status"
            />
          </div>
          <p>Dashboard</p>
        </div>
      </li>
      <li
        class="nav_button false"
        @click="clickTab('Statistics')"
        ref="statistics"
      >
        <div class="nav_content">
          <div class="nav_icon">
            <img
              v-show="isShow(Dark)"
              class="icon_mobile"
              src="@/assets/icons/chart_mobile.svg"
            />
            <img
              v-show="isShow(Light)"
              src="@/assets/icons/chart.svg"
              v-if="statistics_status"
            />
            <img
              src="@/assets/icons/chart_focus.svg"
              class="true"
              v-if="!statistics_status"
            />
          </div>
          <p>Statistics</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import * as Status from "@/models/status/type";
export default defineComponent({
  components: {},
  setup() {
    const Current = ref(Status.ModeType.Light);
    const Dark = ref(Status.ModeType.Dark);
    const Light = ref(Status.ModeType.Light);
    const router = useRouter();
    const dashboard = ref();
    const statistics = ref();
    const dashboard_status = ref(true);
    const statistics_status = ref(true);
    const tabs = ref();

    onMounted(() => {
      const tools = sessionStorage.getItem("tab");
      if (tools) {
        clickTab("Statistics");
      }
    });

    function clickTab(status: string): void {
      if (status === "Dashboard") {
        sessionStorage.removeItem("tab");
        dashboard.value.className = "nav_button true";
        statistics.value.className = "nav_button false";
        dashboard_status.value != dashboard_status.value;
        statistics_status.value != statistics_status.value;
      }

      if (status === "Statistics") {
        dashboard.value.className = "nav_button false";
        statistics.value.className = "nav_button true";
      }
      dashboard_status.value = !dashboard_status.value;
      statistics_status.value = !statistics_status.value;

      router.push({
        name: status,
      });
    }

    function isShow(page: Status.ModeType): boolean {
      return Current.value === page ? true : false;
    }

    return {
      clickTab,
      tabs,
      dashboard,
      statistics,
      dashboard_status,
      statistics_status,
      Current,
      Dark,
      Light,
      isShow,
    };
  },
});
</script>
