import * as React from "react";
import * as d3 from "d3";
import Card from '@mui/material/Card';


export default function graphs({ commits }) {
  const svgWidth = 600;
  const svgHeight = 600;
  React.useEffect(() => {
    const svg = d3.select(".svg-canvas");
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 100, left: 100 };
    const chartWidth = svgWidth - margin.left - margin.right;
    const chartHeight = svgHeight - margin.top - margin.bottom;

    const chart = svg
      .append("g")
      .attr("width", chartWidth)
      .attr("height", chartHeight)
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Initialize each axis
    const xAxisGroup = chart
      .append("g")
      .attr("transform", `translate(0, ${chartHeight})`);
    const yAxisGroup = chart.append("g");

    // Scaling band for the x-axis(timestamps)
    const xScale = d3
      .scaleBand()
      .range([0, chartWidth])
      .paddingInner(0.2)
      .paddingOuter(0.2);

    // Linear scaling for the y-axis(temperature)
    const yScale = d3.scaleLinear().range([chartHeight, 0]);

    // Scale the x-axis (timestamps)
    const xAxis = d3.axisBottom(xScale);

    // Adds a temperature label for every 10 degrees
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(10)
      .tickFormat((d) => `${d} commits`);

    // const update = (data) => {
    // Handle the scaling domains
    xScale.domain(commits.map((item) => item.date));
    yScale.domain([0, d3.max(commits, (d) => d.commits)]);

    const rects = chart.selectAll("rect").data(commits);

    //Remove extra nodes from the DOM
    rects.exit().remove();

    // Initial chart scaling and styling for entries
    rects
      .attr("width", xScale.bandwidth)
      .attr("height", (d) => chartHeight - yScale(d.commits))
      .attr("x", (d) => xScale(d.date))
      .attr("y", (d) => yScale(d.commits))
      .style("fill", "#023047");

    rects
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.date))
      .attr("y", (d) => yScale(d.commits))
      .attr("width", xScale.bandwidth)
      .transition()
      .duration(1000)
      .attr("height", (d) => chartHeight - yScale(d.commits))
      .style("fill", "#023047"); // Bar color

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    // Handle the chart label styling
    xAxisGroup
      .selectAll("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-40)") // tilt the timestamps by 40 degrees
      .attr("fill", "#FFB703") // Timestamp(x-axis) color
      .attr("font-size", "0.5rem"); //  Timestamp(x-axis) font size

    yAxisGroup
      .selectAll("text")
      .attr("text-anchor", "end")
      .attr("fill", "#FFB703") //  Temperature(y-axis) color
      .attr("font-size", "0.75rem"); // Temperature(y-axis) font size

  }, [commits]);
  return (
    <Card sx={{ maxWidth: 600 }}>
      <div className="canvas">
        <svg className="svg-canvas" width={svgWidth} height={svgHeight}></svg>
      </div>
    </Card>
  );
}
