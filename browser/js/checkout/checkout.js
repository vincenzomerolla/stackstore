'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        controller: 'checkoutCtrl',
        templateUrl: 'js/checkout/checkout.html'
    });
});

app.controller("checkoutCtrl",function($scope){

	$scope.calculateTotal = function(){
		//Total should be in cents
		return 10000
	}

	$scope.total = $scope.calculateTotal();

	$scope.modal = {
		"title":"Pay with Credit Card",
		"content": $scope.total/100
	}
	//##########################################################
	//Stripe codes
	Stripe.setPublishableKey('pk_test_80RLXWzoQSYUnhUNJJaKeUiN');

	$scope.submitPayment = function(){
	    var $form = $('#payment-form');
	    Stripe.card.createToken($form, stripeResponseHandler);

		function stripeResponseHandler(status, response) {
		  var $form = $('#payment-form');

		  if (response.error) {
		    // Show the errors on the form
		    $form.find('.payment-errors').text(response.error.message);
		    $form.find('button').prop('disabled', false);
		  } else {
		    // response contains id and card, which contains additional card details
		    var token = response.id;
		    // Insert the token into the form so it gets submitted to the server
		    //add stripeToken
		    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
		    //add total amount to be paid
		    $form.append($('<input type="hidden" name="total" />').val($scope.total));
		    console.log($form.get(0))
		    // and submit
		    $form.get(0).submit();
		  }
		};
	};

	//#########################################################
});