<template>
  <section class="wrapper_statistics_tabs">
    <div class="wrapper_title_button">
      <div>
        <button>目前</button>
        <button>未來三年</button>
      </div>
      <div>
        <button @click="Current = Operation">營運力</button>
        <button @click="Current = Innovation">創造力</button>
        <button @click="Current = Market">市場力</button>
        <button @click="Current = Finance">財務力</button>
        <button @click="Current = Manufacturer">過案廠商樣貌</button>
      </div>
      <div>
        <button>全部數據下載</button>
      </div>
    </div>
  </section>
  <Operation v-if="isShow('Operation')" />
  <Innovation v-if="isShow('Innovation')" />
  <Market v-if="isShow('Market')" />
  <Finance v-if="isShow('Finance')" />
  <Manufacturer v-if="isShow('Manufacturer')" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Operation from "@/components/statistics/Operation.vue";
import Market from "@/components/statistics/Market.vue";
import Innovation from "@/components/statistics/Innovation.vue";
import Finance from "@/components/statistics/Finance.vue";
import Manufacturer from "@/components/statistics/Manufacturer.vue";
import * as Status from "@/models/status/type";

export default defineComponent({
  components: { Operation, Market, Innovation, Finance, Manufacturer },
  setup() {
    const Current = ref(Status.StatisticsType.Operation);
    const Operation = ref(Status.StatisticsType.Operation);
    const Innovation = ref(Status.StatisticsType.Innovation);
    const Market = ref(Status.StatisticsType.Market);
    const Finance = ref(Status.StatisticsType.Finance);
    const Manufacturer = ref(Status.StatisticsType.Manufacturer);

    function isShow(page: Status.StatisticsType): boolean {
      return Current.value === page ? true : false;
    }

    return {
      isShow,
      Operation,
      Innovation,
      Market,
      Finance,
      Manufacturer,
      Current,
    };
  },
});
</script>
