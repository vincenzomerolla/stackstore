'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        controller: 'checkoutCtrl',
        templateUrl: 'js/checkout/checkout.html'

    });
});

app.controller("checkoutCtrl",function($scope){
	$scope.user = 
});