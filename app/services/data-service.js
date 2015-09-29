angular.module('wanteet-api-example').factory('data-service', ['localStorageService',
    function (localStorageService) {
        var _this = this;

        // Setting API endpoint base path
        var _api = {
          basePath : 'http://qa.api.wanteet.com/api/v1',
          publicPath : 'http://qa.api.wanteet.com/public/api/v1'
        }

        var save = function(key, value){
            return localStorageService.set(key, value);
        }

        var get = function(key){
            return localStorageService.get(key);
        }

        var remove = function(key){
            return localStorageService.remove(key);
        }

        var clearAll = function(){
          return localStorageService.clearAll();
        }

        var getUser = function(){
            return get('currentUser');
        }

        var getMarket = function(){
            //return get('currntMarket');
            //Fetch the current market using the Market API endpoint
            //Hard referencing for the sake of example
            var market = {
              id: 'wanteet',
              services: ['food']
            }
            return market;
        }

        var _user = getUser();
        var _market = getMarket();

        _this._data = {
            user: _user,
            market: _market,
            api: _api,
            store: {
              save: save,
              remove: remove,
              get: get,
              clearAll: clearAll
            }
        };
        return _this._data;
    }
  ]);
