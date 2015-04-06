
var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/trending');
    
    $stateProvider
        
        .state('trending', {
            url: '/trending',
            views: {
                '': { templateUrl: 'app/modules/partial-home.html' },
                'navbar@trending': { 
                    templateUrl: 'app/modules/navbar.html',
                    controller: 'issueCtrl'
                },
                'sidebar@trending': { templateUrl: 'app/modules/sidebar-signup.html' },
                'mainview@trending': { 
                    templateUrl: 'trending.html',
                    controller: 'issueCtrl'
                }
            }

        })
        .state('london', {
            url: '/london',
            views: {
                '': { templateUrl: 'app/modules/partial-home.html' },
                'navbar@london': { 
                    templateUrl: 'app/modules/navbar.html',
                    controller: 'issueCtrl'
                },
                'sidebar@london': { templateUrl: 'app/modules/sidebar-signup.html' },
                'mainview@london': { 
                    templateUrl: 'trending.html',
                    controller: 'issueCtrl'
                }
            }
        })
        .state('home', {
            url: '/home',
            template: 'I could sure use a drink right now.'
        })
        .state('signup', {
            url: '/signup',
            views: {
                '': { templateUrl: 'app/modules/partial-signup.html' },
                'navbar@signup': { 
                    templateUrl: 'app/modules/navbar.html',
                    controller: 'issueCtrl'
                },
                'fullview@signup': { 
                    templateUrl: 'app/modules/signup.html',
                    controller: 'issueCtrl'
                }
            }
        })
        .state('bridgewater', {
            url: '/bridgewater',
            views: {
                '': { templateUrl: 'app/modules/partial-home.html' },
                'navbar@bridgewater': { 
                    templateUrl: 'app/modules/navbar.html',
                    controller: 'issueCtrl'
                },
                'sidebar@bridgewater': { templateUrl: 'app/modules/sidebar-signup.html' },
                'mainview@bridgewater': { 
                    templateUrl: 'trending.html',
                    controller: 'issueCtrl'
                }
            }
        })

        ;
         
});


routerApp.controller('issueCtrl', function($scope, $http) {
    $http.get('issue.js')
    .success(function(response) 
        {
          $scope.main= response.issue;
        });

});
