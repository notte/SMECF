<template>
  <section class="container_chart">
    <div class="top">
      <p class="title">{{title}}</p>
      <!-- <ul class="switch_text" ref="tabs_switch">
        <li class="true" @click="clickTab($event)">製造業</li>
        <li class="false" @click="clickTab($event)">服務業</li>
      </ul> -->

      <button><i class="gg-software-download"></i></button>
    </div>

    <!-- type1-->
    <div v-if="type==1" class="container_bar">
      <div class="bar_item" v-for="item in data" :key="item.key">
        <div class="bar_info">
          <span class="subtitle_4 text-system-dark_05">{{item.name}}</span>
          <span class="text-system-light_03">{{item.data}}</span>
        </div>
        <div class="base_bar"><div class="bar"></div></div>
      </div>
    </div>
  

    <!-- type2-->
    <ul v-if="type==2" class="switch_text">
      <li class="legend_item">
        <div class="icon"></div>
        製造業
      </li>
      <li class="legend_item">
        <div class="icon"></div>
        服務業
      </li>
    </ul>
    <div v-if="type==2" class="container_bar">
      <div class="bar_item" v-for="item in data" :key="item.key">
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
  props: [
    'type',
    'title',
    'data'
  ],
  setup() {
    return {};
  },
});
</script>
