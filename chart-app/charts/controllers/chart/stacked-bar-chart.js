var stackedBarControllers = angular.module("stackedBarControllers", []);
stackedBarControllers.controller('stackedCtrl', ['$scope', function ($scope) {

    //var crimea = [
    //    {

    //        "Origin": "KAPINDDEL",
    //        "Jan-11": "10",
    //        "Feb-11": "10",
    //        "Mar-11": "10"
    //    },
    //     {

    //         "Origin": "SRPTYRBNE",
    //         "Jan-11": "20",
    //         "Feb-11": "20",
    //         "Mar-11": "10"
    //     },
    //     {

    //         "Origin": "SPOTLIMEL",
    //         "Jan-11": "30",
    //         "Feb-11": "30",
    //         "Mar-11": "10"
    //     },
    //     {
    //         "date": "2013-04-01",
    //         "Origin": "MITINTDEL",
    //         "Jan-11": "40",
    //         "Feb-11": "40",
    //         "Mar-11": "10"
    //     },
    //     {

    //         "Origin": "CITCEABNE",
    //         "Jan-11": "",
    //         "Feb-11": "10",
    //         "Mar-11": "10"
    //     },
    //     {

    //         "Origin": "MELDALBNE",
    //         "Jan-11": "60",
    //         "Feb-11": "60",
    //         "Mar-11": "10"
    //     }
    //];

    var crimea = [];
    crimea = [
        {
            "APR2015": "1",
            "FEB2015": "3",
            "JAN2015": "4",
            "JUN2015": "7",
            "MAR2015": "8",
            "MAY2015": "3",
            "ORIGIN": "US"
        },
        {
            "APR2015": "3",
            "FEB2015": "2",
            "JAN2015": "6",
            "JUN2015": "7",
            "MAR2015": "1",
            "MAY2015": " 9",
            "ORIGIN": "IN"
        }
    ];

    var colorArray = ['green', 'grey', 'blue', 'lime', 'cyan', 'brown'];

    var colorArrayLegend = [

        ["APR2015", "green"],
        ["FEB2015", "grey"],
        ["JAN2015", "blue"],
        ["JUN2015", "lime"],
        ["MAR2015", "cyan"],
        ["MAY2015", "brown"]
    ];

    var color_hash = {
        0: ["APR2015", "green"],
        1: ["FEB2015", "grey"],
        2: ["JAN2015", "blue"],
        3: ["JUN2015", "lime"],
        4: ["MAR2015", "cyan"],
        5: ["MAY2015", "brown"]
    }

    var margin = { top: 100, right: 10, bottom: 20, left: 10 },
        width = 700 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom,
        padding = [100, 50, 30, 20],
        xScale = d3.scale.ordinal().rangeRoundBands([0, width - padding[1] - padding[3]]),
        yScale = d3.scale.linear().range([0, height - padding[0] - padding[2]]),
        color = d3.scale.ordinal().range(['green', 'grey', 'blue', 'lime', 'cyan', 'brown'])
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
        return (key !== "date") && (key !== "ORIGIN");
    });

    xScale.domain(crimea.map(function (d) {

        return d.ORIGIN;
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



    z.domain(crimea.map(function (d) {
        return d.ORIGIN;
    }));

    // Transpose the data into layers by cause.
    var causes = d3.layout.stack()(legendNames.map(function (cause) {
        return crimea.map(function (d) {
            return { x: d.ORIGIN, y: +d[cause] };
        });
    }));

    // Compute the x-domain (by date) and y-domain (by top).
    xScale.domain(causes[0].map(function (d) {
        console.log(d);
        return d.x;
    }));

    yScale.domain([0, d3.max(causes[causes.length - 1], function (d) {
        return d.y0 + d.y;
    })]);

    console.log(causes);
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

        .on("mouseenter", function (d) {

            var stack = d3.select(this);
            stack.attr("stroke", "red").attr("stroke-width", 1);
            stack.attr("title", d.y)
            $(stack).tooltip({
                tooltipClass: "stacked-bar-tip"
            });

        })
        .on("focus", function (d) {

            var stack = d3.select(this);
            stack.attr("title", d.y)
            $(stack).tooltip({
                tooltipClass: "stacked-bar-tip"
            });

        })
		.on("mouseout", function () {

		    svg.select(".tooltip").remove();
		    d3.select(this).attr("stroke", "pink").attr("stroke-width", 0.2);

		});





    //Add y-axis rules.

    var rule = svg.selectAll("g.rule")
        .data(yScale.ticks(5))
      .enter().append("svg:g")
        .attr("class", "rule")
        .attr("transform", function (d) { return "translate(0," + -yScale(d) + ")"; });

    //rule.append("svg:line")
    //    .attr("x2", width - padding[1] - padding[3])
    //    .style("stroke", function (d) { return d ? "#fff" : "#000"; })
    //    .style("stroke-opacity", function (d) { return d ? .7 : null; });

    rule.append("svg:text")
        .attr("x", width - padding[1] - padding[3] + 6)
        .attr("dy", ".35em")
        .text(d3.format(",d"));


    //// add legend   
    //var legend = svg.append("g")
    //  .attr("class", "legend")
    //  .attr("x", width)
    //  .attr("y", 10)
    //  .attr("height", 50)
    //  .attr("width", 300)
    //  .attr("transform", "translate(" + (width - (width * 50) / 100) + "," + (height * -1) + ")");

    // add a title for the chart


    svg.append("text")
	   .attr("class", "title")
       .attr("x", 0)
	   .attr("y", (height * -1) + padding[0])
	   .text("Analysis - Total PO vs Suppliers per month");

    //legend.selectAll('g').data(legendNames.slice().reverse())
    //  .enter()
    //  .append('g')
    //  .each(function (d, i) {
    //      var g = d3.select(this);
    //      g.append("rect")
    //        .attr("x", i * 60)
    //        .attr("y", 65)
    //        .attr("width", 10)
    //        .attr("height", 10)
    //        .style("fill", color_hash[String(i)][1]);

    //      g.append("text")
    //         .attr("x", i * 60 + 15)
    //         .attr("y", 73)
    //         .attr("height", 30)
    //         .attr("width", 100)
    //         .style("fill", color_hash[String(i)][1])
    //         .text(color_hash[String(i)][0]);

    //  });


    // add legend   

    //Legend related code
    var legend = svg.selectAll(".legend")
      .data(z.domain().slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
     .attr("transform", function (d, i) { return "translate(" + ((i * 50) + (width / 2) - 25) + "," + (-margin.top) + ")"; });

    legend.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", z);
    legend.append("text")
      .attr("dx", -4)
      .attr("dy", ".8em")
      .style("text-anchor", "end")
      .text(function (d) { return d; });


}]);

stackedBarControllers.controller('stackedCtrl2', ['$scope', function ($scope) {

    var margin = { top: 60, right: 20, bottom: 100, left: 100 },
     width = 600 - margin.left - margin.right,
     height = 400 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
    .rangeRoundBands([0, width - 100], .1); //width-100 to make room for the legend.

    var y = d3.scale.linear()
    .rangeRound([height, 0]);

    var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    //.range(["#1f77b4", "#ff7f0e", "d62728"]); //blue, orange, red
    //color code for Progress Report
    //.range(["#00FFFF","#00FF00","#990099","#FF0000","#FFFF00"]);

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

    var svg = d3.select("#graph-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    //var data = [{ "Commodity": "Base", "num_complete_print": "3", "num_incomplete_print": 15 }, { "Commodity": "Blade", "num_complete_print": "1", "num_incomplete_print": 53 }, { "Commodity": "DTE", "num_complete_print": "1", "num_incomplete_print": 17 }, { "Commodity": "HUB", "num_complete_print": "0", "num_incomplete_print": "18" }, { "Commodity": "MH", "num_complete_print": "0", "num_incomplete_print": "18" }, { "Commodity": "Mid", "num_complete_print": "0", "num_incomplete_print": 18 }, { "Commodity": "Top", "num_complete_print": "0", "num_incomplete_print": 18 }];


    var data = [];
    data = [
        {
            "APR2015": "1",
            "FEB2015": "3",
            "JAN2015": "4",
            "JUN2015": "7",
            "MAR2015": "8",
            "MAY2015": "3",
            "ORIGIN": "US"
        },
        {
            "APR2015": "3",
            "FEB2015": "2",
            "JAN2015": "6",
            "JUN2015": "7",
            "MAR2015": "4",
            "MAY2015": " 2",
            "ORIGIN": "IN"
        }
    ];

    color.domain(d3.keys(data[0]).filter(function (key) { return key !== "ORIGIN"; }));

    data.forEach(function (d) {
        var y0 = 0;
        d.months = color.domain().map(function (months) { return { months: months, y0: y0, y1: y0 += +d[months] }; });
        d.total = d.months[d.months.length - 1].y1;
    });

    //use this to sort the bars from largest to smallest
    //data.sort(function(a, b) { return b.total - a.total; });

    x.domain(data.map(function (d) { return d.ORIGIN; }));
    y.domain([0, d3.max(data, function (d) { return d.total; })]);

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")  //added this line through rotate to change orientation of x axis
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-1em")
    .attr("transform", function (d) {
        return "rotate(-90)"
    });

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");
    //  .text("Population");

    //grid lines  y.ticks controls the number of lines
    svg.selectAll("line.horizontalGrid").data(y.ticks(10)).enter()
    .append("line")
    .attr(
        {
            "class": "horizontalGrid",
            "x1": 0,
            "x2": width - 60,
            "y1": function (d) { return y(d); },
            "y2": function (d) { return y(d); },
            "fill": "none",
            "shape-rendering": "crispEdges",
            "stroke": "grey",
            "stroke-width": "1px"
        });

    var state = svg.selectAll(".state")
    .data(data)
    .enter().append("g")
    .attr("class", "g")
    .attr("transform", function (d) { return "translate(" + x(d.ORIGIN) + ",0)"; });

    state.selectAll("rect")
    .data(function (d) { return d.months; })
    .enter().append("rect")
    .attr("width", x.rangeBand())
    .attr("y", function (d) { return y(d.y1); })
    .attr("height", function (d) { return y(d.y0) - y(d.y1); })
    .style("fill", function (d) { return color(d.months); })
    .on("mouseenter", function (d) {
        debugger
        var stack = d3.select(this);
        stack.attr("stroke", "red").attr("stroke-width", 1);
        stack.attr("title", d.y1 - d.y0)
        $(stack).tooltip({
            tooltipClass: "stacked-bar-tip"
        });

    })
        .on("focus", function (d) {
            debugger
            var stack = d3.select(this);
            stack.attr("title", d.y1 - d.y0)
            $(stack).tooltip({
                tooltipClass: "stacked-bar-tip"
            });

        });

    var legend = svg.selectAll(".legend")
    .data(color.domain().slice().reverse())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

    legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function (d) { return d; });

    //Added y label 10/28
    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -60)
    .attr("x", -70)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Number Of Components");

    //Add Title
    svg.append("text")
    .attr("x", (width / 2))//(width / 2))             
    .attr("y", -20) //0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("text-decoration", "underline")
    .text("Inspection Progress Report");

    state.selectAll("text")
    .data(function (d) { return d.months; })
    .enter()
    .append("text")
    .attr("x", x.rangeBand() / 2)
    .attr("y", function (d, i) { return y(d.y1) + (y(d.y0) - y(d.y1)) / 2; })
    .style("text-anchor", "middle")
    //.text(function(d) {return d.total; })
    .text("sample")


}]);

