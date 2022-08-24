<template>
  <ul class="tabs_center tab_l">
    <li class="tab_true" @click="Current = Finance">財務力</li>
    <li class="tab_false" @click="Current = Digit">數位力</li>
    <li class="tab_false" @click="Current = Innovation">創新力</li>
    <li class="tab_false" @click="Current = Market">市場力</li>
    <li class="tab_false" @click="Current = Manufacturer">過案廠商樣貌</li>
  </ul>
  <Digit v-if="isShow('Digit')" />
  <Innovation v-if="isShow('Innovation')" />
  <Market v-if="isShow('Market')" />
  <Finance v-if="isShow('Finance')" />
  <Manufacturer v-if="isShow('Manufacturer')" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
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
    };
  },
});
</script>
