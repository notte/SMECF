<template>
  <ul class="tabs_statisticsView tab_l" ref="tabs">
    <li class="true" @click="clickTab(Finance, $event)">財務力</li>
    <li class="false" @click="clickTab(Digit, $event)">數位力</li>
    <li class="false" @click="clickTab(Innovation, $event)">創新力</li>
    <li class="false" @click="clickTab(Market, $event)">市場力</li>
    <li class="false" @click="clickTab(Manufacturer, $event)">過案廠商樣貌</li>
  </ul>
  <Finance v-if="isShow(Finance)" />
  <Digit v-if="isShow(Digit)" />
  <Innovation v-if="isShow(Innovation)" />
  <Market v-if="isShow(Market)" />
  <Manufacturer v-if="isShow(Manufacturer)" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Digit from "@/components/statistics/Digit.vue";
import Market from "@/components/statistics/Market.vue";
import Innovation from "@/components/statistics/Innovation.vue";
import Finance from "@/components/statistics/Finance.vue";
import Manufacturer from "@/components/statistics/Manufacturer.vue";
import * as Status from "@/models/status/type";

export default defineComponent({
  components: { Digit, Market, Innovation, Finance, Manufacturer },
  setup() {
    const Current = ref(Status.StatisticsType.Finance);
    const Digit = ref(Status.StatisticsType.Digit);
    const Innovation = ref(Status.StatisticsType.Innovation);
    const Market = ref(Status.StatisticsType.Market);
    const Finance = ref(Status.StatisticsType.Finance);
    const Manufacturer = ref(Status.StatisticsType.Manufacturer);
    const tabs = ref();

    window.onload = () => {
      const tools = sessionStorage.getItem("tab");
      if (tools) {
        clickTab(tools as Status.StatisticsType);
      }
    };

    onMounted(() => {
      if (window.innerWidth < 500) {
        setTabName();
      }
      window.addEventListener("resize", () => {
        if (window.innerWidth < 500) {
          setTabName();
        }
      });
    });

    function setTabName(): void {
      for (let i = 0; i <= tabs.value.children.length - 2; i++) {
        let str = tabs.value.children[i].innerHTML;
        str = str.slice(0, 2);
        tabs.value.children[i].innerHTML = str;
      }
    }

    function clickTab(Status: Status.StatisticsType, event?: Event): void {
      sessionStorage.setItem("tab", Status);
      const tools = sessionStorage.getItem("tab");
      for (let item of tabs.value.children) {
        item.className = "false";
      }
      if (event) {
        (event as any).path[0].className = "true";
      }
      if (tools) {
        for (let item of tabs.value.children) {
          if (
            tools === "Digit" &&
            (item.innerHTML === "數位力" || item.innerHTML === "數位")
          ) {
            item.className = "true";
          }
          if (
            tools === "Market" &&
            (item.innerHTML === "市場力" || item.innerHTML === "市場")
          ) {
            item.className = "true";
          }
          if (
            tools === "Innovation" &&
            (item.innerHTML === "創新力" || item.innerHTML === "創新")
          ) {
            item.className = "true";
          }
          if (
            tools === "Finance" &&
            (item.innerHTML === "財務力" || item.innerHTML === "財務")
          ) {
            item.className = "true";
          }
          if (tools === "Manufacturer" && item.innerHTML === "過案廠商樣貌") {
            item.className = "true";
          }
        }
      }
      Current.value = Status;
    }

    function isShow(page: Status.StatisticsType): boolean {
      return Current.value === page ? true : false;
    }

    return {
      isShow,
      Digit,
      Innovation,
      Market,
      Finance,
      Manufacturer,
      Current,
      tabs,
      clickTab,
    };
  },
});
</script>
