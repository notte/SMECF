<template>
  <Loading v-if="loading" />
  <ListPopup v-if="listPopup"/>
  <DetailPopup v-if="detailPopup" />

  <section class="layout dark:bg-mode-black">
    <nav @touchstart="showMenu($event)" @touchcancel="hiddenMenu(e)" ref="menu">
      <div class="logo">
        <img
          v-if="isShow(Current, Light)"
          src="@/assets/icons/logo.svg"
          class="logo_small"
          alt=""
        />
        <img
          v-if="isShow(Current, Light)"
          src="@/assets/icons/logo-full.svg"
          class="logo_full"
          alt=""
        />
        <img
          v-if="isShow(Current, Dark)"
          src="@/assets/icons/logo_dark.svg"
          class="logo_small"
          alt=""
        />
        <img
          v-if="isShow(Current, Dark)"
          src="@/assets/icons/logo-full_dark.svg"
          class="logo_full"
          alt=""
        />
        <hr class="division" />
      </div>
      <button class="menu_tablet"><i class="gg-menu_light"></i></button>
      <Nav />
    </nav>
    <main>
      <div
        @touchstart="hiddenMenu"
        @scroll="hiddenMenu"
        ref="main"
        class="scroll_main"
      >
        <ModeSwitch />
        <router-view name="main" />
      </div>
    </main>
  </section>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import Nav from "@/components/common/Nav.vue";
import ModeSwitch from "@/components/common/ModeSwitch.vue";
import Loading from "@/components/common/Loading.vue";
import ListPopup from "@/components/common/ListPopup.vue";
import DetailPopup from "./components/common/DetailPopup.vue";
import { statusStore } from "@/store/index";
import * as Status from "@/models/status/type";
import * as common from "@/utilities/common-methods";
import EventBus from "@/utilities/event-bus";

export default defineComponent({
  components: { Nav, ModeSwitch, Loading, ListPopup, DetailPopup },
  setup() {
    const Current = ref(Status.ModeType.Light);
    const Dark = ref(Status.ModeType.Dark);
    const Light = ref(Status.ModeType.Light);
    const isShow = common.isShow;
    const status = statusStore();
    const loading = ref<boolean>(false);
    const listPopup = ref<boolean>(false);
    const detailPopup = ref<boolean>(false);

    const menu = ref();
    const main = ref();

    EventBus.on("listpopup_close", (status) => {
      listPopup.value = status as boolean;
    });

    EventBus.on("detailPopup_close", (status) => {
      detailPopup.value = status as boolean;
    });

    EventBus.on("loading_event", (status) => {
      loading.value = status as boolean;
    });

    EventBus.on("mode_switch", (prams) => {
      const mode = prams;
      Current.value = mode as Status.ModeType;
    });

    function showMenu(event: any): void {
      event.preventDefault();
      if (menu.value.children[2].style.top === "107px") {
        menu.value.children[2].style.top = "-200px";
      } else {
        menu.value.children[2].style.top = "107px";
      }
    }
    function hiddenMenu(): void {
      menu.value.children[2].style.top = "-200px";
    }

    return {
      menu,
      showMenu,
      hiddenMenu,
      main,
      isShow,
      Current,
      Dark,
      Light,
      loading,
      listPopup,
      detailPopup
    };
  },
});
</script>
