angular.module('wanteet-api-example').controller('buyer-request-controller',
['$scope', '$http', 'data-service', '$state',
  function($scope, $http, dataService, $state){

    // If user is not signed in then redirect to Login screen
    console.log(dataService.user);
    if(!dataService.user) $state.go('home');

    $scope.requests = [];
    $scope.request = {};
    $scope.service = dataService.market.services[0];
    $scope.formState = 'loading';
    $scope.step = 1;

    $scope.init = function(){

      //Fetch questions for the service
      $http.get(dataService.api.publicPath + "/services/"
      + $scope.service + "/questions")
      .success(function(response){
          $scope.questions = response.results;
          $scope.formState ='';
      });

    }

		$scope.placeRequest = function() {

      $http.post(dataService.api.basePath + '/login',
      $scope.credentials).success(function (response) {
				// If successful save the response
				dataService.store.save('currentUser',response);
        // And redirect to place-request
				$state.go('place-request');
			}).error(function(response) {
				$scope.errorMessage = "Invalid Email or Password!";
			});
    }

    $scope.getRequests = function(){

    }

    $scope.getRequest = function(){

    }

    $scope.acceptOffer = function(){

    }


}
]);
