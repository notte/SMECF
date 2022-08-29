<template>
  <div></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import * as Model from "@/models/interface/map";
import EventBus from "@/utilities/event-bus";
import * as d3 from "d3";

export default defineComponent({
  setup() {
    EventBus.on("create_map", (prams) => {
      d3.selectAll("svg").remove();
      let width = (prams as number[])[0];
      let height = (prams as number[])[1];

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

      let projection = d3
        .geoMercator()
        .scale(scale * 0.7)
        .translate([width / 2, height / 2.5])
        .center([121, 24]);
      let path = d3.geoPath().projection(projection);

      let svg = d3
        .select(".map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      let g = svg.append("g").attr("id", "group");

      d3.json<Model.IMapResponseData>("./Taiwan.geo.json").then((data) => {
        if (data) {
          g.selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("d", path as never)
            .attr("id", (d) => {
              return d.properties["COUNTYID"];
            });
          // .on("click", (e, d) => {

          // });
        }
      });

      let zoom = d3
        .zoom()
        .scaleExtent([1, 2])
        .translateExtent([
          [0, 0],
          [width, height],
        ])
        .on("zoom", function (event) {
          g.selectAll("path").attr("transform", event.transform);
        });
      svg.call(zoom as never);
    });
  },
});
</script>
