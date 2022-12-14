<template>
  <section class="container_map">
    <h6 v-if="mobile_text" class="title_h6">產業區域分布</h6>
    <ul v-if="mobile_text" class="switch_button" ref="tabs">
      <li class="true" @click="clickTab(Register, $event)">{{ Register }}</li>
      <li class="false" @click="clickTab(Expand, $event)">{{ Expand }}</li>
      <li class="false" @click="clickTab(Created, $event)">{{ Created }}</li>
      <li class="false" @click="clickTab(Distributed, $event)">
        {{ Distributed }}
      </li>
    </ul>
    <DetailCity
      v-if="isShow(Register) || isShow(Expand) || isShow(Created)"
      :type="Current"
      :dataMap="data.mapCities"
      :dataPie="data.pieCities"
    />
    <DetailArea
      v-if="isShow(Distributed)"
      :data="data.pieRegionalDistributionCustomer"
    />
  </section>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted, watch } from "vue";
import * as Status from "@/models/status/type";
import DetailCity from "@/components/common/DetailCity.vue";
import DetailArea from "@/components/common/DetailArea.vue";
import EventBus from "@/utilities/event-bus";
import axios from "axios";
import { IManufacturerStatistic } from "@/models/interface/manufacturerStatistic";
import { IManufacturerStatisticDetail } from "@/models/interface/manufacturerStatisticDetai";
import { IManufacturerStatisticRegion } from "@/models/interface/manufacturerStatisticRegion";

export default defineComponent({
  components: { DetailCity, DetailArea },
  setup() {
    const Current = ref(Status.ManufacturerType.Register);
    const Register = ref(Status.ManufacturerType.Register);
    const Expand = ref(Status.ManufacturerType.Expand);
    const Created = ref(Status.ManufacturerType.Created);
    const Distributed = ref(Status.ManufacturerType.Distributed);
    const mobile_text = ref<boolean>(true);
    const tabs = ref();

    EventBus.on("mobile_title_show", (status) => {
      mobile_text.value = status as boolean;
    });

    function clickTab(Status: Status.ManufacturerType, event: any): void {
      for (let item of tabs.value.children) {
        item.className = "false";
      }
      Current.value = Status;
      event.path[0].className = "true";
    }
    function isShow(page: Status.ManufacturerType): boolean {
      return Current.value === page ? true : false;
    }

    const data = reactive({
      mapCities: [
        { countryId: "9007", name: "連江縣", count: 0 },
        { countryId: "9020", name: "金門縣", count: 0 },
        { countryId: "10002", name: "宜蘭縣", count: 1 },
        { countryId: "10004", name: "新竹縣", count: 9 },
        { countryId: "10005", name: "苗栗縣", count: 6 },
        { countryId: "10007", name: "彰化縣", count: 19 },
        { countryId: "10008", name: "南投縣", count: 10 },
        { countryId: "10009", name: "雲林縣", count: 3 },
        { countryId: "10010", name: "嘉義縣", count: 5 },
        { countryId: "10013", name: "屏東縣", count: 1 },
        { countryId: "10014", name: "臺東縣", count: 0 },
        { countryId: "10015", name: "花蓮縣", count: 0 },
        { countryId: "10016", name: "澎湖縣", count: 0 },
        { countryId: "10017", name: "基隆市", count: 0 },
        { countryId: "10018", name: "新竹市", count: 8 },
        { countryId: "10020", name: "嘉義市", count: 0 },
        { countryId: "63", name: "臺北市", count: 18 },
        { countryId: "64", name: "高雄市", count: 30 },
        { countryId: "65", name: "新北市", count: 7 },
        { countryId: "66", name: "臺中市", count: 48 },
        { countryId: "67", name: "臺南市", count: 23 },
        { countryId: "68", name: "桃園市", count: 18 },
      ],
      pieCities: {
        pieCapital: [
          { label: "1000萬以下", value: 0 },
          { label: "1000萬-2500萬", value: 0 },
          { label: "2500萬-5000萬", value: 0 },
          { label: "5000萬-7500萬", value: 0 },
          { label: "7500萬-1億", value: 0 },
          { label: "1億-2億", value: 0 },
          { label: "2億以上", value: 0 },
        ],
        pieIndustryRate: [
          { label: "製造業", value: 0 },
          { label: "服務業", value: 0 },
        ],
      },
      pieRegionalDistributionCustomer: {
        north: [
          { label: "製造業", value: 0 },
          { label: "服務業", value: 0 },
        ],
        south: [
          { label: "製造業", value: 0 },
          { label: "服務業", value: 0 },
        ],
        east: [
          { label: "製造業", value: 0 },
          { label: "服務業", value: 0 },
        ],
        center: [
          { label: "製造業", value: 0 },
          { label: "服務業", value: 0 },
        ],
      },
    });

    onMounted(() => {
      axios
        .get<IManufacturerStatistic>("./data/manufacturer_statistics.json")
        .then((res) => {
          // console.log(res.data);
          data.mapCities = [
            { countryId: "9007", name: "連江縣", count: res.data.LNN },
            { countryId: "9020", name: "金門縣", count: res.data.KMN },
            { countryId: "10002", name: "宜蘭縣", count: res.data.ILN },
            { countryId: "10004", name: "新竹縣", count: res.data.HSH },
            { countryId: "10005", name: "苗栗縣", count: res.data.MAL },
            { countryId: "10007", name: "彰化縣", count: res.data.CWH },
            { countryId: "10008", name: "南投縣", count: res.data.NTO },
            { countryId: "10009", name: "雲林縣", count: res.data.YLH },
            { countryId: "10010", name: "嘉義縣", count: res.data.CHI },
            { countryId: "10013", name: "屏東縣", count: res.data.IUH },
            { countryId: "10014", name: "臺東縣", count: res.data.TTT },
            { countryId: "10015", name: "花蓮縣", count: res.data.HWC },
            { countryId: "10016", name: "澎湖縣", count: res.data.PEH },
            { countryId: "10017", name: "基隆市", count: res.data.KLU },
            { countryId: "10018", name: "新竹市", count: res.data.HSC },
            { countryId: "10020", name: "嘉義市", count: res.data.CYI },
            { countryId: "63", name: "臺北市", count: res.data.TPE },
            { countryId: "64", name: "高雄市", count: res.data.KHH },
            { countryId: "65", name: "新北市", count: res.data.TPH },
            { countryId: "66", name: "臺中市", count: res.data.TXG },
            { countryId: "67", name: "臺南市", count: res.data.TNN },
            { countryId: "68", name: "桃園市", count: res.data.TYC },
          ];
        });

      axios
        .get<IManufacturerStatisticDetail>(
          "./data/manufacturer_statistics_detail.json"
        )
        .then((res) => {
          // console.log(res.data);
          data.pieCities = {
            pieCapital: [
              { label: "1000萬以下", value: res.data.capital[1] },
              { label: "1000萬-2500萬", value: res.data.capital[2] },
              { label: "2500萬-5000萬", value: res.data.capital[3] },
              { label: "5000萬-7500萬", value: res.data.capital[4] },
              { label: "7500萬-1億", value: res.data.capital[5] },
              { label: "1億-2億", value: res.data.capital[6] },
              { label: "2億以上", value: res.data.capital[7] },
            ],
            pieIndustryRate: [
              { label: "製造業", value: res.data.industryRate.manufacturing },
              { label: "服務業", value: res.data.industryRate.service },
            ],
          };
        });

      axios
        .get<IManufacturerStatisticRegion>(
          "./data/manufacturer_statistics_region.json"
        )
        .then((res) => {
          data.pieRegionalDistributionCustomer = {
            north: [
              { label: "製造業", value: res.data.north[0] },
              { label: "服務業", value: res.data.north[1] },
            ],
            south: [
              { label: "製造業", value: res.data.south[0] },
              { label: "服務業", value: res.data.south[1] },
            ],
            east: [
              { label: "製造業", value: res.data.east[0] },
              { label: "服務業", value: res.data.east[1] },
            ],
            center: [
              { label: "製造業", value: res.data.center[0] },
              { label: "服務業", value: res.data.center[1] },
            ],
          };
        });
    });

    return {
      tabs,
      clickTab,
      isShow,
      Current,
      Register,
      Expand,
      Created,
      Distributed,
      data,
      mobile_text,
    };
  },
});
</script>
