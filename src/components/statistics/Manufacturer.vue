<template>
  <section class="container_map">
    <h6 class="text-system-light_05">產業區域分布</h6>
    <ul class="switch_button" ref="tabs">
      <li class="true" @click="clickTab(Register, $event)">登記地區</li>
      <li class="false" @click="clickTab(Expand, $event)">擴建廠房分佈</li>
      <li class="false" @click="clickTab(Created, $event)">新建廠房分佈</li>
      <li class="false" @click="clickTab(Distributed, $event)">
        產業別區域分佈
      </li>
    </ul>
    <DetailCity v-if="isShow(Register) | isShow(Expand) | isShow(Created)" />
    <DetailArea v-if="isShow(Distributed)" />
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import * as Status from "@/models/status/type";
import DetailCity from "@/components/common/DetailCity.vue";
import DetailArea from "@/components/common/DetailArea.vue";

export default defineComponent({
  components: { DetailCity, DetailArea },
  setup() {
    const Current = ref(Status.ManufacturerType.Register);
    const Register = ref(Status.ManufacturerType.Register);
    const Expand = ref(Status.ManufacturerType.Expand);
    const Created = ref(Status.ManufacturerType.Created);
    const Distributed = ref(Status.ManufacturerType.Distributed);
    const tabs = ref();

    function clickTab(Status: Status.ManufacturerType, event: any): void {
      for (let item of tabs.value.children) {
        item.className = "false";
      }
      Current.value = Status;
      event.path[0].className = "true";
    }
    function isShow(page: Status.ManufacturerType): boolean {
      return Current.value === page ? true : false;
    }
    return {
      tabs,
      clickTab,
      isShow,
      Register,
      Expand,
      Created,
      Distributed,
    };
  },
});
</script>
