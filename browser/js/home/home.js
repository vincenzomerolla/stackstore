'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/home/home.html'
    });

});

app.controller('HomeCtrl', function ($scope, Product) {
    Product.query().$promise.then(function (products) {

        var platform_Array = [];
        var number_run = products.length;
        var number_show = 4;
        var platforms = ['PlayStation 3','PlayStation 4', 'Xbox 360', 'Xbox One', 'Nintendo Wii U']
        var show_Platform = platforms[Math.floor(Math.random() * 5)];

        //contains random games by platform selected
        var return_Array = [];

        //puts all xbox one games in platform_Array
        for (var i = 0; i < number_run; i++){
            if (products[i].platform === show_Platform) {
                platform_Array.push(products[i]);
            }
        }

        for (var i = 0; i < number_show; i++) {

            var final_Game = platform_Array[Math.floor(Math.random() * (platform_Array.length - 1)) + 1];

            if (return_Array.indexOf(final_Game) === -1) {
                return_Array.push(final_Game);
            }else{
                i--;
            }
        }
        $scope.products = return_Array;
    });
});

