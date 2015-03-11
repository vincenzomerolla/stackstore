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

        var get_all_games = function(platform_Select) {
            var platform_Array = [];
            var number_run = products.length;
            var number_show = 4;
            var platforms = ['PlayStation 3', 'PlayStation 4', 'Xbox 360', 'Xbox One', 'Nintendo Wii U']
            //var show_Platform = platforms[Math.floor(Math.random() * 5)];
            var show_Platform = platform_Select;

            function setPlatform(platform) {
                return show_Platform = platform;
            }

            //contains random games by platform selected
            var return_Array = [];

            //puts all games in platform_Array
            for (var i = 0; i < number_run; i++) {
                if (products[i].platform === show_Platform) {
                    platform_Array.push(products[i]);
                }
            }

            for (var i = 0; i < number_show; i++) {

                var final_Game = platform_Array[Math.floor(Math.random() * (platform_Array.length - 1)) + 1];

                if (return_Array.indexOf(final_Game) === -1) {
                    return_Array.push(final_Game);
                } else {
                    i--;
                }
            }
            return return_Array;
        }

        $scope.platform = 'Nintendo Wii U';

        //unique games this load
        $scope.ps3 = get_all_games('PlayStation 3');
        $scope.ps4 = get_all_games('PlayStation 4');
        $scope.xbox360 = get_all_games('Xbox 360');
        $scope.xbox1 = get_all_games('Xbox One');
        $scope.nintendo = get_all_games('Nintendo Wii U');

        $scope.setPlatform = function(platform_Name){
            $scope.platform = platform_Name;
        }

        $scope.getPlatform = function(){
            if ($scope.platform === 'Nintendo Wii U') {
                return nintendo
            }
        }

        $scope.object = {
            'PlayStation 3': $scope.ps3,
            'PlayStation 4': $scope.ps4,
            'Xbox 360': $scope.xbox360,
            'Xbox One': $scope.xbox1,
            'Nintendo Wii U': $scope.nintendo
        }

    });
});

