<template>
  <section class="container_charts">
    <h6 class="text-system-light_05">基本平均表現</h6>
    <div class="wrapper_tab">
      <ul class="tab_l">
        <li class="tab_false">製造業</li>
        <li class="tab_true">服務業</li>
      </ul>
      <hr class="division_1" />
    </div>
    <Base />
  </section>
  <section class="container_charts">
    <h6 class="text-system-light_05">其他平均表現</h6>
    <div class="wrapper_tab">
      <ul class="tab_l">
        <li class="tab_false">財務力</li>
        <li class="tab_true">數位力</li>
        <li class="tab_false">創新力</li>
        <li class="tab_false">市場力</li>
      </ul>
      <hr class="division_1" />
    </div>
    <Other />
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Base from "@/components/dashboard/Base.vue";
import Other from "@/components/dashboard/Other.vue";

export default defineComponent({
  components: { Base, Other },
  setup() {
    return {};
  },
});
</script>
