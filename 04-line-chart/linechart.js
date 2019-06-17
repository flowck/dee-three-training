/*
 * Line chart
 * Author: Firmino
 */

const data = [0, 1000, 3000, 2000, 5000, 4000, 7000, 6000, 9000, 8000, 10000];
const maxValue = Math.max(...data);

// Svg styling
const margin = {
  left: 20,
  right: 20,
  top: 20,
  bottom: 20
};
const width = 500 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

const chart = d3.select(".line-chart-component")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

console.log(maxValue);

// Scale
const xScale = d3.scaleLinear();
xScale.domain([0, maxValue - 1])
  .range([0, width]);

console.log(xScale(20));

const yScale = d3.scaleLinear();
yScale.domain([0, 1])
  .range([height, 0]);

// Axes
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

// Render axis
chart
  .append("g")
  .attr("transform", `translate(20, ${height})`)
  .call(xAxis);

chart
  .append("g")
  .attr("transform", `translate(40, 10)`)
  .call(yAxis);

// Render the dots
chart
  .selectAll("dots")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", (d, i) => xScale(i))
    .attr("cy", d => console.log(x))
    .attr("r", 4)
    .attr("fill", "red");
