<!-- type1: Title, TopIcon,Progress -->
<!-- type2: Title, TopIcon, Switch, Progress -->
<!-- type3: TopIcon, Switch, Progress -->
<template>
  <section class="container_chart">
    <div class="top">
      <p v-if="type != 3" class="title">{{ title }}</p>
      <!-- type3-->
      <ul v-if="type == 3" class="switch_text" ref="tabs_switch">
        <li class="true" @click="clickTab($event)">製造業</li>
        <li class="false" @click="clickTab($event)">服務業</li>
      </ul>
      <div class="icon_top">
        <button
          v-on:mouseover="showTooltip($event, 'content')"
          v-on:mouseleave="leaveTooltip"
        >
          <i class="gg-info"></i>
        </button>
        <button><i class="gg-software-download"></i></button>
      </div>
    </div>

    <!-- ProgressBar Demo-->
    <!-- <div v-if="type == 1" class="container_bar">
      <div class="bar_item" v-for="item in data" :key="item.key">
        <div class="bar_info">
          <span class="subtitle_4 text-system-dark_05">{{ item.name }}</span>
          <span class="text-system-light_03">{{ item.data }}</span>
        </div>
        <b-progress :class="color" :value="30"></b-progress>
      </div>
    </div> -->

    <!-- type1-->
    <div v-if="type == 1" class="container_bar">
      <div class="bar_item" v-for="item in data" :key="item.key">
        <div class="bar_info">
          <span class="subtitle_4 text-system-dark_05">{{ item.name }}</span>
          <span class="text-system-light_03">{{ item.data }}</span>
        </div>
        <b-progress :class="item.color" :value="item.data" :max="item.max"></b-progress>
      </div>
    </div>

    <!-- type2-->
    <ul v-if="type == 2" class="switch_text">
      <li class="legend_item" v-for="item in data" :key="item.key">
        <div class="icon"></div>
        {{ item.name }}
      </li>
    </ul>
    <div v-if="type == 2" class="container_bar">
      <div class="bar_item" v-for="item in data" :key="item.key">
        <div class="bar_info">
          <span class="text-system-light_03">{{ item.data }}</span>
          <span class="subtitle_4 text-system-dark_05">/10</span>
        </div>
        <b-progress :class="item.color" :value="item.data" :max="item.max"></b-progress>
      </div>
    </div>

    <!-- type3-->
    <div v-if="type == 3" class="container_bar">
      <div class="bar_item" v-for="item in data" :key="item.key">
        <div class="bar_info">
          <span class="text-system-light_03">{{ item.name }}</span>
          <span class="subtitle_4 text-system-dark_05">{{ item.data }}</span>
        </div>
        <b-progress :class="item.color" :value="item.data" :max="item.max"></b-progress>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import * as d3 from "d3";
import { html } from "d3";
import { dataTool } from "echarts/core";

export default defineComponent({
  components: {},
  props: ["type", "title", "data"],
  setup() {
    const tabs = ref();
    const tabs_switch = ref();
    const color = ref("");
    let Tooltip: any;

    onMounted(() => {
      Tooltip = d3
        .select(".container_chart")
        .append("div")
        .style("z-index", 10)
        .style("opacity", 0)
        .attr("class", "tooltips");
    });

    function showTooltip(event: any, content: string): void {
      Tooltip.html(content)
        .style("opacity", 1)
        .style("left", event.pageX + "px")
        .style("top", event.pageY + "px");
    }

    function leaveTooltip(): void {
      Tooltip.style("opacity", 0);
    }

    function clickTab(event: any): void {
      for (let item of tabs_switch.value.children) {
        item.className = "false";
      }
      event.path[0].className = "true";
    }
    return { tabs_switch, tabs, clickTab, showTooltip, leaveTooltip, color };
  },
});
</script>
