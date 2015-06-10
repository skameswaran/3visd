var chartControllers = angular.module('chartControllers', [])

chartControllers.controller('chartCtrl', ['$scope', function ($scope) {


    function InitChart() {

        var data = [

                {
                    "$id": "1",
                    "EdmxId": "c4d55ab3-9235-4c3d-9838-223fdfffb516",
                    "BuyerCode": "TAMENTLAK",
                    "SupplierCode": "LADTRIANA",
                    "Origin": "IN",
                    "Destination": "AE",
                    "Carrier": null,
                    "PoCount": 3,
                    "Month": "January",
                    "Year": 2015,
                    "Period": 201506
                },
                {
                    "$id": "2",
                    "EdmxId": "fedff2c3-4423-4a88-9cf3-9d2c9e4ba4b3",
                    "BuyerCode": "TAMENTLAK",
                    "SupplierCode": "LADTRIANA",
                    "Origin": "IN",
                    "Destination": "AU",
                    "Carrier": null,
                    "PoCount": 5,
                    "Month": "Febraury",
                    "Year": 2015,
                    "Period": 201506
                },
                {
                    "$id": "3",
                    "EdmxId": "24490e92-97ba-477b-888f-e62a97417757",
                    "BuyerCode": "TAMENTLAK",
                    "SupplierCode": "LADTRIANA",
                    "Origin": "IN",
                    "Destination": "MY",
                    "Carrier": null,
                    "PoCount": 1,
                    "Month": "March",
                    "Year": 2015,
                    "Period": 201506
                },
                {
                    "$id": "4",
                    "EdmxId": "66ae2dc9-759a-4534-8f31-8ceb30a5a1c9",
                    "BuyerCode": "TAMENTLAK",
                    "SupplierCode": "LADTRIANA",
                    "Origin": "IN",
                    "Destination": "LK",
                    "Carrier": null,
                    "PoCount": 10,
                    "Month": "April",
                    "Year": 2015,
                    "Period": 201506
                },
                {
                    "$id": "5",
                    "EdmxId": "66ae2dc9-759a-4534-8f31-8ceb30a5a1c9",
                    "BuyerCode": "TAMENTLAK",
                    "SupplierCode": "LADTRIANA",
                    "Origin": "IN",
                    "Destination": "LK",
                    "Carrier": null,
                    "PoCount": 6,
                    "Month": "May",
                    "Year": 2015,
                    "Period": 201506
                },
                {
                    "$id": "6",
                    "EdmxId": "66ae2dc9-759a-4534-8f31-8ceb30a5a1c9",
                    "BuyerCode": "TAMENTLAK",
                    "SupplierCode": "LADTRIANA",
                    "Origin": "IN",
                    "Destination": "LK",
                    "Carrier": null,
                    "PoCount": 3,
                    "Month": "June",
                    "Year": 2015,
                    "Period": 201506
                }

        ]       


        var margin = {
            top: 20,
            right: 30,
            bottom: 30,
            left: 40
        },

        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        // scale to ordinal because x axis is not numerical
        var xScale = d3.scale.ordinal().rangeRoundBands([0, width], .1);

        //scale to numerical value by height
        var yScale = d3.scale.linear().range([height, 0]);

        var chart = d3.select("#chart")
            //append svg element inside #chart
          .append("svg")
            //set width
          .attr("width", width + (2 * margin.left) + margin.right)
            //set height
          .attr("height", height + margin.top + margin.bottom);


        var xAxis = d3.svg.axis()
          .scale(xScale)
            //orient bottom because x-axis will appear below the bars
          .orient("bottom");

        var yAxis = d3.svg.axis()
          .scale(yScale)
          .orient("left");

        
        xScale.domain(data.map(function (d) {
            return d.Month;
        }))
        .style("color","blue");

        yScale.domain([0, d3.max(data, function (d) {
            return d.PoCount;
        })]);

        var bar = chart.selectAll("g")
          .data(data)
          .enter()
          .append("g")
          .attr("transform", function (d, i) {
              return "translate(" + xScale(d.Month) + ", 0)";
          });

        

        bar.append("rect")
         .attr("y", function (d) {
             return yScale(d.PoCount);
         })
         .attr("x", function (d, i) {
             return xScale.rangeBand();
         })
         .attr("height", function (d) {
             return height - yScale(d.PoCount);
         })
        
           //set width base on range on ordinal data
         .attr("width", width / Math.pow(data.length, data.length/3))
         .style("fill","green");


        /* Code for appending text over the rectangular bar -- starts */

        bar.append("text")
          .attr("x", xScale.rangeBand())
          .attr("y", function (d) {
              return yScale(d.PoCount) - 20;
          })
          .attr("dy", ".75em")
          .text(function (d) {
              return d.PoCount;
          });

        /* Code for appending text over the rectangular bar -- ends */

        chart.append("g")          
          .attr("transform", "translate(" + margin.left + "," + height + ")")
          .call(xAxis);



        

        /*forming y axis */
        chart.append("g")            
            .attr("transform", "translate(" + margin.left + ",0)")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("PoCount");

    }

    InitChart();


}]);