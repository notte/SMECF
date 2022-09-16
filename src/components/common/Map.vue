<template>
  <div></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import * as Model from "@/models/interface/map";
import EventBus from "@/utilities/event-bus";
import * as d3 from "d3";
import { Console } from "console";
import * as Status from "@/models/status/type";

export default defineComponent({
  props: ["type", "data"],
  setup(props, { emit }) {
    EventBus.on("create_map", (prams) => {
      EventBus.emit("loading_event", true);
      setMap(prams as number[]);
    });

    function setMap(prams: number[]): void {
      d3.selectAll("svg").remove();

      let width = (prams as number[])[0];
      let height = (prams as number[])[1];

      let scale;
      let multiplier;

      if (width > 1366) {
        scale = 11000;
      } else if (width <= 1366 && width > 480) {
        scale = 10000;
      } else if (width <= 480 && width > 320) {
        scale = 8000;
      } else {
        scale = 6000;
      }

      if (width < 720 && height < 740) {
        multiplier = 0.8;
      }
      if (width < 1300 && height < 440) {
        multiplier = 0.5;
      } else {
        multiplier = 0.6;
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

      let cityName = "";
      let count = 0;
      d3.json<Model.IMapResponseData>("./Taiwan.geo.json")
        .then((data) => {
          if (data) {
            g.selectAll("path")
              .data(data.features)
              .enter()
              .append("path")
              .attr("d", path as never)
              .attr("class", (d) => {
                return "city_" + d.properties["COUNTYID"];
              })
              .on("mouseover", (event, d) => {
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

                // By City
                if (props.type == Status.ManufacturerMapType.City) {
                  let items: [] = props.data;
                  cityName = "";
                  count = 0;

                  items?.map(
                    (item: {
                      countryId: string;
                      name: string;
                      count: number;
                    }) => {
                      if (item.countryId == d.properties["COUNTYID"]) {
                        cityName = item.name;
                        count = item.count;
                      }
                    }
                  );

                  let tooltipStr =
                    "全台中小企業加速投資行動方案家數<br>" +
                    cityName +
                    ": " +
                    count;
                  const x = event.x - 80;
                  const y = event.y - 80;
                  Tooltip.html(tooltipStr)
                    .style("opacity", 1)
                    .style("left", x + "px")
                    .style("top", y + "px");
                } else {
                  //By Area
                }
              })
              .on("mouseout", (d) => {
                Tooltip.style("opacity", 0);
              })
              .on("click", (event, d) => {
                if (window.innerWidth < 640) {
                  EventBus.emit("mobile_map_click");
                }
                d3OnClickListener(cityName);
              });
          }
        })
        .then(() => {
          setTimeout(() => {
            EventBus.emit("loading_event", false);
          }, 1000);
        });

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
    }
    function d3OnClickListener(cityName: string) {
      emit("showPieSection", cityName);
    }
  },
});
</script>
