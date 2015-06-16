var multiLineCatController = angular.module('multiLineCatController', []);

multiLineCatController.controller('muliLineCatCtrl', ['$scope', function ($scope) {
    var data = [
          {
              "period": "jan-15",
              "volumes": [
              { "supplier": "BAHUNIA", "volume": 6000 },
              { "supplier": "KAPINDDEL", "volume": 7710 },
              { "supplier": "RAKSOOSHA", "volume": 9300 },
              { "supplier": "FLORIKCAN", "volume": 5400 },
              { "supplier": "SASDKKSHA", "volume": 2280 }
              ]
          },
        {
            "period": "Feb-15",
            "volumes": [
            { "supplier": "BAHUNIA", "volume": 3600 },
            { "supplier": "KAPINDDEL", "volume": 6360 },
            { "supplier": "RAKSOOSHA", "volume": 8400 },
            { "supplier": "FLORIKCAN", "volume": 4500 },
            { "supplier": "SASDKKSHA", "volume": 1320 }
            ]
        },
        {
            "period": "Mar-15",
            "volumes": [
            { "supplier": "BAHUNIA", "volume": 2640 },
            { "supplier": "KAPINDDEL", "volume": 9360 },
            { "supplier": "RAKSOOSHA", "volume": 5970 },
            { "supplier": "FLORIKCAN", "volume": 4740 },
            { "supplier": "SASDKKSHA", "volume": 960 }
            ]
        },
        {
            "period": "Apr-15",
            "volumes": [
            { "supplier": "BAHUNIA", "volume": 360 },
            { "supplier": "KAPINDDEL", "volume": 1020 },
            { "supplier": "RAKSOOSHA", "volume": 690 },
            { "supplier": "FLORIKCAN", "volume": 2340 },
            { "supplier": "SASDKKSHA", "volume": 210 }
            ]
        }
    ]


    /*setting legend array*/
    var legendNames = [];

    for (var i in data) {
        legendNames.push(data[i].period);
    }

    var margin = {
        top: 20,
        right: 80,
        bottom: 30,
        left: 50
    },
    percent = d3.format('%'),
    width = 895 - margin.left - margin.right,
    height = 355 - margin.top - margin.bottom;

    var xScale = d3.scale.ordinal()
        .rangeRoundBands([0, width]);

    var yScale = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.category20();

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

    var lineFunction = d3.svg.line()
        .x(function (d) { return xScale(d.supplier); })
        .y(function (d) { return yScale(d.volume); })
        .interpolate("linear");


    var svg = d3.select("#visualisation").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    color.domain(data.map(function (d) {
        return d.label;
    }));

    data.forEach(function (kv) {
        kv.volumes.forEach(function (d) {

            d.volume = +d.volume;
        });
    });


    var minY = d3.min(data, function (kv) { return d3.min(kv.volumes, function (d) { return d.volume; }) });
    var maxY = d3.max(data, function (kv) { return d3.max(kv.volumes, function (d) { return d.volume; }) });

    xScale.domain(data[0].volumes.map(function (d) { return d.supplier; }));
    yScale.domain([0, 1.3 * (maxY)]);



    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-65)" 
            })
        .append("text")
        .attr("x", width)
        .attr("y", margin.bottom - 50)
        .attr("transform", "rotate()")
        .style("text-anchor", "end")
        .attr("dx", ".100em")
        .text("Suppliers");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Total PO");

    var period = svg.selectAll(".label")
        .data(data)
        .enter().append("g")
        .attr("class", "label");

    period.append("path")
        .attr("class", "lineFunction")
        .attr("d", function (d) {
            return lineFunction(d.volumes);
        })
        .style("stroke", function (d) {
            return color(d.period);
        })
        .style("fill", "none")
        .on("click", function (d) { alert(d.volume) });;

    d3.select(window).on('resize', function () {
       
        // update width
        width = parseInt(d3.select('#visualisation').style('width'), 10);
        width = width - margin.left - margin.right;

        // reset x range
        debugger;
        xScale.range([0, width]);
    });


    /*setting the legend*/

    var legend = svg.selectAll(".legend")
        .data(legendNames.slice().reverse())
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

   

}]);



    
    
