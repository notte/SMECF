<template>
  <section class="container_chart">
    <div class="top">
      <p class="title">標題</p>
      <!-- <ul class="switch_text" ref="tabs_switch">
        <li class="true" @click="clickTab($event)">製造業</li>
        <li class="false" @click="clickTab($event)">服務業</li>
      </ul> -->

      <button><i class="gg-software-download"></i></button>
    </div>
    <ul class="switch_text">
      <!-- <li class="false">製造業</li>
      <li class="true">服務業</li> -->
      <li class="legend_item">
        <div class="icon"></div>
        製造業
      </li>
      <li class="legend_item">
        <div class="icon"></div>
        服務業
      </li>
    </ul>
    <div class="container_bar">
      <div class="bar_item">
        <div class="bar_info">
          <span class="subtitle_4 text-system-dark_05">財務力</span>
          <span class="text-system-light_03">4.9</span>
        </div>
        <div class="base_bar"><div class="bar"></div></div>
      </div>
      <div class="bar_item">
        <div class="bar_info">
          <span class="text-system-light_03">3.1</span>
          <span class="subtitle_4 text-system-dark_05">/10</span>
        </div>
        <div class="base_bar"><div class="bar"></div></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  setup() {
    return {};
  },
});
</script>
