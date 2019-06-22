const { log } = console;

async function main() {
  const data = await getData("../datasets/ufo-types.json");

  // Plot sizes
  const margin = { l: 50, r: 10, t: 50, b: 10 };
  const width = 500 - margin.l - margin.r;
  const height = 200 - margin.t - margin.b;

  // Plot body
  const svg = d3.select("svg")
    .attr("width", width + margin.l + margin.r)
    .attr("height", height + margin.b + margin.t)
    .append("g")
      .attr("transform", `translate(${margin.l}, ${margin.t})`);

  // x scale
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.value))
    .range([0, width]);

  const histogram = d3.histogram()
    .value(d => d.value)
    .domain(xScale.domain())
    .thresholds(xScale.ticks(2));

  const values = histogram(data);

  log(values);

  // y scale
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([height, 0]);

  // Render y axis
  svg.append("g")
    .attr("class", "axes")
    .call(d3.axisLeft(yScale).ticks(3));

  // x grid
  const xGrid = () => {
    return d3.axisLeft(yScale)
      .ticks(3)
      .tickSize(-width)
      .tickFormat("");
  };

  svg.append("g")
    .attr("class", "grid")
    .attr("transform", `translate(0, 0)`)
    .call(xGrid());

  // Render data
  const rectWidth = 20;
  svg.selectAll("rect")
    .data(values)
    .enter()
    .append("rect")
      .attr("transform", d => `translate(${xScale(d.x0)}, ${yScale(d.length)})`)
      .attr("width", (d, i) => xScale(d.x1) - xScale(d.x0) - 1)
      .attr("height", d => height - yScale(d.length))
      .attr("x", 1)
      .attr("class", "rect");
}
main();