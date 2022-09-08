<template>
  <section>
    <h6 class="title_h6 dark:title_h6_dark">基本平均表現</h6>
    <div class="my-6">
      <ul class="tab_l justify-start" ref="tabs_base">
        <li class="false" @click="clickTab('A', 'tabs_base', $event)">
          製造業
        </li>
        <li class="true" @click="clickTab('A', 'tabs_base', $event)">服務業</li>
      </ul>
      <hr class="division" />
    </div>
    <Base />
  </section>
  <section>
    <h6 class="title_h6 mt-4">其他平均表現</h6>
    <div class="my-6">
      <ul class="tab_l justify-start" ref="tabs_other">
        <li class="true" @click="clickTab(Finance, 'tabs_other', $event)">
          財務力
        </li>
        <li class="false" @click="clickTab(Digit, 'tabs_other', $event)">
          數位力
        </li>
        <li class="false" @click="clickTab(Innovation, 'tabs_other', $event)">
          創新力
        </li>
        <li class="false" @click="clickTab(Market, 'tabs_other', $event)">
          市場力
        </li>
      </ul>
      <hr class="division" />
    </div>
    <Finance v-if="isShow(Finance)" />
    <Digit v-if="isShow(Digit)" />
    <Innovation v-if="isShow(Innovation)" />
    <Market v-if="isShow(Market)" />
  </section>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Base from "@/components/dashboard/Base/Base.vue";
import Finance from "@/components/dashboard/Other/Finance.vue";
import Digit from "@/components/dashboard/Other/Digit.vue";
import Innovation from "@/components/dashboard/Other/Innovation.vue";
import Market from "@/components/dashboard/Other/Market.vue";
import * as Status from "@/models/status/type";
import EventBus from "@/utilities/event-bus";

export default defineComponent({
  components: { Base, Finance, Digit, Innovation, Market },
  setup() {
    const Current = ref(Status.StatisticsType.Finance);
    const Finance = ref(Status.StatisticsType.Finance);
    const Digit = ref(Status.StatisticsType.Digit);
    const Innovation = ref(Status.StatisticsType.Innovation);
    const Market = ref(Status.StatisticsType.Market);
    const tabs_base = ref();
    const tabs_other = ref();

    function clickTab(
      Status: Status.StatisticsType,
      block: string,
      event: any
    ): void {
      if (block === "tabs_base") {
        for (let item of tabs_base.value.children) {
          item.className = "false";
        }
      }
      if (block === "tabs_other") {
        Current.value = Status;
        for (let item of tabs_other.value.children) {
          item.className = "false";
        }
      }
      event.path[0].className = "true";
    }

    function isShow(page: Status.StatisticsType): boolean {
      return Current.value === page ? true : false;
    }

    return {
      tabs_base,
      tabs_other,
      clickTab,
      isShow,
      Digit,
      Innovation,
      Market,
      Finance,
      Current,
    };
  },
});
</script>
