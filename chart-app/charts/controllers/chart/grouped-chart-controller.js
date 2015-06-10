var grpChartControllers = angular.module('grpChartControllers', [])

grpChartControllers.controller('grpChartCtrl', ['$scope', function ($scope) {

    var data = [
    { "YEAR": 2012, "MONTH": 1, "Supplier": "BAHUNIA", "Supplier Total": 30, "Apr 15": 21, "Mar 15": 21, "Feb 15": 7, "Jan 15": 2 },
    { "YEAR": 2012, "MONTH": 2, "Supplier": "KAPINDDEL", "Supplier Total": 54, "Apr 15": 21, "Mar 15": 28, "Feb 15": 20, "Jan 15": 6 },
    { "YEAR": 2012, "MONTH": 3, "Supplier": "RAKSOOSHA", "Supplier Total": 39, "Apr 15": 21, "Mar 15": 25, "Feb 15": 12, "Jan 15": 2 },
    { "YEAR": 2012, "MONTH": 4, "Supplier": "FLORIKCAN", "Supplier Total": 27, "Apr 15": 34, "Mar 15": 21, "Feb 15": 6, "Jan 15": 0 },
    { "YEAR": 2012, "MONTH": 5, "Supplier": "SASDKKSHA", "Supplier Total": 35, "Apr 15": 1, "Mar 15": 21, "Feb 15": 12, "Jan 15": 2 },
    { "YEAR": 2012, "MONTH": 6, "Supplier": "LAFKRESAM", "Supplier Total": 15, "Apr 15": 21, "Mar 15": 10, "Feb 15": 4, "Jan 15": 1 }];

    function init() {
        json_data = data

        var margin = { top: 20, right: 20, bottom: 30, left: 40 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var x0 = d3.scale.ordinal()
            .rangeRoundBands([0, width], 0.5);

        //  Constructs a new ordinal scale with an empty domain and an empty range.
        //  The ordinal scale is invalid (always returning undefined) until an output range is specified).

        var x1 = d3.scale.ordinal();

        //  Information on linear scales can be found at: https://github.com/mbostock/d3/wiki/Quantitative-Scales
        //  Quantitative scales have a continuous domain, such as the set of real numbers, or dates.
        //  Linear scales are a type of quantitative scale.
        //  Linear scales are the most common scale, and a good default choice to map a continuous input domain to a
        //      continous output range.
        //  The mapping is linear in that the output range value y can be expressed as a linear function of the
        //      input domain value x: y = mx + b.
        //  The input domain is typically a dimension of the data that you want to visualize, such as the height of
        //      students (measured in meters) in a sample population.
        //  The output range is typically a dimension of the desired output visualization, such as the height of bars
        //      (measured in pixels) in a histogram.

        //  This will set up our y height scale.
        var y = d3.scale.linear()
            .range([height, 0]);

        // Colors of the graph.
        //
        // First    : Total Containers #097054 (green)
        // Second   : Completed Containers #6599FF (blue)
        // Third    : Cancelled Containers #FFDE00 (yellow)
        // Fourth   : Aborted Containers #FF9900 (orange)

        var color = d3.scale.ordinal()
            .range(["#097054", "#6599FF", "#FFDE00", "#FF9900"]);

        //  Set up the xAxis to use our x0 scale and be oriented on the bottom.
        var xAxis = d3.svg.axis()
            .scale(x0)
            .orient("bottom");
        // We don't worry about tickFormat here, as the ticks will be determined by the data.

        //  Set up the yAxis to use our y scale and be oriented on the left.
        //      Additionally, set the tick format to display appropriate labels on the axis (taking out for now).
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");
        //.tickFormat(d3.format(".2s");

        // Set up the svg canvas with the width and height we calculated earlier.
        var svg = d3.select("#vis").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        data = json_data

        // Setup the series Jan 15,Feb 15,Mar 15,Apr 15

        var seriesNames = d3.keys(data[0]).filter(function (key) {
            return (key !== "YEAR") && (key !== "MONTH") && (key !== "Supplier");
        });


        data.forEach(function (d) {

            d.Containers = seriesNames.map(function (name) { return { name: name, value: +d[name] }; });
            //alert("hi --- " + JSON.stringify(d.Containers));
        });
        debugger;
        //alert(JSON.stringify(data));

        //x0.domain(data.map(function (d) { return d.State; }));
        // Change State to be MMM, YEAR (for example: "Jan 2012") Could change this to Jan '12
        x0.domain(data.map(function (d) { return d.Supplier + " "; }));
        //alert(JSON.stringify(data.map(function (d) { return d.MMM + " " + d.YEAR; })));

        //                //x1.domain(seriesNames).rangeRoundBands([0, x0.rangeBand()]);
        x1.domain(seriesNames).rangeRoundBands([0, x0.rangeBand()]);


        // Make the y domain go from 0 up to the max of d.Total (Total Containers)

        y.domain([0, (10 + d3.max(data, function (d) {
            return d3.max(d.Containers,
                function (d) {
                    return d.value;
                });
        })
        )]);


        d3.select(window).on('resize', function () {
            debugger;
            // update width
            width = parseInt(d3.select('#vis').style('width'), 10);
            width = width - margin.left - margin.right;

            // reset x range
            debugger;
            xScale.range([0, width]);
        });

        // Set the xAxis

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("x", width)
        .attr("y", margin.bottom - 50)
        .attr("transform", "rotate(0)")
        .style("text-anchor", "end")
        .attr("dx", ".100em")
        .text("Suppliers");

        //Set the yAxis

        svg.append("g")
            .attr("class", "axis")
            .call(yAxis)

         // append no of containers in y axis top

        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -80)
            .attr("y", 20)
            .attr("dx", ".71em")
            .style("text-anchor", "end")
            .text("# of Containers");


        // From this point to...



        var state = svg.selectAll(".state")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", function (d) { return "translate(" + x0(d.Supplier + " ") + ",0)"; });



        /* form the bars (rect) over x axis*/

        state.selectAll("rect")
            .data(function (d) { return d.Containers; })
        .enter().append("rect")
            .attr("width", x1.rangeBand())
            .attr("x", function (d) { return x1(d.name); })
            .attr("y", function (d) { return y(d.value); })
            .attr("height", function (d) { return height - y(d.value); })
            .style("fill", function (d) { return color(d.name); });


        /*setting the legend*/

        var legend = svg.selectAll(".legend")
            .data(seriesNames.slice().reverse())
            .enter().append("g")
            .attr("class", "legend")

            .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color)
        .style("border-radius", "8px");

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".455em")
            .style("text-anchor", "end")
            .text(function (d) { return d; })
            .on("click", function (d) {
                //alert(d);
            });
    }
    init();


}]);