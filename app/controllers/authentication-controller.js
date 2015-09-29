angular.module('wanteet-api-example').controller('authentication-controller',
['$scope', '$http', 'data-service', '$state',
  function($scope, $http, dataService, $state){

    // If user is signed in then redirect to Place-Request
    if(dataService.user) $state.go('place-request');

		$scope.signin = function() {
      $scope.errorMessage = "";
			$http.post(dataService.api.basePath + '/login',
      $scope.credentials, {'X-Market-ID' : 'wanteet'}).success(function (response) {
				// If successful save the response
				dataService.store.save('currentUser',response);
        console.log(dataService.user);
        // And redirect to place-request
				$state.go('place-request');
			}).error(function(response) {
				$scope.errorMessage = "Invalid Email or Password!";
			});
  }
}
]);
