//MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);


//ROUTES

weatherApp.config(function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl : 'pages/home.htm',
            controller : 'homeController'
        }).
        when('/forcast', {
            templateUrl : 'pages/forcast.htm',
            controller : 'forcastController'
    });
    
    
});


//CONTROLLERS

weatherApp.controller('homeController', ['$scope','weatherService', function ($scope, weatherService) {
    console.log('In home controller');
    $scope.city = weatherService.city;
    $scope.$watch('city', function(){
        weatherService.city = $scope.city;
    });
    
}]);

weatherApp.controller('forcastController', ['$scope','$resource','weatherService', function ($scope, $resource, weatherService) {
    console.log('In forcast controller');
    $scope.city = weatherService.city;
    console.log('In forcast controller - city='+weatherService.city);
    //var url  = 'http://localhost:8090/weather/'+weatherService.city;
    //$scope.weatherAPI = $resource(url,{callback: "JSON_CALLBACK"}, { get: {method : "JSONP"}});
//    $scope.weatherResults = $scope.weatherAPI.get();
     var src = $resource('http://localhost:8090/weather/'+$scope.city,
              {city: "@city"}, //parameters default
              {
                
                GetTodo: { method: "GET", params: {} },                            
             
              });
    var result = src.GetTodo();
    console.log(src.GetTodo());
    
    
    var User = $resource('http://localhost:8090/weather/:cityId/', {cityId:'@id'});
    var user = User.get({cityId:$scope.city}, function() {
        console.log('received results from rest service');
        console.log(user.city);
        console.log(user.temprature);
});
    
    
    
    
    
}]);

//SERVICES

weatherApp.service('weatherService', function(){
    this.city = 'Delhi';
});