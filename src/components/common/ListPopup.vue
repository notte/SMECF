<template>
  <div class="mask" @click="close"></div>
  <div class="container_popup">
    <section class="popup">
      <div class="title_popup">
        <div></div>
        <h5 class="title_h5">Finance 綜合平均分數</h5>
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
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import EventBus from "@/utilities/event-bus";

export default defineComponent({
  components: {},
  setup() {

    const tableData: any[] = [
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-02",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-04",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-01",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
    ];

    const table: any[] = [
      { type: "製造業", item1: 12, item2: 1, item3: 103, item4: 210, item5: 5 },
      {
        type: "服務業",
        item1: 132,
        item2: 11,
        item3: 103,
        item4: 210,
        item5: 5,
      },
      {
        type: "製造業",
        item1: 124,
        item2: 12,
        item3: 103,
        item4: 210,
        item5: 5,
      },
      {
        type: "服務業",
        item1: 12,
        item2: 13,
        item3: 103,
        item4: 210,
        item5: 5,
      },
      { type: "製造業", item1: 12, item2: 0, item3: 103, item4: 210, item5: 5 },
      {
        type: "製造業",
        item1: 12,
        item2: 15,
        item3: 103,
        item4: 210,
        item5: 3,
      },
      { type: "服務業", item1: 12, item2: 3, item3: 103, item4: 210, item5: 5 },
      { type: "製造業", item1: 1, item2: 1, item3: 13, item4: 210, item5: 54 },
      { type: "服務業", item1: 12, item2: 1, item3: 13, item4: 10, item5: 25 },
      { type: "製造業", item1: 12, item2: 1, item3: 103, item4: 210, item5: 5 },
      {
        type: "製造業",
        item1: 132,
        item2: 1,
        item3: 3,
        item4: 210,
        item5: 5,
      },
    ];

    function close():void{
      EventBus.emit("listpopup_close", false);
    }

    return {  tableData, table,close };
  },
});
</script>
