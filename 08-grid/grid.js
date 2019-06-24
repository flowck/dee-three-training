// Sizes
const margin = { t: 30, b: 20, l: 30, r: 20 };
const width = 400 - margin.l - margin.r;
const height = 200 - margin.t - margin.b;

// Chart
const svg = d3.select("svg")
  .attr("width", width + margin.l + margin.r)
  .attr("height", height + margin.t + margin.b)
  .append("g")
    .attr("transform", `translate(${margin.l}, ${margin.t})`);

// Scales
const xScale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain([0, 100])
  .range([height, 0]);


// Render grids
const xGrid = () => {
  return d3.scaleLinear(xScale)
    .ticks(5)
    .tickSize(-height)
    .tickFormat("");
}

const yGrid = () => {
  return d3.scaleLinear(yScale)
    .ticks(5)
    .tickSize(-width)
    .tickFormat("");
}

// x grid
svg.append("g")
  .attr("class", "grid")
  .attr("transform", `translate(0, ${height})`)
  .call(xGrid());

// y grid
svg.append("g")
  .attr("class", "grid")
  .attr("transform", `translate(0, 0)`)
  .call(yGrid());

/**
 * Render axis
 */

// x axis
svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(xScale));

// y axis
svg.append("g")
  .attr("transform", `translate(0, 0)`)
  .call(d3.axisLeft(yScale));
