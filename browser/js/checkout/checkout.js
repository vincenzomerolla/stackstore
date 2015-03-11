'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        controller: 'checkoutCtrl',
        templateUrl: 'js/checkout/checkout.html',
        resolve: {
          user: function(AuthService) {
    		return AuthService.getLoggedInUser();
          }
        }
    });
});

app.config(function (stripeProvider) {
  stripeProvider.setPublishableKey('pk_test_80RLXWzoQSYUnhUNJJaKeUiN');
});

app.controller("checkoutCtrl", function ($scope, $state, Cart, Session, user, stripe) {


	$scope.user = user;

	$scope.total = Cart.calculateTotal();

	$scope.modal = {
		"content": $scope.total/100
	}

	$scope.address = {
		street : "5 Hanover Square",
		city : "New York",
		state : "NY",
		zipCode : "10004"
	};

	$scope.payment = {
		card : {
			number : "4242424242424242",
			cvc : "1234",
			exp_month : "11",
			exp_year : "2016"
		}
	};

	//##########################################################
	//Stripe codes in angular 
	$scope.charge = function () {
	return stripe.card.createToken($scope.payment.card)
	  .then(function (token) {
	    console.log('token created for card ending in ', token.card.last4);
	    var payment = angular.copy($scope.payment);
	    payment.card = void 0;
	    payment.stripeToken = token.id;
	    payment.total = $scope.total;
	    payment.userId = Session.user._id;
	    payment.products = $scope.list_of_products;
	    payment.address = $scope.address;
	    return $http.post('api/stripe', payment);
	  })
	  .then(function (payment) {
	    console.log('successfully submitted payment');
	    Cart.empty();
	    $state.go('user')
	  })
	  .catch(function (err) {
	    if (err.type && /^Stripe/.test(err.type)) {
	      console.log('Stripe error: ', err.message);
	      $scope.error = err;
	    }
	    else {
	      console.log('Other error occurred, possibly with your API', err.message);
	      $scope.error = err;
	    }
	  });
	};


	//##########################################################

	//##########################################################
	//Stripe codes

	// $scope.submitPayment = function(){
	//     var $form = $('#payment-form');
	//     Stripe.card.createToken($form, stripeResponseHandler);

	// 	function stripeResponseHandler(status, response) {
	// 	  var $form = $('#payment-form');

	// 	  if (response.error) {
	// 	    // Show the errors on the form
	// 	    $form.find('.payment-errors').text(response.error.message);
	// 	    $form.find('button').prop('disabled', false);
	// 	  } else {
	// 	    // response contains id and card, which contains additional card details
	// 	    var token = response.id;
	// 	    // Insert the token into the form so it gets submitted to the server
	// 	    //add stripeToken
	// 	    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
	// 	    //add total amount to be paid
	// 	    $form.append($('<input type="hidden" name="total" />').val($scope.total));
	// 	    //append userId
	// 	    $form.append($('<input type="hidden" name="userId" />').val(Session.user._id));
	// 	    //append products being paid
	// 	    $form.append($('<input type="hidden" name="products" />').val(JSON.stringify($scope.list_of_products)));
	// 	    //submit
	// 	    Cart.empty();
	// 	    $form.get(0).submit();
	// 	  }
	// 	};
	// };

	//#########################################################
});