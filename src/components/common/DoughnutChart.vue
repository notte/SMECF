<template>
  <section class="wrapper_chart">
    <!-- 最上層標題 -->
    <div class="title">
      <p class="subtitle_3 text-system-light_01">標題</p>
      <button>下載</button>
    </div>
    <!-- 第二層 tab，可能有可能沒有 -->
    <ul class="switch_chart invisible">
      <li class="false">製造業</li>
      <li class="true">服務業</li>
    </ul>
    <div class="info">
      <!-- 分數資訊 -->
      <div class="data">
        <h1 class="text-system-light_05">
          5.1
          <span class="subtitle_2">/10</span>
        </h1>
        <p class="subtitle_4 text-system-dark_04">整體平均 4.6 分</p>
      </div>
      <!-- 可切換資訊 -->
      <!-- <div class="data">
        <p class="true">公司年資</p>
        <p class="false">資本額</p>
        <p class="false">員工數</p>
        <p class="false">場址地區</p>
      </div> -->
      <!-- 圖表 -->
      <!-- <Doughnut class="chart" /> -->
      <div id="container"></div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Doughnut from "@/components/chart/Doughnut";
import { RingProgress } from "@antv/g2plot";

export default defineComponent({
  components: { Doughnut },
  setup() {
    const ringProgress = new RingProgress("container", {
      height: 100,
      width: 100,
      autoFit: false,
      percent: 0.7,
      radius: 0.5,
      color: ["#5B8FF9", "#E8EDF3"],
    });
    onMounted(() => {
      ringProgress.render();
    });

    return {};
  },
});
</script>
