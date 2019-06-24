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

  log(yScale(2000))

  svg.append("g")
    .attr("class", "grid")
    .attr("transform", `translate(0, 0)`)
    .call(xGrid());

  // Render data
  const rectWidth = 20;
  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
      .attr("rx", 2.5)
      .attr("x", 1)
      .attr("y", d => d.value)
      .attr("width", d => xScale(d.value) - xScale(0))
      .attr("height", d => yScale(d.value))
      .attr("class", "rect");
}
main();