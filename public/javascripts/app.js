var App = angular.module('D3jsApp', []);

App.controller('D3jsController', function ($scope, $http) {
  $scope.bars = function(data) {
    var dataset = data;
    var width = 600;
    var height = 600;

    var widthScale = d3.scale.linear()
                      .domain([0, 450])
                      .range([0, width]);

    var color = d3.scale.linear()
                      .domain([0, 450])
                      .range(["red", "blue"]);

    var axis = d3.svg.axis()
                .scale(widthScale);

    var canvas = d3.select("body")
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height);

    var bar = canvas.selectAll("g")
                .data(dataset)
                .enter()  // loop
                  .append("g")
                    .attr("transform", function(value, index) {
                        return "translate(10," + index * 45 + ")";
                    });

    bar.append("rect")
      .attr("width", function(value) {
        return widthScale(value);
      })
      .attr("height", 30)
      .attr("fill", function (value) {
        return color(value);
      });

    bar.append("text")
      .attr("x", function(value) {
        return widthScale(value + 4);
      })
      .attr("y", 40 / 2)
      .style("font-family", "Verdana")
      .text(function(value){
        return value
      });
  };

  // $scope.bars();

  $http({
    method: 'GET',
    url: '/array.txt'
  }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available

      console.log(response)

      // $scope.bars(response.data);

      
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.

      console.log('something wrong')
    });
});