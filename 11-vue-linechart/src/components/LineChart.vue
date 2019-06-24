<template>
  <div class="vlc">
    <svg></svg>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "vlc",
  data() {
    return {};
  },
  mounted() {
    const log = { console };
    // Margins and Sizes
    const margin = { left: 30, right: 10, top: 30, bottom: 10 };
    const width = 400 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    // Plot
    const svg = d3
      .select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.bottom})`);

    /**
     * Scales
     */

    // x scale
    const xScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    /**
     * Axis
     */

    // x axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    // y axis
    svg
      .append("g")
      .attr("transform", `translate(0, 0)`)
      .call(d3.axisLeft(yScale));

    /**
     * Grid
     */

    // x grid
    const xGrid = () => {
      return d3
        .axisBottom(xScale)
        .ticks(5)
        .tickSize(-height)
        .tickFormat("");
    };

    const yGrid = () => {
      return d3
        .axisLeft(yScale)
        .ticks(5)
        .tickSize(-width)
        .tickFormat("");
    };

    // Render grids
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .attr("class", "grid")
      .call(xGrid());

    svg
      .append("g")
      .attr("transform", `translate(0, 0)`)
      .attr("class", "grid")
      .call(yGrid());
  }
};
</script>

<style lang="scss" scoped></style>
