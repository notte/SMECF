<template>
  <section class="layout">
    <nav class="hover:w-52">
      <Nav />
    </nav>
    <main>
      <div class="scroll_main"><router-view name="main" /></div>
    </main>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Nav from "@/components/common/nav.vue";

export default defineComponent({
  components: { Nav },
  setup() {
    return {};
  },
});
</script>
