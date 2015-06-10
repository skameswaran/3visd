var stackedBarControllers = angular.module("stackedBarControllers", []);
stackedBarControllers.controller('stackedCtrl', ['$scope', function ($scope) {

    var crimea = [
        {

            "dateFormated": "KAPINDDEL",
            "Jan-11": "10",
            "Feb-11": "10",
            "Mar-11": "10"
        },
         {

             "dateFormated": "SRPTYRBNE",
             "Jan-11": "20",
             "Feb-11": "20",
             "Mar-11": "10"
         },
         {

             "dateFormated": "SPOTLIMEL",
             "Jan-11": "30",
             "Feb-11": "30",
             "Mar-11": "10"
         },
         {
             "date": "2013-04-01",
             "dateFormated": "MITINTDEL",
             "Jan-11": "40",
             "Feb-11": "40",
             "Mar-11": "10"
         },
         {

             "dateFormated": "CITCEABNE",
             "Jan-11": "50",
             "Feb-11": "10",
             "Mar-11": "10"
         },
         {

             "dateFormated": "MELDALBNE",
             "Jan-11": "60",
             "Feb-11": "60",
             "Mar-11": "10"
         }
    ];

    var colorArray = ['green', 'grey', 'blue'];

    var margin = { top: 100, right: 10, bottom: 20, left: 10 },
        width = 700 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom,
        padding = [100, 50, 30, 20],
        xScale = d3.scale.ordinal().rangeRoundBands([0, width - padding[1] - padding[3]]),
        yScale = d3.scale.linear().range([0, height - padding[0] - padding[2]]),
        z = d3.scale.ordinal().range(colorArray),
        parse = d3.time.format("%Y-%m-%d").parse,
        format = d3.time.format("%b %Y");

    var xAxis = d3.svg.axis()
        .scale(xScale);

    var svg = d3.select("#graph-area").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + padding[3] + "," + (height - padding[2]) + ")");

    var legendNames = d3.keys(crimea[0]).filter(function (key) {
        return (key !== "date") && (key !== "dateFormated");
    });

    xScale.domain(crimea.map(function (d) {

        return d.dateFormated;
    }));



    var xAxisGroup = svg.append("g")
   .call(xAxis)
    .selectAll("text")
        .style("text-anchor", "end")
        .style("font-weight", "bold")
        .style("padding", "10px")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("y", margin.bottom)
        .attr("x", margin.bottom + 25);

    xAxisGroup.style("border", "1px solid red");

    var color_hash = {
        0: ["Jan-11", "green"],
        1: ["Feb-11", "grey"],
        2: ["Mar-11", "blue"]
    }

    z.domain(crimea.map(function (d) {
        return d.dateFormated;
    }));

    // Transpose the data into layers by cause.
    var causes = d3.layout.stack()(legendNames.map(function (cause) {
        return crimea.map(function (d) {
            return { x: d.dateFormated, y: +d[cause] };
        });
    }));

    // Compute the x-domain (by date) and y-domain (by top).
    xScale.domain(causes[0].map(function (d) {

        return d.x;
    }));

    yScale.domain([0, d3.max(causes[causes.length - 1], function (d) {
        return d.y0 + d.y;
    })]);

    // Add a group for each cause.
    var cause = svg.selectAll("g.cause")
        .data(causes)
        .enter().append("g")
        .attr("class", "cause")
        .style("fill", function (d, i) { return z(i); })
        .style("stroke", function (d, i) { return d3.rgb(z(i)).darker(); })


    // Add a rect for each date.

    var rect = cause.selectAll("rect")
        .data(Object)
        .enter().append("rect")
        .attr("x", function (d) { return xScale(d.x); })
        .attr("y", function (d) { return -yScale(d.y0) - yScale(d.y); })
        .attr("height", function (d) { return yScale(d.y); })
        .attr("width", xScale.rangeBand())
        .on("mouseover", function (d) {
            
            tooltip.style("display", "block");
            var xPosition = d3.mouse(this)[0] - 15;
            var yPosition = d3.mouse(this)[1] - 25;
            d3.select(this).attr("stroke", "red").attr("stroke-width", 0.8);
            d3.select(this).style("data-title", d.y);
            //tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            //tooltip.select("text").text(d.y);
            //alert(d.y);
            
        })
        .on("mouseout", function () {
            tooltip.style("display", "none");
        });

    //
    // Prep the tooltip bits, initial display is hidden
    var tooltip = svg.append("g")
      .attr("class", "tooltip")
      .style("display", "none");

    tooltip.append("rect")
      .attr("width", 30)
      .attr("height", 20)
      .attr("fill", "white")
      .style("opacity", 0.5);

    tooltip.append("text")
      .attr("x", 15)
      .attr("dy", "1.2em")
      .style("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold");

    //Add y-axis rules.

    var rule = svg.selectAll("g.rule")
        .data(yScale.ticks(5))
      .enter().append("svg:g")
        .attr("class", "rule")
        .attr("transform", function (d) { return "translate(0," + -yScale(d) + ")"; });

    rule.append("svg:line")
        .attr("x2", width - padding[1] - padding[3])
        .style("stroke", function (d) { return d ? "#fff" : "#000"; })
        .style("stroke-opacity", function (d) { return d ? .7 : null; });

    rule.append("svg:text")
        .attr("x", width - padding[1] - padding[3] + 6)
        .attr("dy", ".35em")
        .text(d3.format(",d"));


    // add legend   
    var legend = svg.append("g")
	  .attr("class", "legend")
	  .attr("x", width)
	  .attr("y", 10)
	  .attr("height", 50)
	  .attr("width", 300)
	  .attr("transform", "translate(" + (width - (width * 25) / 100) + "," + (height * -1) + ")");

    // add a title for the chart


    svg.append("text")
	   .attr("class", "title")
       .attr("x", 0)
	   .attr("y", (height * -1) + padding[0])
	   .text("Analysis - Total PO vs Suppliers per month");

    legend.selectAll('g').data(legendNames.slice().reverse())
      .enter()
      .append('g')
      .each(function (d, i) {
          var g = d3.select(this);
          g.append("rect")
            .attr("x", i * 60)
            .attr("y", 65)
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", color_hash[String(i)][1]);

          g.append("text")
             .attr("x", i * 60 + 15)
             .attr("y", 73)
             .attr("height", 30)
             .attr("width", 100)
             .style("fill", color_hash[String(i)][1])
             .text(color_hash[String(i)][0]);

      });


}]);

