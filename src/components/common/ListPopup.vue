<template>
  <div class="mask" @click="close"></div>
  <div class="container_popup">
    <section class="popup">
      <div class="title_popup">
        <div></div>
        <h5 class="title_h5">{{ title }} 綜合平均分數</h5>
        <button @click="close"><i class="gg-close"></i></button>
      </div>
      <div class="container_list">
        <!-- table sample -->
        <el-table
          class="demo"
          :data="table"
          :default-sort="{ prop: 'type', order: 'descending' }"
        >
          <el-table-column prop="type" label="Type" sortable />
          <el-table-column prop="item1" label="item1" sortable />
          <el-table-column prop="item2" label="item2" sortable />
          <el-table-column prop="item3" label="item3" sortable />
          <el-table-column prop="item4" label="item4" sortable />
          <el-table-column prop="item5" label="item5" sortable />
        </el-table>
        <!--  -->
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EventBus from "@/utilities/event-bus";
import { statusStore } from "@/store/index";

export default defineComponent({
  components: {},
  props: ["title"],
  setup(props) {
    const status = statusStore();
    const table = status.listPopup;

    function close(): void {
      EventBus.emit("listpopup_event", false);
    }

    return { close, table };
  },
});
</script>
