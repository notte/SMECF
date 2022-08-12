<template>
  <section>
    <header></header>
    <section class="bottom_container">
      <nav><Nav /></nav>
      <main></main>
    </section>
  </section>
  <!-- <div class="tooltips tooltips_bottom">prompt textprompt textprompt text</div>
  <div class="tooltips tooltips_top">prompt textprompt textprompt text</div>
  <div class="tooltips tooltips_left">prompt textprompt textprompt text</div>
  <div class="tooltips tooltips_right">prompt textprompt textprompt text</div>
  <div class="avatar"></div>
  <h1>Title</h1>
  <h2>Title</h2>
  <h3>Title</h3>
  <h4>Title</h4>
  <h5>Title</h5>
  <h6>Title</h6>
  <button class="btn_xl">123</button>
  <p class="label_text">Apparently</p>
  <p class="tips">Then came the night of the first falling star.</p> -->
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
