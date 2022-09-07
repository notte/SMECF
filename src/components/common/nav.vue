<template>
  <div class="container_nav">
    <ul ref="tabs">
      <li
        class="nav_button true"
        @click="clickTab('Dashboard')"
        @touchstart="clickTab('Dashboard')"
        ref="dashboard"
      >
        <div class="nav_content">
          <div class="nav_icon">
            <img
              class="icon_mobile"
              src="@/assets/icons/dashboard_mobile.svg"
            />
            <img src="@/assets/icons/dashboard.svg" v-if="!dashboard_status" />
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
        @touchstart="clickTab('Statistics')"
        ref="statistics"
      >
        <div class="nav_content">
          <div class="nav_icon">
            <img class="icon_mobile" src="@/assets/icons/chart_mobile.svg" />
            <img src="@/assets/icons/chart.svg" v-if="statistics_status" />
            <img
              src="@/assets/icons/chart_focus.svg"
              class="true"
              v-if="!statistics_status"
            />
          </div>
          <p>Statistics</p>
        </div>
      </li>
      <li
        class="nav_button hidden_switch"
        @click="setMode(Light)"
        v-show="isShow(Dark)"
      >
        <div class="nav_content">
          <div class="nav_icon">
            <img class="icon_mobile" src="@/assets/icons/moon_mobile.svg" />
          </div>
          <p>Dark Mode</p>
        </div>
      </li>
      <li
        class="nav_button hidden_switch"
        @click="setMode(Dark)"
        v-show="isShow(Light)"
      >
        <div class="nav_content">
          <div class="nav_icon">
            <img
              class="icon_mobile"
              src="@/assets/icons/sun_mobile.svg"
              alt=""
            />
          </div>
          <p>Light Mode</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import * as Status from "@/models/status/type";
import EventBus from "@/utilities/event-bus";
import { statusStore } from "@/store/index";

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
    const status = statusStore();

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

    function setMode(mode: string): void {
      status.increment(mode);
      Current.value = mode as Status.ModeType;
      if (status.mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      EventBus.emit("mode_switch", mode);
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
      setMode,
      isShow,
    };
  },
});
</script>
