<template>
  <section>
    <p class="other_subtitle">國內外專利</p>
    <section class="container_grid">
      <PieChart type="2" title="有專利" :data="data.piePatentHave"/>
      <PieChart type="3" title="" :data="data.piePatentType"/>
    </section>
    <p class="other_subtitle">國際認證</p>
    <section class="container_grid">
      <PieChart type="2" title="有國際認證" :data="data.pieLicenseHave"/>
      <PieChart type="3" title="" :data="data.pieLicenseType"/>
    </section>
    <p class="other_subtitle">創新商業化</p>
    <section class="container_grid">
      <PieChart type="2" title="有創新產品/技術/製程" :data="data.pieIdeasHave"/>
      <PieChart type="3" title="" :data="data.pieIdeasType"/>
    </section>
  </section>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import PieChart from "@/components/chart/PieChart.vue";
import axios from "axios";
import { INewStatistics } from "@/models/interface/newStatistics";

export default defineComponent({
  components: { PieChart },
  //TODO
  setup() {
    const data = reactive({
      piePatentHave: [
        { label: "無", value: 0 },
        { label: "有", value: 0 },
      ],
      piePatentType: [
        { label: "國內發明專利", value: 0 },
        { label: "國內新型專利", value: 0 },
        { label: "國內設計專利", value: 0 },
        { label: "國外專利", value: 0 },
      ],
      pieLicenseHave: [
        { label: "無", value: 0 },
        { label: "有", value: 0 },
      ],
      pieLicenseType: [
        { label: "產品安全認證", value: 0 },
        { label: "品質管理認證", value: 0 },
        { label: "其他", value: 0 },
      ],
      pieIdeasHave: [
        { label: "無", value: 0 },
        { label: "有", value: 0 },
      ],
      pieIdeasType: [
        { label: "有新產品", value: 0 },
        { label: "有新事業", value: 0 },
      ],
    })
    
    onMounted(() => {
      axios.get<INewStatistics>("./data/new_statistics.json")
        .then((res) => {
          // console.log(res.data);
          data.piePatentHave = [
            { label: "無", value: res.data.patent.have[0] },
            { label: "有", value: res.data.patent.have[1] },
          ];
          data.piePatentType = [
            { label: "國內發明專利", value: res.data.patent.type.localCreative },
            { label: "國內新型專利", value: res.data.patent.type.localNew },
            { label: "國內設計專利", value: res.data.patent.type.localDesign },
            { label: "國外專利", value: res.data.patent.type.oversea },
          ];
          data.pieLicenseHave = [
            { label: "無", value: res.data.license.have[0] },
            { label: "有", value: res.data.license.have[1] },
          ];
          data.pieLicenseType = [
            { label: "產品安全認證", value: res.data.license.type.productSafety },
            { label: "品質管理認證", value: res.data.license.type.qualityManagement },
            { label: "其他", value: res.data.license.type.other },
          ];
          data.pieIdeasHave = [
            { label: "無", value: res.data.ideas.have[0] },
            { label: "有", value: res.data.ideas.have[1] },
          ];
          data.pieIdeasType = [
            { label: "有新產品", value: res.data.ideas.type.newProduct },
            { label: "有新事業", value: res.data.ideas.type.newCause },
          ];
        })
      });
      return {data};
  },
});
</script>
