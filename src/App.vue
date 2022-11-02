<template>
  <Loading v-if="loading" />
  <ListPopup v-if="listPopup" :title="title" />
  <DetailPopup v-if="detailPopup" />

  <section class="layout dark:bg-mode-black">
    <nav @touchstart="showMenu($event)" @touchcancel="hiddenMenu()" ref="menu">
      <button class="menu_tablet"><i class="gg-menu_light"></i></button>
      <Nav v-if="showNav" />
      <MobileNav v-if="!showNav" />
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
import MobileNav from "@/components/common/Mobile_Nav.vue";
import ModeSwitch from "@/components/common/ModeSwitch.vue";
import Loading from "@/components/common/Loading.vue";
import ListPopup from "@/components/common/ListPopup.vue";
import DetailPopup from "./components/common/DetailPopup.vue";
import * as Status from "@/models/status/type";
import * as Model from "@/models/interface/common";
import EventBus from "@/utilities/event-bus";

export default defineComponent({
  components: { Nav, MobileNav, ModeSwitch, Loading, ListPopup, DetailPopup },
  setup() {
    const Current = ref(Status.ModeType.Light);
    const loading = ref<boolean>(false);
    const listPopup = ref<boolean>(false);
    const detailPopup = ref<boolean>(false);
    const menu = ref();
    let showNav = ref<boolean>(true);
    let title = ref<string>("");
    let windowWidth = ref(0);
    function resizeWindow() {
      windowWidth.value = window.innerWidth;
    }

    onMounted(() => {
      window.addEventListener("resize", resizeWindow);
    });

    watch(
      () => windowWidth.value,
      () => {
        if (windowWidth.value < 1025) {
          showNav.value = false;
        }
        if (windowWidth.value > 1024) {
          showNav.value = true;
        }
      }
    );

    EventBus.on("listpopup_event", (prams) => {
      listPopup.value = (prams as Model.IListPopupEvent).status;
      title.value = (prams as Model.IListPopupEvent).title;
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

    function showMenu(event: Event): void {
      event.preventDefault();
      if (menu.value.children[1].style.top === "101px") {
        menu.value.children[1].style.top = "-200px";
      } else {
        menu.value.children[1].style.top = "101px";
      }
    }
    function hiddenMenu(): void {
      menu.value.children[1].style.top = "-200px";
    }

    return {
      menu,
      showMenu,
      hiddenMenu,
      Current,
      loading,
      listPopup,
      detailPopup,
      title,
      showNav,
    };
  },
});
</script>
