<template>
  <section class="wrapper_chart">
    <div class="title">
      <p class="subtitle_3 text-system-light_01">標題</p>
      <button>下載</button>
    </div>
    <ul class="tabs invisible">
      <li class="false">製造業</li>
      <li class="true">服務業</li>
    </ul>
    <div class="info">
      <div class="data">
        <h1 class="text-system-light_05">
          5.1
          <span class="text-system-light_05 subtitle_2">/10</span>
        </h1>
        <p class="subtitle_4 text-system-dark_04">整體平均 4.6 分</p>
      </div>
      <!-- <div class="data">
        <p class="true">公司年資</p>
        <p class="false">資本額</p>
        <p class="false">員工數</p>
        <p class="false">場址地區</p>
      </div> -->
      <Doughnut class="chart" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Doughnut from "@/components/chart/Doughnut";

export default defineComponent({
  components: { Doughnut },
  setup() {
    return {};
  },
});
</script>
