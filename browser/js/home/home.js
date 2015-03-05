'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/home/home.html'
    });

});

app.controller('HomeCtrl', function ($scope, Product) {
    Product.query().$promise.then(function(products) {

        var platform_Array = [];

        //1-435
        var number_run = 435;

        var number_show = 4;

        //contains random games by platform selected
        var return_Array = [];


        for (var i = 0; i < number_run; i++){
            if (products[i].platform === "Xbox One") {
                platform_Array.push(products[i])
            }
        }


        for (var i = 0; i < number_show; i++) {
            return_Array.push(platform_Array[Math.floor(Math.random() * (platform_Array.length-1)) + 1]);
        }
        $scope.products = return_Array;
    });
});