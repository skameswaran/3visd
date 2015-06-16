var multiChartControllers = angular.module('multiChartControllers', [])

multiChartControllers.controller('multiChartCtrl', ['$scope', function ($scope) {


    var data = [
    {
        "buyer": "SRPTYRBNE",
        "data": [
            {
                "sale": "202",
                "year": "2000"
            },
            {
                "sale": "215",
                "year": "2001"
            },
            {
                "sale": "179",
                "year": "2002"
            },
            {
                "sale": "199",
                "year": "2003"
            },
            {
                "sale": "154",
                "year": "2004"
            },
            {
                "sale": "176",
                "year": "2010"
            }
        ]
    },
    {
        "buyer": "MITINTDEL",
        "data": [
            {
                "sale": "213",
                "year": "2000"
            },
            {
                "sale": "156",
                "year": "2001"
            },
            {
                "sale": "135",
                "year": "2002"
            },
            {
                "sale": "178",
                "year": "2003"
            },
            {
                "sale": "200",
                "year": "2004"
            },
            {
                "sale": "197",
                "year": "2010"
            }
        ]
    }
    ];

    var colors = ['#ff0000', '#00ff00', '#0000ff'];

    function InitChart() {
        
        /* 
            use d3.select method to set properties of 
            visualisationMultiChart SVG
        */

        var vis = d3.select("#visualisationMultiChart"),
                WIDTH = 1000,
                HEIGHT = 500,
                MARGINS = {
                    top: 20,
                    right: 30,
                    bottom: 30,
                    left: 50
                },
         xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([2000, 2010]),
         yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([134, 215]),
         xAxis = d3.svg.axis().scale(xScale),
         yAxis = d3.svg.axis().scale(yScale).orient("left");
        vis.append("svg:g")
           .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
           .call(xAxis);
        vis.append("svg:g")
        .call(yAxis);
        vis.append("svg:g")
          .attr("transform", "translate(" + (MARGINS.left) + ",0)")
          .call(yAxis);

        // Create a line

        for (var item in data) {
            debugger;
            var lineGen = d3.svg.line()
                          .x(function (d) {
                              return xScale(d.year);
                          })
                          .y(function (d) {
                              return yScale(d.sale);
                          });

            vis.append('svg:path')
                  .attr('d', lineGen(data[item].data))
                  .attr('stroke', colors[item])
                  .attr('stroke-width', 2)
                  .attr('fill', 'none');
        }


    }

    InitChart();


}]);