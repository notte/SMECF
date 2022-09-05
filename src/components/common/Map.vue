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
      let multiplier;

      if (width > 1366) {
        scale = 11000;
        multiplier = 0.65;
      } else if (width <= 1366 && width > 480) {
        scale = 10000;
        multiplier = 0.7;
      } else if (width <= 480 && width > 320) {
        scale = 8000;
        multiplier = 0.8;
      } else {
        scale = 6000;
        multiplier = 0.4;
      }

      let projection = d3
        .geoMercator()
        .scale(scale * multiplier)
        .translate([width / 2, height / 2.5])
        .center([121, 24]);
      let path = d3.geoPath().projection(projection);

      let svg = d3
        .select(".map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      let Tooltip = d3
        .select(".map")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltips");

      let g = svg.append("g").attr("id", "group");

      d3.json<Model.IMapResponseData>("./Taiwan.geo.json").then((data) => {
        if (data) {
          g.selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("d", path as never)
            .attr("class", (d) => {
              return "city_" + d.properties["COUNTYID"];
            })
            .on("mouseover", (event) => {
              svg.selectAll("path").sort(function (a, b): number {
                if (
                  (a as Model.IFeatur).properties["COUNTYID"] !==
                  (b as Model.IFeatur).properties["COUNTYID"]
                ) {
                  return -1;
                } else {
                  return 1;
                }
              });
              Tooltip.html("The exact value of<br>this cell is: ")
                .style("opacity", 1)
                .style("left", event.pageX + "px")
                .style("top", event.pageY + "px");
            })
            .on("mouseout", (d) => {
              Tooltip.style("opacity", 0);
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
