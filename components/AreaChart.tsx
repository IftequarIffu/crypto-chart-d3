'use client'
import { useEffect, useRef } from "react"
import * as d3 from "d3";

const AreaChart = ({ data } : {data : any}) => {
    const chartRef = useRef();

    console.log(data)
  
    useEffect(() => {
    if (!data || data.length === 0) return;

    // Set dimensions and margins
    const margin = { top: 50+5, right: 40+5, bottom: 40+5, left: 60+5 };
    // const margin = { top: 2, right: 2, bottom: 2, left: 2 };
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

        svg.append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", height)
        .attr("y2", height)
        .attr("stroke", "black")
        .attr("stroke-width", 0.3)
        .attr("stroke-opacity", 0.3);
    
    svg.append("line")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("stroke-opacity", 0.3);
    
    svg.append("line")
        .attr("x1", width)
        .attr("x2", width)
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("stroke-opacity", 0.3);

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
        .attr("offset", "5%")
        .attr("stop-color", "#4b40ee")  
        .attr("stop-opacity", 0.2);

    gradient.append("stop")
        .attr("offset", "95%")
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
        .attr("d", area)
        // .attr("style", "outline: thin solid black;");
        .attr("style", "stroke: black; stroke-width: 1.5; stroke-opacity: 0.3; shape-rendering: crispEdges;")


    // Define line generator
    const line = d3.line()
        .x(d => x(d.timeStamp))
        .y(d => y(d.price));

    // Add the line path
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#4b40ee")
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
        .attr("r", 1)
        .attr("fill", "black");

    // Tooltip for X-axis (datetime)
    const xTooltip = svg.append("text")
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .style("pointer-events", "none");

    // Tooltip for Y-axis (price) - Modified
    const yTooltipBackground = svg.append("rect")
        .attr("fill", "black") // Green background
        .attr("rx", 4)  // Rounded corners
        .attr("ry", 4)
        .style("display", "none");

    const yTooltip = svg.append("text")
        .attr("text-anchor", "end")
        .attr("font-size", "12px")
        .attr("fill", "white")
        .attr("dy", "0.35em") // Center text vertically
        .style("pointer-events", "none");

    // --- LATEST PRICE TAG ---
    const lastDataPoint = data[data.length - 1];
    const latestPriceText = `${lastDataPoint.price.toFixed(2)}`;
    
    // Latest price background rectangle
    const latestPriceBackground = svg.append("rect")
        .attr("x", x(lastDataPoint.timeStamp) - 42)
        .attr("y", y(lastDataPoint.price) - 12)
        .attr("fill", "#4b40ee")  // Purple background
        .attr("rx", 4)  // Rounded corners
        .attr("ry", 4);

    // Latest price text
    const latestPriceLabel = svg.append("text")
        .attr("x", x(lastDataPoint.timeStamp) - 40)
        .attr("y", y(lastDataPoint.price))
        .attr("font-size", "18px")
        .attr("fill", "white")
        .text(latestPriceText);

    // Adjust background size after adding text
    const labelBBox = latestPriceLabel.node().getBBox();
    latestPriceBackground
        .attr("width", labelBBox.width + 20)
        .attr("height", labelBBox.height + 6)
        .attr("y", labelBBox.y - 3);

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
                // .text(d3.timeFormat("%b %d, %H:%M")(closest.timeStamp))
                // .style("display", "block");

            const yText = `${closest.price.toFixed(2)}`;
            yTooltip
                .attr("x", width + 36)
                .attr("y", yPos)
                .text(yText)
                .style("display", "block")
                .attr("font-size", "18px");

            // Get text size and position background accordingly
            const bbox = yTooltip.node().getBBox();
            yTooltipBackground
                .attr("x", bbox.x - 5)
                .attr("y", bbox.y - 2)
                .attr("width", bbox.width + 10)
                .attr("height", bbox.height + 4)
                .style("display", "block");
        });

         // ---- ADD HORIZONTAL GRID LINES ----
    const xGrid = svg.append("g")
    .attr("class", "grid")
    .call(
        d3.axisTop(x)
            .ticks(6) 
            .tickSize(-height)
            .tickFormat("") // Remove text labels
    );

    xGrid.selectAll("line")
        .attr("stroke", "#ddd")
        .attr("stroke-opacity", 1)

    xGrid.select(".domain").remove(); // Remove the Y-axis line

}, [data]);

    
    return <svg ref={chartRef}></svg>;
  };
  
  export default AreaChart;