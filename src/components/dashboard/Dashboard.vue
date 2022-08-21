<template>
  <section class="container_charts">
    <h6 class="text-system-light_05">基本平均表現</h6>
    <div class="wrapper_title_button">
      <ul class="tab_xl">
        <li class="tab_false">製造業</li>
        <li class="tab_true">服務業</li>
      </ul>
      <button></button> <button></button>
    </div>
    <hr class="division_1" />
    <section class="wrapper_grid grid-cols-4">
      <PieChart />
      <PieChart />
      <PieChart />
      <PieChart />
    </section>
  </section>
  <section class="container_charts">
    <h6 class="text-system-light_05">其他平均表現</h6>
    <div class="wrapper_title_button">
      <div><button>製造業</button> <button>服務業</button></div>
      <div>
        <button>全部數據下載</button>
      </div>
    </div>
    <section class="wrapper_grid grid-cols-4">
      <PieChart />
      <PieChart />
      <PieChart />
      <PieChart />
    </section>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import PieChart from "@/components/common/PieChart.vue";

export default defineComponent({
  components: { PieChart },
  setup() {
    return {};
  },
});
</script>
