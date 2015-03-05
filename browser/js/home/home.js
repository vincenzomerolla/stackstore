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

        var array_Check = []
        for (var i = 0; i < number_run; i++){
            if (products[i].platform === "Xbox One") {
                platform_Array.push(products[i]);
            }
        }


        for (var i = 0; i < number_show; i++) {
            if (return_Array.indexOf(products[i]) === -1) {
                var final_Game = platform_Array[Math.floor(Math.random() * (platform_Array.length - 1)) + 1];
                
                if (return_Array.indexOf(final_Game) === -1) {
                    return_Array.push(final_Game);
                }
            }
        }
        $scope.products = return_Array;
    });
});

