<template>
  <div class="mode_switch" @click="setMode(Light)" v-show="isShow(Dark)">
    <img src="@/assets/icons/moon_mobile.svg" alt="" />
  </div>
  <div class="mode_switch" @click="setMode(Dark)" v-show="isShow(Light)">
    <img src="@/assets/icons/sun_mobile.svg" alt="" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { statusStore } from "@/store/index";
import * as Status from "@/models/status/type";
import EventBus from "@/utilities/event-bus";

export default defineComponent({
  components: {},
  setup() {
    const Current = ref(Status.ModeType.Light);
    const Dark = ref(Status.ModeType.Dark);
    const Light = ref(Status.ModeType.Light);
    const status = statusStore();

    function setMode(mode: string): void {
      status.increment(mode);
      Current.value = mode as Status.ModeType;
      if (status.mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      EventBus.emit("mode_switch", mode);
    }

    function isShow(page: Status.ModeType): boolean {
      return Current.value === page ? true : false;
    }

    return { Current, Dark, Light, isShow, setMode };
  },
});
</script>
