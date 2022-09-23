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
    const north = [
      "10002",
      "10005",
      "10004",
      "68",
      "63",
      "10018",
      "65",
      "10017",
    ];
    const south = ["64", "67", "10013"];
    const center = ["10010", "10007", "66", "10009", "10020", "10008", "10016"];
    const east = ["10015", "10014"];

    EventBus.on("create_map", (prams) => {
      EventBus.emit("loading_event", true);
      setMap(prams as number[]);
    });

    EventBus.on("update_map_data", (data) => {
      EventBus.emit("loading_event", true);
      updateMapData(data as []);
    });

    function updateMapData(data: []) {
      //console.log(data);
      //TODO: update map data.
    }

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
                const hoverID = "city_" + d.properties["COUNTYID"];
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
                  g.selectAll("path").filter((a, i) => {
                    const id =
                      "city_" + (a as Model.IFeatur).properties.COUNTYID;
                    let DOM = document.getElementsByClassName(id);

                    switch (hoverID) {
                      case "city_10002":
                      case "city_10005":
                      case "city_10004":
                      case "city_68":
                      case "city_63":
                      case "city_10018":
                      case "city_65":
                      case "city_10017":
                        if (
                          id == "city_10002" ||
                          id == "city_10005" ||
                          id == "city_10004" ||
                          id == "city_68" ||
                          id == "city_63" ||
                          id == "city_10018" ||
                          id == "city_65" ||
                          id == "city_10017"
                        ) {
                          DOM[0].classList.add("hover");
                        }
                        break;
                      case "city_10010":
                      case "city_10007":
                      case "city_66":
                      case "city_10009":
                      case "city_10020":
                      case "city_10008":
                      case "city_10016":
                        if (
                          id == "city_10010" ||
                          id == "city_10007" ||
                          id == "city_66" ||
                          id == "city_10009" ||
                          id == "city_10020" ||
                          id == "city_10008" ||
                          id == "city_10016"
                        ) {
                          DOM[0].classList.add("hover");
                        }
                        break;
                      case "city_64":
                      case "city_67":
                      case "city_10013":
                        if (
                          id == "city_64" ||
                          id == "city_67" ||
                          id == "city_10013"
                        ) {
                          DOM[0].classList.add("hover");
                        }
                        break;
                      case "city_10015":
                      case "city_10014":
                        if (id == "city_10015" || id == "city_10014") {
                          DOM[0].classList.add("hover");
                        }
                        break;
                      default:
                        break;
                    }
                    return true;
                  });
                }
              })
              .on("mouseout", (event, d) => {
                const leaveID = "city_" + d.properties["COUNTYID"];
                if (props.type !== Status.ManufacturerMapType.City) {
                  g.selectAll("path").filter((a, i) => {
                    const id =
                      "city_" + (a as Model.IFeatur).properties.COUNTYID;
                    let DOM = document.getElementsByClassName(id);

                    switch (leaveID) {
                      case "city_10002":
                      case "city_10005":
                      case "city_10004":
                      case "city_68":
                      case "city_63":
                      case "city_10018":
                      case "city_65":
                      case "city_10017":
                        if (
                          id == "city_10002" ||
                          id == "city_10005" ||
                          id == "city_10004" ||
                          id == "city_68" ||
                          id == "city_63" ||
                          id == "city_10018" ||
                          id == "city_65" ||
                          id == "city_10017"
                        ) {
                          DOM[0].classList.remove("hover");
                        }
                        break;
                      case "city_10010":
                      case "city_10007":
                      case "city_66":
                      case "city_10009":
                      case "city_10020":
                      case "city_10008":
                      case "city_10016":
                        if (
                          id == "city_10010" ||
                          id == "city_10007" ||
                          id == "city_66" ||
                          id == "city_10009" ||
                          id == "city_10020" ||
                          id == "city_10008" ||
                          id == "city_10016"
                        ) {
                          DOM[0].classList.remove("hover");
                        }
                        break;
                      case "city_64":
                      case "city_67":
                      case "city_10013":
                        if (
                          id == "city_64" ||
                          id == "city_67" ||
                          id == "city_10013"
                        ) {
                          DOM[0].classList.remove("hover");
                        }
                        break;
                      case "city_10015":
                      case "city_10014":
                        if (id == "city_10015" || id == "city_10014") {
                          DOM[0].classList.remove("hover");
                        }
                        break;
                      default:
                        break;
                    }
                    return true;
                  });
                }

                Tooltip.style("opacity", 0);
              })
              .on("click", (event, d) => {
                if (window.innerWidth < 640) {
                  EventBus.emit("mobile_map_click");
                }
                if (props.type == Status.ManufacturerMapType.City) {
                  d3OnClickListener(cityName);
                } else {
                  let countryId = d.properties["COUNTYID"];
                  let status =
                    north.includes(countryId) == true
                      ? Status.ManufacturerRegionType.North
                      : south.includes(countryId) == true
                      ? Status.ManufacturerRegionType.South
                      : center.includes(countryId) == true
                      ? Status.ManufacturerRegionType.Center
                      : east.includes(countryId) == true
                      ? Status.ManufacturerRegionType.East
                      : Status.ManufacturerRegionType.North;
                  changePieSection(status);
                }
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

    function changePieSection(status: Status.ManufacturerRegionType) {
      emit("changePieSection", status);
    }
  },
});
</script>
