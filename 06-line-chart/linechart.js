"use strict";

// Utils
const { log } = console;

// Data
const yMax = d3.max(sensor.y);
const yMin = d3.min(sensor.y);
const xMax = d3.max(sensor.x);
const xMin = d3.min(sensor.x);

// Sizes anc Chart options
const margin = { l: 50, r: 50, t: 50, b: 50 };
const width = window.innerWidth - margin.l - margin.r;
const height = window.innerHeight - margin.t - margin.b;

const svg = d3.select("svg")
  .attr("width", width + margin.l + margin.r)
  .attr("height", height + margin.t + margin.b)
  .append("g")
    .attr("transform", `translate(${margin.l}, ${margin.t})`);

// Scales
const xScale = d3.scaleLinear()
  .domain(d3.extent(values, d => d.x))
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain(d3.extent(values, d => d.y))
  .range([height, 0]);

// Render axis
svg.append("g")
  .attr("transform", `translate(0, 0)`)
  .call(d3.axisLeft(yScale));

svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(xScale));

// Draw the line
const line = d3.line()
  .x(d => xScale(d.x))
  .y(d => yScale(d.y));

// Append data
svg.append("path")
  .attr("d", line(values))
    .attr("fill", "none")
    .attr("stroke", "#000000")
    .attr("stroke-width", 3);