<template>
  <div class="container_nav">
    <ul ref="tabs">
      <li
        class="nav_button true"
        @touchstart="clickTab('Dashboard')"
        ref="dashboard"
      >
        <div class="nav_content">
          <p>Dashboard</p>
        </div>
      </li>
      <li
        class="nav_button false"
        @touchstart="clickTab('Statistics')"
        ref="statistics"
      >
        <div class="nav_content">
          <p>Statistics</p>
        </div>
      </li>
      <li
        class="nav_button hidden_switch false"
        @touchstart="setMode(Light)"
        v-show="isShow(Dark)"
      >
        <div class="nav_content">
          <p>Dark Mode</p>
        </div>
      </li>
      <li
        class="nav_button hidden_switch false"
        @touchstart="setMode(Dark)"
        v-show="isShow(Light)"
      >
        <div class="nav_content">
          <p>Light Mode</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
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
    const location = useRoute();
    const dashboard = ref();
    const statistics = ref();
    const tabs = ref();
    const status = statusStore();

    onMounted(() => {
      const tools = sessionStorage.getItem("tab");
      if (tools) {
        clickTab("Statistics");
      }
    });

    watch(
      () => {
        location.path;
      },
      () => {
        let str = location.path.slice(1);
        str = str[0].toUpperCase() + str.slice(1);
        clickTab(str);
      }
    );

    function clickTab(Status: string): void {
      if (Status === "Dashboard") {
        sessionStorage.removeItem("tab");

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
      Current,
      Dark,
      Light,
      setMode,
      isShow,
    };
  },
});
</script>
