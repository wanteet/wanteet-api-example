'use strict';

var ApplicationConfiguration = (function () {
    // Init module configuration options
    var applicationModuleName = 'wanteet-api-example';
    var applicationModuleVendorDependencies = [
        'ngResource',
        'ngCookies',
        'LocalStorageModule',
        'ui.router'
    ];

    // Add a new vertical module
    var registerModule = function (moduleName, dependencies) {
        // Create angular module
        angular.module(moduleName, dependencies || []);
        // Add the module to the AngularJS configuration file
        angular.module(applicationModuleName).requires.push(moduleName);
    };

    return {
        applicationModuleName: applicationModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies,
        registerModule: registerModule
    };
})();

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
    function ($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);

//Then define the init function for starting up the application
angular.element(document).ready(function () {

    //Init the app
    angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
