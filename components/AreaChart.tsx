'use client'
import { useEffect, useRef } from "react"
import * as d3 from "d3";



const AreaChart = ({ data } : {data : any}) => {
    const chartRef = useRef();

    console.log(data)
  
    useEffect(() => {
        if (!data || data.length === 0) return;
      
        // Set dimensions and margins
        const margin = { top: 70, right: 60, bottom: 50, left: 80 };
        const width = 1000 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;
      
        // Clear previous SVG before rendering new one
        d3.select(chartRef.current).selectAll("*").remove();
      
        // Select the chart container
        const svg = d3.select(chartRef.current)
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);
      
        // Define scales
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);
      
        // Convert timestamp and price
        data.forEach(d => {
          d.timeStamp = new Date(d.timeStamp);  // Convert UNIX timestamp to Date
          d.price = +d.price;
        });
      
        // Set the domains
        x.domain(d3.extent(data, d => d.timeStamp));
        y.domain([0, d3.max(data, d => d.price)]);
      
        // Add X axis
        svg.append("g")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b %d %H:%M")));
      
        // Add Y axis
        svg.append("g")
          .call(d3.axisLeft(y).tickFormat(d => `$${d.toFixed(2)}`));
      
        // Define area generator
        const area = d3.area()
          .x(d => x(d.timeStamp))
          .y0(height)
          .y1(d => y(d.price));
      
        // Add the area path
        svg.append("path")
          .datum(data)
          .attr("fill", "#85bb65")
          .attr("opacity", 0.5)
          .attr("d", area);
      
        // Define line generator
        const line = d3.line()
          .x(d => x(d.timeStamp))
          .y(d => y(d.price));
      
        // Add the line path
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "#85bb65")
          .attr("stroke-width", 1.5)
          .attr("d", line);
      
      }, [data]);
  
    return <svg ref={chartRef}></svg>;
  };
  
  export default AreaChart;
