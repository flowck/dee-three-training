const { log } = console;

async function main() {
  // Get data
  let data = await getData("../datasets/KCLT.json");
  data = data.map(item => {
    item.date = new Date(item.date);
    return item;
  })

  data = data.sort((a, b) => new Date(b.date) - new Date(a.date));
  

  // Plot size options
  const margin = { l: 20, r: 20, t: 20, b: 20 };
  const width = window.innerWidth - margin.l - margin.r;
  const height = window.innerHeight - margin.t - margin.b;

  // Plot
  const svg = d3.select("svg")
    .attr("width", width + margin.l + margin.r)
    .attr("height", height + margin.t + margin.b)
    .append("g")
      .attr("transform", `translate(${margin.l}, ${margin.t})`);

  // Scales
  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.average_max_temp))
    .range([height, 0]);

  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([0, width]);

  // Render axes
  svg.append("g")
    .attr("transform", `translate(${margin.l} 0)`)
    .call(d3.axisLeft(yScale));

  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  // Render line
  const line = d3.line()
    .x(d => d.date)
    .y(d => d.average_max_temp);

  svg.append("path")
    .attr("d", line(data))
      .attr("fill", "none")
      .attr("stroke", "#000000")
      .attr("stroke-width", 3);
}

main();