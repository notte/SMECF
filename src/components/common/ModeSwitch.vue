<template>
  <div class="mode_switch" @click="setMode">
    <img src="@/assets/icons/moon_mobile.svg" v-if="isShow(Dark)" alt="" />
    <img src="@/assets/icons/sun_mobile.svg" v-if="isShow(Light)" alt="" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { statusStore } from "@/store/index";
import * as Status from "@/models/status/type";

export default defineComponent({
  components: {},
  setup() {
    const Current = ref(Status.ModeType.Light);
    const Dark = ref(Status.ModeType.Dark);
    const Light = ref(Status.ModeType.Light);
    const status = statusStore();

    function setMode(): void {
      if (status.mode === "Dark") {
        Current.value = Light.value;
        status.increment("Light");
      } else {
        status.increment("Dark");
        Current.value = Dark.value;
      }
      console.log(status.mode);
    }

    function isShow(page: Status.ModeType): boolean {
      return Current.value === page ? true : false;
    }
    return { Dark, Light, isShow, setMode };
  },
});
</script>
