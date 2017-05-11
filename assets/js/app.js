var app = angular.module('myApp',['ngRoute'])
        .run(['$rootScope',function($rootScope) {
           $rootScope.section = 0;
           $rootScope.showComp = false;
        }]);
app.config(['$routeProvider',function ($routeProvider) {
        $routeProvider
                .when('/',{templateUrl:'assets/views/formation.html',
                controller: 'formation'})
                .when('/experience',{templateUrl:'assets/views/experience.html',
                controller: 'experience'})
                .when('/competence',{templateUrl:'assets/views/competence.html',
                controller: 'competence'})
                .when('/passion',{templateUrl:'assets/views/passion.html',
                controller: 'passion'})
                .when('/contact',{templateUrl:'assets/views/contact.html',
                controller: 'contact'})
                .when('/jeux',{templateUrl:'assets/views/jeux.html',
                controller: 'jeux'})
                .otherwise({redirectTo: '/'});
    }]);
app.controller('formation',function () {
        
    });
app.controller('experience',function () {
        
    });
app.controller('competence',['$http','$scope',function ($http,$scope) {
        $http.get('assets/js/Competences.json')
                .then(function (rep) {
                    $scope.competences = rep.data;
                });
    }]);
app.controller('passion',function () {
        
    });
app.controller('contact',function () {
        
    });
    app.controller('jeux',function () {
        
    });