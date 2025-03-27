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
    const barMaxHeight = height * 0.1; // 10% of the chart height

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
    const yVolume = d3.scaleLinear().range([barMaxHeight, 0]);

    data.forEach(d => {
        d.timeStamp = new Date(d.timeStamp);  // Convert UNIX timestamp to Date
        d.price = +d.price;
        d.volume = +d.volume;
    });

    // Set the domains
    x.domain(d3.extent(data, d => d.timeStamp));
    y.domain([0, d3.max(data, d => d.price)]);
    yVolume.domain([0, d3.max(data, d => d.volume)]);

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
        .attr("stop-color", "#85bb65")  
        .attr("stop-opacity", 0.8);

    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "white")  
        .attr("stop-opacity", 0.1);

    // Define area generator
    const area = d3.area()
        .x(d => x(d.timeStamp))
        .y0(height)
        .y1(d => y(d.price));

    // Add the area path with gradient
    svg.append("path")
        .datum(data)
        .attr("fill", "url(#area-gradient)")  
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

    // --- ADD BARS FOR VOLUME ---
    const barWidth = Math.max(width / data.length - 2, 2); // Dynamic width with spacing
    
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.timeStamp) - barWidth / 2) // Centering bars
        .attr("y", d => height - yVolume(d.volume))
        .attr("width", barWidth) // Adding spacing
        .attr("height", d => yVolume(d.volume))
        .attr("fill", "gray")
        .attr("opacity", 0.3);

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
        .attr("r", 4)
        .attr("fill", "black");

    // Tooltip for X-axis (datetime)
    const xTooltip = svg.append("text")
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .style("pointer-events", "none");

    // Tooltip for Y-axis (price) - Modified
    const yTooltipBackground = svg.append("rect")
        .attr("fill", "lightgreen") // Green background
        .attr("rx", 4)  // Rounded corners
        .attr("ry", 4)
        .style("display", "none");

    const yTooltip = svg.append("text")
        .attr("text-anchor", "end")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .attr("dy", "0.35em") // Center text vertically
        .style("pointer-events", "none");

    // Mouse interaction overlay
    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "transparent")
        .on("mouseover", () => {
            crosshairGroup.style("display", null);
            yTooltipBackground.style("display", null);
        })
        .on("mouseout", () => {
            crosshairGroup.style("display", "none");
            xTooltip.style("display", "none");
            yTooltip.style("display", "none");
            yTooltipBackground.style("display", "none");
        })
        .on("mousemove", function (event) {
            const [mouseX] = d3.pointer(event, this);
            const mouseTime = x.invert(mouseX);

            // Find closest data point
            const bisect = d3.bisector(d => d.timeStamp).left;
            const index = bisect(data, mouseTime, 1);
            const a = data[index - 1];
            const b = data[index] ?? a;
            const closest = mouseTime - a.timeStamp > b.timeStamp - mouseTime ? b : a;

            const xPos = x(closest.timeStamp);
            const yPos = y(closest.price);

            // Update crosshair position
            verticalLine.attr("x1", xPos).attr("x2", xPos);
            horizontalLine.attr("y1", yPos).attr("y2", yPos);
            focusCircle.attr("cx", xPos).attr("cy", yPos);

            // Update tooltips
            xTooltip
                .attr("x", xPos)
                .attr("y", height + 15)
                .text(d3.timeFormat("%b %d, %H:%M")(closest.timeStamp))
                .style("display", "block");

            const yText = `$${closest.price.toFixed(2)}`;
            yTooltip
                .attr("x", width + 10)
                .attr("y", yPos)
                .text(yText)
                .style("display", "block");

            // Get text size and position background accordingly
            const bbox = yTooltip.node().getBBox();
            yTooltipBackground
                .attr("x", bbox.x - 5)
                .attr("y", bbox.y - 2)
                .attr("width", bbox.width + 10)
                .attr("height", bbox.height + 4)
                .style("display", "block");
        });

}, [data]);

    
    
  
    return <svg ref={chartRef}></svg>;
  };
  
  export default AreaChart;
