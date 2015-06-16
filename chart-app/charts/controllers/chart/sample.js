var sampleControllers = angular.module('sampleControllers', []);

sampleControllers.controller('sampleCtrl', ['$scope', function ($scope) {
    var data = [
         {
             "date": "2013-01-01",
             "BAHUNIA": "10",
             "KAPINDDEL": "10"
         },
          {
              "date": "2013-02-01",
              "BAHUNIA": "2",
              "KAPINDDEL": "90"
          },
          {
              "date": "2013-03-01",
              "BAHUNIA": "10",
              "KAPINDDEL": "40"
          },
          {
              "date": "2013-04-01",
              "BAHUNIA": "10",
              "KAPINDDEL": "40"
          },
          {
              "date": "2013-05-01",
              "BAHUNIA": "50",
              "KAPINDDEL": "95"
          },
          {
              "date": "2013-06-01",
              "BAHUNIA": "2",
              "KAPINDDEL": "90"
          },
          {
              "date": "2013-07-01",
              "BAHUNIA": "10",
              "KAPINDDEL": "40"
          },
          {
              "date": "2013-08-01",
              "BAHUNIA": "10",
              "KAPINDDEL": "40"
          },
          {
              "date": "2013-09-01",
              "BAHUNIA": "10",
              "KAPINDDEL": "40"
          },
          {
              "date": "2013-10-01",
              "BAHUNIA": "10",
              "KAPINDDEL": "40"
          },
          {
              "date": "2013-11-01",
              "BAHUNIA": "10",
              "KAPINDDEL": "40"
          },
         {
             "date": "2013-12-01",
             "BAHUNIA": "1300",
             "KAPINDDEL": "140"
         },
         {
             "date": "2014-01-01",
             "BAHUNIA": "10",
             "KAPINDDEL": "40"
         },
          {
              "date": "2014-02-01",
              "BAHUNIA": "10",
              "KAPINDDEL": "40"
          },
         {
             "date": "2014-03-01",
             "BAHUNIA": "1300",
             "KAPINDDEL": "140"
         },
         {
             "date": "2014-02-01",
             "BAHUNIA": "10",
             "KAPINDDEL": "40"
         },
         {
             "date": "2014-03-01",
             "BAHUNIA": "1300",
             "KAPINDDEL": "140"
         },
         {
             "date": "2014-02-01",
             "BAHUNIA": "10",
             "KAPINDDEL": "40"
         },
         {
             "date": "2014-03-01",
             "BAHUNIA": "1300",
             "KAPINDDEL": "140"
         },
         {
             "date": "2014-02-01",
             "BAHUNIA": "10",
             "KAPINDDEL": "40"
         },
         {
             "date": "2014-03-01",
             "BAHUNIA": "1300",
             "KAPINDDEL": "140"
         },
     {
         "date": "2014-04-01",
         "BAHUNIA": "10",
         "KAPINDDEL": "10"
     },
          {
              "date": "2014-05-01",
              "BAHUNIA": "2",
              "KAPINDDEL": "90"
          },
          {
              "date": "2014-06-01",
              "BAHUNIA": "10",
              "KAPINDDEL": "40"
          },
          {
              "date": "2014-07-01",
              "BAHUNIA": "10",
              "KAPINDDEL": "40"
          },
          {
              "date": "2014-08-01",
              "BAHUNIA": "50",
              "KAPINDDEL": "95"
          },
          {
              "date": "2014-09-01",
              "BAHUNIA": "2",
              "KAPINDDEL": "90"
          },
          {
              "date": "2014-10-01",
              "BAHUNIA": "10",
              "KAPINDDEL": "40"
          },
          {
              "date": "2014-11-01",
              "BAHUNIA": "10",
              "KAPINDDEL": "40"
          },
          {
              "date": "2014-12-01",
              "BAHUNIA": "10",
              "KAPINDDEL": "40"
          },
          {
              "date": "2015-01-01",
              "BAHUNIA": "10",
              "KAPINDDEL": "40"
          },
          {
              "date": "2015-02-01",
              "BAHUNIA": "10",
              "KAPINDDEL": "40"
          },
         {
             "date": "2015-03-01",
             "BAHUNIA": "1300",
             "KAPINDDEL": "140"
         },
         {
             "date": "2015-04-01",
             "BAHUNIA": "10",
             "KAPINDDEL": "40"
         },
          {
              "date": "2015-05-01",
              "BAHUNIA": "10",
              "KAPINDDEL": "40"
          },
         {
             "date": "2015-06-01",
             "BAHUNIA": "1300",
             "KAPINDDEL": "140"
         },
         {
             "date": "2015-07-01",
             "BAHUNIA": "10",
             "KAPINDDEL": "40"
         },
         {
             "date": "2015-08-01",
             "BAHUNIA": "1300",
             "KAPINDDEL": "140"
         },
         {
             "date": "2015-09-01",
             "BAHUNIA": "10",
             "KAPINDDEL": "40"
         },
         {
             "date": "2015-10-01",
             "BAHUNIA": "1300",
             "KAPINDDEL": "140"
         },
         {
             "date": "2015-11-01",
             "BAHUNIA": "10",
             "KAPINDDEL": "40"
         },
         {
             "date": "2015-12-01",
             "BAHUNIA": "1300",
             "KAPINDDEL": "140"
         }];

    //Create the SVG Viewport selection
    var svg = d3.select("#chart").append("svg")
                                         .attr("width", 400)
                                         .attr("height", 100);

    //Create the Scale we will use for the Axis
    var xScale = d3.scale.ordinal().rangeRoundBands([0, 1000]);;

    xScale.domain(data.map(function (d) {

        return d.date;
    }));


    //Create the Axis
    var xAxis = d3.svg.axis()
        .scale(xScale);

    var xAxisGroup = svg.append("g")
   .call(xAxis)
        .selectAll('text')
    .attr('transform', 'rotate(-65)');


}]);





