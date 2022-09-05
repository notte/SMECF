<template>
  <!-- <Loading /> -->
  <section class="layout">
    <nav @touchstart="showMenu($event)" @touchcancel="hiddenMenu(e)" ref="menu">
      <div class="logo">
        <img src="@/assets/icons/logo.svg" class="logo_small" alt="" />
        <img src="@/assets/icons/logo-full.svg" class="logo_full" alt="" />
        <hr class="division_1" />
      </div>
      <button class="menu_tablet"><i class="gg-menu"></i></button>
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
import { defineComponent, ref } from "vue";
import Nav from "@/components/common/Nav.vue";
import ModeSwitch from "@/components/common/ModeSwitch.vue";
import Loading from "@/components/common/Loading.vue";

export default defineComponent({
  components: { Nav, ModeSwitch, Loading },
  setup() {
    const menu = ref();
    const main = ref();
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
    return { menu, showMenu, hiddenMenu, main };
  },
});
</script>
