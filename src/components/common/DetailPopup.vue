<template>
  <div class="mask" @click="close"></div>
  <div class="container_popup">
    <section class="popup">
      <div class="title_popup">
        <div></div>
        <h5 class="title_h5">價值鏈管理 - 採用數位工具或技術</h5>
        <button @click="close"><i class="gg-close"></i></button>
      </div>
      <div class="container_chain">
        <div class="chain_item">
          <h6 class="title_h6">{{data.barOrderDetail.title}}</h6>
          <div class="container_bar">
            <div class="bar_item" v-for="(item ,i) in data.barOrderDetail.items" :key="'item_'+i">
              <div class="bar_info">
                <span class="subtitle_3 name_color">{{item.name}}</span>
              </div>
              <b-progress :class="data.barOrderDetail.color" :value="item.value"></b-progress>
            </div>
          </div>
        </div>
        <div class="chain_item">
          <h6 class="title_h6">{{data.barCarryDetail.title}}</h6>
          <div class="container_bar">
            <div class="bar_item" v-for="(item ,i) in data.barCarryDetail.items" :key="'item_'+i">
              <div class="bar_info">
                <span class="subtitle_3 name_color">{{item.name}}</span>
              </div>
              <b-progress :class="data.barCarryDetail.color" :value="item.value"></b-progress>
            </div>
          </div>
        </div>
        <div class="chain_item">
          <h6 class="title_h6">{{data.barCustomerDetail.title}}</h6>
          <div class="container_bar">
            <div class="bar_item" v-for="(item ,i) in data.barCustomerDetail.items" :key="'item_'+i">
              <div class="bar_info">
                <span class="subtitle_3 name_color">{{item.name}}</span>
              </div>
              <b-progress :class="data.barCustomerDetail.color" :value="item.value"></b-progress>
            </div>
          </div>
        </div>
        <div class="chain_item">
          <h6 class="title_h6">{{data.barAnalyzeDetail.title}}</h6>
          <div class="container_bar">
            <div class="bar_item" v-for="(item ,i) in data.barAnalyzeDetail.items" :key="'item_'+i">
              <div class="bar_info">
                <span class="subtitle_3 name_color">{{item.name}}</span>
              </div>
              <b-progress :class="data.barAnalyzeDetail.color" :value="item.value"></b-progress>
            </div>
          </div>
        </div>
        <div class="chain_item">
          <h6 class="title_h6">{{data.barGoalDetail.title}}</h6>
          <div class="container_bar">
            <div class="bar_item" v-for="(item ,i) in data.barGoalDetail.items" :key="'item_'+i">
              <div class="bar_info">
                <span class="subtitle_3 name_color">{{item.name}}</span>
              </div>
              <b-progress :class="data.barGoalDetail.color" :value="item.value"></b-progress>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import BarChartHorizontal from "@/components/chart/BarChartHorizontal.vue";
import * as d3 from "d3";
import EventBus from "@/utilities/event-bus";
import axios from "axios";
import { IIntelligentStatisticsDetail } from "@/models/interface/intelligentStatisticsDetail";

export default defineComponent({
  components: { BarChartHorizontal },
  props: ["detailId"],
  setup() {
    let Tooltip: any;

    const data = reactive({
      barOrderDetail: {
        title: "庫存與訂單管理", 
        color: "blue",
        items: [
          { name: "RFID、二維碼、物聯網感測器", value: 0 },
          { name: "倉儲管理系統(WMS)", value: 0 },
          { name: "供應鏈管理系統(SCM)", value: 0 },
        ]
      },
      barCarryDetail: {
        title: "物料搬運", 
        color: "orange",
        items: [
          { name: "輸送帶", value: 0 },
          { name: "自動導引車(AGV)", value: 0 },
          { name: "自主移動機器人(AMR)", value: 0 },
        ]
      },
      barCustomerDetail: {
        title: "顧客經營與行銷", 
        color: "purple",
        items: [
          { name: "官方網站", value: 0 },
          { name: "搜尋引擎優化、數位廣告投放", value: 0} ,
          { name: "自有社群媒體經營", value: 0 },
          { name: "顧客管理系統(CRM)", value: 0 },
        ]
      },
      barAnalyzeDetail: {
        title: "數據分析決策", 
        color: "green",
        items: [
          { name: "資料庫管理系統", value: 0 },
          { name: "人工智慧(AI)/機器學習技術", value: 0 },
        ]
      },
      barGoalDetail: {
        title: "導入工具或技術之目的", 
        color: "",
        items: [
          { name: "提升庫存週轉率", value: 0 },
          { name: "提升交期準確度", value: 0 },
          { name: "降低管理成本", value: 0 },
          { name: "提升銷售量", value: 0 },
          { name: "提高決策效率", value: 0 },
        ]
      }
    })

    onMounted(() => {
      Tooltip = d3
        .select(".popup")
        .append("div")
        .style("z-index", 10)
        .style("opacity", 0)
        .attr("class", "tooltips");

      axios
      .get<IIntelligentStatisticsDetail>("./data/intelligent_statistics_detail.json")
      .then((res) => {      
        data.barOrderDetail = {
          title: "庫存與訂單管理", 
          color: "blue",
          items: [
            { name: "RFID、二維碼、物聯網感測器", value: res.data.order[1] },
            { name: "倉儲管理系統(WMS)", value: res.data.order[2] },
            { name: "供應鏈管理系統(SCM)", value: res.data.order[3] },
          ]
        },
        data.barCarryDetail = {
          title: "物料搬運", 
          color: "orange",
          items: [
            { name: "輸送帶", value: res.data.carry[1] },
            { name: "自動導引車(AGV)", value: res.data.carry[2] },
            { name: "自主移動機器人(AMR)", value: res.data.carry[3] },
          ]
        },
        data.barCustomerDetail = {
          title: "顧客經營與行銷", 
          color: "purple",
          items: [
            { name: "官方網站", value: res.data.customer[1] },
            { name: "搜尋引擎優化、數位廣告投放", value: res.data.customer[2]},
            { name: "自有社群媒體經營", value: res.data.customer[3] },
            { name: "顧客管理系統(CRM)", value: res.data.customer[4] },
          ]
        },
        data.barAnalyzeDetail = {
          title: "數據分析決策", 
          color: "green",
          items: [
            { name: "資料庫管理系統", value: res.data.analyze[1] },
            { name: "人工智慧(AI)/機器學習技術", value: res.data.analyze[2] },
          ]
        },
        data.barGoalDetail = {
          title: "導入工具或技術之目的", 
          color: "",
          items: [
            { name: "提升庫存週轉率", value: res.data.goal[1] },
            { name: "提升交期準確度", value: res.data.goal[2] },
            { name: "降低管理成本", value: res.data.goal[3] },
            { name: "提升銷售量", value: res.data.goal[4] },
            { name: "提高決策效率", value: res.data.goal[5] },
          ]
        }
      });
    })

    function show(event: any, content: string): void {
      Tooltip.html(content)
        .style("opacity", 1)
        .style("left", event.pageX + "px")
        .style("top", event.pageY + "px");
    }

    function leave(): void {
      Tooltip.style("opacity", 0);
    }

    function close():void{
      EventBus.emit("detailPopup_close", false);
    }

    return { show, leave, close, data};
  },
});
</script>
