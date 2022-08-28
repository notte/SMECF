<template>
  <section class="wrapper_chart">
    <div class="title">
      <p class="subtitle_3 text-system-light_01">標題</p>
      <!-- <ul class="switch_chart" ref="tabs_switch">
        <li class="true" @click="clickTab($event)">製造業</li>
        <li class="false" @click="clickTab($event)">服務業</li>
      </ul> -->

      <button>下載</button>
    </div>
    <ul class="switch_chart">
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
        <div class="wrapper_bar"><div class="bar"></div></div>
      </div>
      <div class="bar_item">
        <div class="bar_info">
          <span class="text-system-light_03">3.1</span>
          <span class="subtitle_4 text-system-dark_05">/10</span>
        </div>
        <div class="wrapper_bar"><div class="bar"></div></div>
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
