const { log } = console;

async function main() {
  const data = await getData("../datasets/ufo-types.json");

  log(data);
  
  // Sizes
  const margin = { l: 90, r: 10, t: 30, b: 10 };
  const width = 500 - margin.l - margin.r;
  const height = 250 - margin.t - margin.b;

  // Plot body
  const svg = d3.select("svg")
    .attr("width", width + margin.l + margin.r)
    .attr("height", height + margin.t + margin.b)
      .append("g")
        .attr("transform", `translate(${margin.l}, 0)`);

  // Scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.value))
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.value))
    .range([height, 0]);

  // Render axes
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  svg.append("g")
    .attr("transform", `translate(0, 0)`)
    .call(d3.axisLeft(yScale));

  // Render dots
  svg.selectAll("dots")
    .data(data)
    .enter()
    .append("circle")
      .attr("r", 3)
      .attr("class", "circle")
      .attr("cx", d => xScale(d.value))
      .attr("cy", d => yScale(d.value))
}
main();
