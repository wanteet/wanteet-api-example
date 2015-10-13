angular.module('wanteet-api-example').controller('buyer-request-controller',
    ['$scope', '$http', 'data-service', '$state', '$timeout',
        function ($scope, $http, dataService, $state, $timeout) {

            // If user is not signed in then redirect to Login screen
            console.log(dataService.user);
            if (!dataService.user) $state.go('home');

            $scope.requests = [];
            $scope.request = {};
            $scope.service = dataService.market.services[0];
            $scope.formState = 'loading';
            $scope.step = 1;
            $scope.answers = [];

            $scope.init = function () {

                //Fetch questions for the service
                $http.get(dataService.api.publicPath + "/services/"
                + $scope.service + "/questions")
                    .success(function (response) {
                        $scope.questions = response.results;
                        $scope.formState = '';
                    });

                $scope.request = {
                    services: [
                        {
                            service: $scope.service,
                            answers: []
                        }
                    ],
                    market : 'wanteet'
                };



            }

            $scope.processAnswers = function () {

                //console.log($scope.answers);
                var answers = $scope.answers;
                //Set service to be traversed
                console.log(answers);
                var service;
                for (kdx in $scope.request.services) {
                    if ($scope.request.services[kdx]["service"] === $scope.service) {
                        service = $scope.request.services[kdx];
                    }
                }

                if (service.answers.length > 0) {
                    service.answers = [];
                }

                for (idx in answers) {
                    var answer;
                    console.log(answers[idx]);
                    if (typeof answers[idx] === 'object') {
                        answer = [];
                        for (jdx in answers[idx]) {
                            if (answers[idx][jdx]) {
                                answer.push(answers[idx][jdx]);
                            }
                        }
                        answer = answer.join(',');
                    } else {
                        answer = answers[idx];
                    }

                    service.answers.push({
                        question: idx,
                        answer: answer
                    });
                }
                $scope.step = 2;
                console.log($scope.request);

                $timeout(function(){
                    $('input[name="dateAndTime"]').daterangepicker({
                        singleDatePicker: true,
                        showDropdowns: true,
                        timePicker: true,
                        timePickerIncrement: 30,
                        minDate : (new Date()).setDate((new Date()).getDate() + 1),
                        locale: {
                            format: 'MM/DD/YYYY h:mm A'
                        }
                    });

                    $('input[name="dateAndTime"]').on('apply.daterangepicker', function(ev, picker){
                        $scope.dateTime = moment($('#dateAndTime').val()).format('MM/DD/YYYY h:mm A');
                        $scope.request.dateTime = moment($('#dateAndTime').val()).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
                    });

                },10);

            }

            $scope.placeRequest = function () {
                $scope.formState = 'loading';
                console.log($scope.request);
                $http.post(dataService.api.basePath + '/users/' + dataService.user.id
                    + '/events',
                    $scope.request).success(function (response) {
                        // If successful save the response
                        console.log(response);
                        // And redirect to place-request
                        // $state.go('place-request');
                    }).error(function (response) {
                        $scope.formState = '';
                        $scope.error = {};
                        if (typeof response !== 'undefined') {
                            for (var idx in response.errors) {
                                $scope.error[response.errors[idx]['field']] = {
                                    value: response.errors[idx]['value'],
                                    message: response.errors[idx]['message']
                                };
                            }
                        }
                    });
            }

            $scope.getRequests = function () {

            }

            $scope.getRequest = function () {

            }

            $scope.acceptOffer = function () {

            }


        }
    ]);
