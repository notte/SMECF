<template>
  <div class="mask"></div>
  <div class="container_popup">
    <section class="popup">
      <div class="title_popup">
        <div></div>
        <h5 class="title_h5">價值鏈管理 - 採用數位工具或技術</h5>
        <button><i class="gg-close"></i></button>
      </div>
      <div class="container_chain">
        <div
          class="chain_item"
          v-on:mouseover="show($event, 'content')"
          v-on:mouseleave="leave"
        >
          <h6 class="title_h6">庫存與訂單管理</h6>
          <div class="container_bar">
            <div class="bar_item">
              <div class="bar_info">
                <span class="subtitle_3 name_color"
                  >RFID、二維碼、物聯網感測器</span
                >
              </div>
              <b-progress :class="color" :value="30"></b-progress>
            </div>
            <div class="bar_item">
              <div class="bar_info">
                <span class="subtitle_3 name_color">倉儲管理系統(WMS)</span>
              </div>
              <b-progress :class="color" :value="30"></b-progress>
            </div>
            <div class="bar_item">
              <div class="bar_info">
                <span class="subtitle_3 name_color">供應鏈管理系統(SCM)</span>
              </div>
              <b-progress :class="color" :value="30"></b-progress>
            </div>
          </div>
        </div>
        <div class="chain_item">
          <h6 class="title_h6">顧客經營與行銷</h6>
          <div class="container_bar">
            <div class="bar_item">
              <div class="bar_info">
                <span class="subtitle_3 name_color">官方網站</span>
              </div>
              <b-progress :class="color" :value="30"></b-progress>
            </div>
            <div class="bar_item">
              <div class="bar_info">
                <span class="subtitle_3 name_color"
                  >搜尋引擎優化、數位廣告投放</span
                >
              </div>
              <b-progress :class="color" :value="30"></b-progress>
            </div>
            <div class="bar_item">
              <div class="bar_info">
                <span class="subtitle_3 name_color">自有社群媒體經營</span>
              </div>
              <b-progress :class="color" :value="30"></b-progress>
            </div>
            <div class="bar_item">
              <div class="bar_info">
                <span class="subtitle_3 name_color">顧客關係管理系統(CRM)</span>
              </div>
              <b-progress :class="color" :value="30"></b-progress>
            </div>
          </div>
        </div>
        <div class="chain_item">
          <h6 class="title_h6">物料搬運</h6>
          <div class="container_bar">
            <div class="bar_item">
              <div class="bar_info">
                <span class="subtitle_3 name_color">輸送帶</span>
              </div>
              <b-progress :class="color" :value="30"></b-progress>
            </div>
            <div class="bar_item">
              <div class="bar_info">
                <span class="subtitle_3 name_color">自動導引車(AGV)</span>
              </div>
              <b-progress :class="color" :value="30"></b-progress>
            </div>
            <div class="bar_item">
              <div class="bar_info">
                <span class="subtitle_3 name_color">自主移動機器人(AMR)</span>
              </div>
              <b-progress :class="color" :value="30"></b-progress>
            </div>
          </div>
        </div>
        <div class="chain_item">
          <h6 class="title_h6">數據分析決策</h6>
          <div class="container_bar">
            <div class="bar_item">
              <div class="bar_info">
                <span class="subtitle_3 name_color">資料管理系統</span>
              </div>
              <b-progress :class="color" :value="30"></b-progress>
            </div>
            <div class="bar_item">
              <div class="bar_info">
                <span class="subtitle_3 name_color"
                  >人工智慧(AI)/機器學習技術</span
                >
              </div>
              <b-progress :class="color" :value="30"></b-progress>
            </div>
          </div>
        </div>
        <div class="chain_item">
          <h6 class="title_h6">導入工具或技術之目的</h6>
          <div class="container_bar">
            <div class="bar_item">
              <div class="bar_info">
                <span class="subtitle_3 name_color">提升庫存週轉率</span>
              </div>
              <b-progress :class="color" :value="30"></b-progress>
            </div>
            <div class="bar_item">
              <div class="bar_info">
                <span class="subtitle_3 name_color">提升交期準確度</span>
              </div>
              <b-progress :class="color" :value="30"></b-progress>
            </div>
            <div class="bar_item">
              <div class="bar_info">
                <span class="subtitle_3 name_color">降低管理成本</span>
              </div>
              <b-progress :class="color" :value="30"></b-progress>
            </div>
            <div class="bar_item">
              <div class="bar_info">
                <span class="subtitle_3 name_color">提升銷售量</span>
              </div>
              <b-progress :class="color" :value="30"></b-progress>
            </div>
            <div class="bar_item">
              <div class="bar_info">
                <span class="subtitle_3 name_color">提高決策效率</span>
              </div>
              <b-progress :class="color" :value="30"></b-progress>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import BarChartHorizontal from "@/components/chart/BarChartHorizontal.vue";
import * as d3 from "d3";

export default defineComponent({
  components: { BarChartHorizontal },
  setup() {
    let Tooltip: any;

    onMounted(() => {
      Tooltip = d3
        .select(".popup")
        .append("div")
        .style("z-index", 10)
        .style("opacity", 0)
        .attr("class", "tooltips");
    });

    function show(event: any, content: string): void {
      Tooltip.html(content)
        .style("opacity", 1)
        .style("left", event.pageX + "px")
        .style("top", event.pageY + "px");
    }

    function leave(): void {
      Tooltip.style("opacity", 0);
    }

    return { show, leave };
  },
});
</script>
