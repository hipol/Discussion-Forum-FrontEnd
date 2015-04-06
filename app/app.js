
var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.factory('SearchData', function(){
    return "I am data from a service"
});

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/trending');
    
    $stateProvider
        
        .state('trending', {
            url: '/trending',
            views: {
                '': { templateUrl: 'app/modules/partial-home.html' },
                'navbar@trending': { 
                    templateUrl: 'app/modules/navbar.html',
                    controller: 'navBarCtrl'
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
                    controller: 'navBarCtrl'
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
                    controller: 'navBarCtrl'
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
                    controller: 'navBarCtrl'
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


routerApp.controller('issueCtrl', function($scope, $http, SearchData) {
    $scope.query = SearchData;

    $http.get('issue.js')
    .success(function(response) 
        {
          $scope.main= response.issue;
        });

});

routerApp.controller('navBarCtrl', function($scope, $http, SearchData) {
    $scope.query = SearchData;

});











routerApp.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});

routerApp.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
});

routerApp.controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
  $scope.credentials = {
    username: '',
    password: ''
  };
  $scope.login = function (credentials) {
    AuthService.login(credentials).then(function (user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };
})

routerApp.factory('AuthService', function ($http, Session) {
  var authService = {};
 
  authService.login = function (credentials) {
    return $http
      .post('/login', credentials)
      .then(function (res) {
        Session.create(res.data.id, res.data.user.id,
                       res.data.user.role);
        return res.data.user;
      });
  };
 
  authService.isAuthenticated = function () {
    return !!Session.userId;
  };
 
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };
 
  return authService;
});

routerApp.service('Session', function () {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };
});

