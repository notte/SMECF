<template>
  <div class="map"></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
// import * as Model from "@/models/interface/map";
// import { cityStore } from "@/store/index";
// import EventBus from "@/utilities/event-bus";
import * as d3 from "d3";

export default defineComponent({
  setup() {
    // const city = cityStore();
    let width = 1000;
    let height = 1000;

    let scale;

    if (width > 1366) {
      scale = 11000;
    } else if (width <= 1366 && width > 480) {
      scale = 10000;
    } else if (width <= 480 && width > 320) {
      scale = 8000;
    } else {
      scale = 6000;
    }
    // 建立 svg 容器
    const svg = d3
      .select("#nav")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("style", "border:3px solid #999999")
      .attr("id", "container");

    // 設定投影方式
    let projection = d3.geoMercator().center([121, 24]).scale(100);

    // 產生 path function，生成 geoPath 物件
    let path = d3.geoPath().projection(projection) as any;

    // 取得地圖資料
    d3.json<any>("./map.geojson")
      .then((data) => {
        if (data) {
          svg
            .selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("id", (d, i) => {
              return "data" + i;
            });
        }
      })
      .catch();

    // let projection = d3
    //   .geoMercator()
    //   .scale(scale)
    //   .translate([width / 2, height / 2.5])
    //   .center([121, 24]);
    // let path = d3.geoPath().projection(projection);
    // let svg = d3
    //   .select(".map")
    //   .append("svg")
    //   .attr("width", width)
    //   .attr("height", height);

    // let g = svg.append("g").attr("id", "group");
    // console.log(g);

    // d3.json<any>("./map.geojson").then((data) => {
    //   if (data) {
    //     g.selectAll("path")
    //       .data(data.features)
    //       .enter()
    //       .append("path")
    //       .attr("d", path as never)
    //       .attr("id", (d) => {
    //         return (d as any).properties["COUNTYENG"].split(" ")[0];
    //       });
    //     // .on("click", (e, d) => {
    //     //   city.en = d.properties["COUNTYENG"]
    //     //     .replace("City", "")
    //     //     .replace(" ", "");
    //     //   city.cn = d.properties["COUNTYNAME"];
    //     //   if (document.querySelector(".active")) {
    //     //     document.querySelector(".active")?.classList.remove("active");
    //     //   }
    //     //   document.getElementById(e.srcElement.id)?.classList.add("active");
    //     // });
    //   }
    // });

    // let zoom = d3
    //   .zoom()
    //   .scaleExtent([1, 2])
    //   .translateExtent([
    //     [0, 0],
    //     [width, height],
    //   ])
    //   .on("zoom", function (event) {
    //     g.selectAll("path").attr("transform", event.transform);
    //   });
    // svg.call(zoom as never);
  },
});
</script>
