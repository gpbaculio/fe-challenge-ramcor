"use client";
import React, { useEffect } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

import { useSurvivorContext } from "@/contexts/SurvivorContext";

const MapComponent = () => {
  const { survivors } = useSurvivorContext();
  useEffect(() => {
    const width = 1000;
    const height = 480;

    const projection = d3
      .geoEquirectangular()
      .scale(153)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);
    let svg = d3.select("#map-container svg"); // Select the existing SVG element, if present

    if (svg.empty()) {
      // Check if SVG element is empty (not present)
      svg = d3
        .select("#map-container") // Use a container element with id 'map-container'
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      svg
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "white");
    }

    d3.json("https://d3js.org/world-50m.v1.json").then((world) => {
      const svgG = d3.select("#map-container svg g");
      if (!svgG.empty()) {
        svgG.remove();
      }
      const g = svg.append("g");
      g.append("path")
        .datum(topojson.feature(world, world.objects.countries))
        .attr("d", path)
        .attr("fill", "lightgreen")
        .attr("stroke", "green");

      const zoom = d3
        .zoom()
        .scaleExtent([1, 3]) // Set minimum and maximum scale extent
        .translateExtent([
          [0, 0],
          [width, height],
        ]) // Set translation extent
        .on("zoom", function () {
          g.attr("transform", `${d3.zoomTransform(this)}`);
        });

      svg.call(zoom);

      // Convert survivor locations to GeoJSON format
      const survivorLocations = {
        type: "FeatureCollection",
        features: survivors.map((survivor) => ({
          data: survivor,
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              survivor.lastLocation.longitude,
              survivor.lastLocation.latitude,
            ],
          },
        })),
      };

      // Create tooltip
      const tooltip = d3
        .select("#map-container")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background-color", "red");

      g.selectAll("circle")
        .data(survivorLocations.features)
        .enter()
        .append("circle")
        .attr(
          "cx",
          (d) =>
            projection(d.geometry.coordinates as [number, number])?.[0] ?? 0
        )
        .attr(
          "cy",
          (d) =>
            projection(d.geometry.coordinates as [number, number])?.[1] ?? 0
        )
        .attr("r", 4) // Adjust the radius as needed
        .style("fill", "red")
        .style("opacity", 0.6)
        .on("mouseover", function (e, d) {
          d3.select(this).style("fill", "black");
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip
            .html(
              `
              <div>Name: ${d.data.name}</div>
              <div>Age: ${d.data.age}</div>
              <div>Gender: ${d.data.gender}</div>
              <div>Last Location: (${d.geometry.coordinates[1]}, ${d.geometry.coordinates[0]})</div>
            `
            )
            .style("left", e.clientX + 10 + "px")
            .style("top", e.clientY - 28 + "px");
        })
        .on("mouseout", function (d) {
          d3.select(this).style("fill", "red");
          tooltip.transition().duration(500).style("opacity", 0);
        });
    });
  }, []);

  return <div id="map-container"></div>; // Render the map within a container div
};

export default MapComponent;
