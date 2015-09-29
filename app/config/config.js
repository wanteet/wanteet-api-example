'use strict';

angular.module('wanteet-api-example').run(['$http', 'data-service',
    function ($http, dataService) {

        delete $http.defaults.headers.common['X-Requested-With'];
        if (dataService.user) {
            $http.defaults.headers.common['X-Auth-Token'] = dataService.user.accessToken;
            $http.defaults.headers.common['X-Market-ID'] = dataService.market.slug || 'wanteet';
        }
    }
]);

angular.module('wanteet-api-example').config(['localStorageServiceProvider',
  function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('wanteet-api-example');
  }
]);
