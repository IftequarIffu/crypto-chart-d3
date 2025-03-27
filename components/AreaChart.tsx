'use client'
import { useEffect, useRef } from "react"
import * as d3 from "d3";



const AreaChart = ({ data } : {data : any}) => {
    const chartRef = useRef();

    console.log(data)
  
    useEffect(() => {
        if (!data || data.length === 0) return;
    
        // Set dimensions and margins
        const margin = { top: 50, right: 40, bottom: 40, left: 60 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;
    
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
    
        // Move Y axis to the right
        svg.append("g")
            .attr("transform", `translate(${width},0)`)
            .call(d3.axisRight(y).tickFormat(d => `$${d.toFixed(2)}`));
    
        // Define gradient
        const defs = svg.append("defs");
        const gradient = defs.append("linearGradient")
            .attr("id", "area-gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%");
    
        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#85bb65")  // Green at the top
            .attr("stop-opacity", 0.8);
    
        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "white")  // White at the bottom
            .attr("stop-opacity", 0.1);
    
        // Define area generator
        const area = d3.area()
            .x(d => x(d.timeStamp))
            .y0(height)
            .y1(d => y(d.price));
    
        // Add the area path with gradient
        svg.append("path")
            .datum(data)
            .attr("fill", "url(#area-gradient)")  // Apply gradient fill
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
    
        // --- CROSSHAIR ---
        const crosshairGroup = svg.append("g").style("display", "none");
    
        // Vertical line
        const verticalLine = crosshairGroup.append("line")
            .attr("stroke", "black")
            .attr("stroke-dasharray", "4")
            .attr("stroke-width", 1)
            .attr("y1", 0)
            .attr("y2", height);
    
        // Horizontal line
        const horizontalLine = crosshairGroup.append("line")
            .attr("stroke", "black")
            .attr("stroke-dasharray", "4")
            .attr("stroke-width", 1)
            .attr("x1", 0)
            .attr("x2", width);
    
        // Circle at intersection
        const focusCircle = crosshairGroup.append("circle")
            .attr("r", 1)
            .attr("fill", "black");
    
        // Mouse interaction overlay
        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("fill", "transparent")
            .on("mouseover", () => crosshairGroup.style("display", null))
            .on("mouseout", () => crosshairGroup.style("display", "none"))
            .on("mousemove", function (event) {
                const [mouseX] = d3.pointer(event, this);
                const mouseTime = x.invert(mouseX);
    
                // Find closest data point
                const bisect = d3.bisector(d => d.timeStamp).left;
                const index = bisect(data, mouseTime, 1);
                const a = data[index - 1];
                const b = data[index] ?? a;
                const closest = mouseTime - a.timeStamp > b.timeStamp - mouseTime ? b : a;
    
                // Update crosshair position
                verticalLine.attr("x1", x(closest.timeStamp)).attr("x2", x(closest.timeStamp));
                horizontalLine.attr("y1", y(closest.price)).attr("y2", y(closest.price));
                focusCircle.attr("cx", x(closest.timeStamp)).attr("cy", y(closest.price));
            });
    
    }, [data]);
    
  
    return <svg ref={chartRef}></svg>;
  };
  
  export default AreaChart;
