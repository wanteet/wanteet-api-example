'use strict';

angular.module('wanteet-api-example').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        // Redirect to home view when route not found
        $urlRouterProvider.otherwise('/');

        $stateProvider.
            state('sign-in', {
                url: '/',
                controller: 'authentication-controller',
                templateUrl: 'app/views/sign-in.html'
            }).
            state('sign-up', {
                url: '/sign-up',
                controller: 'authentication-controller',
                templateUrl: 'app/views/sign-up.html'
            }).
            state('place-request', {
                url: '/place-request',
                controller: 'buyer-request-controller',
                templateUrl: 'app/views/place-request.html'
            }).
            state('accept-offer', {
                url: '/buyer/requests/:requestId/accept-offer/:offerId',
                controller: 'buyer-request-controller',
                templateUrl: 'app/views/accept-offer.html'
            }).
            state('buyer-requests', {
                url: '/buyer/requests',
                controller: 'buyer-request-controller',
                templateUrl: 'app/views/accept-offer.html'
            }).
            state('buyer-request', {
                url: '/buyer/requests/:requestId',
                controller: 'buyer-request-controller',
                templateUrl: 'app/views/buyer-request.html'
            }).
            state('make-offer', {
                url: '/seller/requests/:requestId/make-offer',
                controller: 'seller-request-controller',
                templateUrl: 'app/views/place-request.html'
            }).
            state('seller-requests', {
                url: '/seller/requests',
                controller: 'seller-request-controller',
                templateUrl: 'app/views/request-list.html'
            });
    }
]);
