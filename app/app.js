
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
                    controller: 'navBarCtrl'
                },
                'sidebar@trending': { templateUrl: 'app/modules/sidebar-signup.html' },
                'mainview@trending': { 
                    templateUrl: 'trending.html',
                    controller: 'communityCtrl'
                }
            }
        })
        .state('createActionPlan', {
            url: '/issue/:issue_id/actionplan/create',
            views: {
                '': { templateUrl: 'app/modules/partial-home.html' },
                'navbar@createActionPlan': { 
                    templateUrl: 'app/modules/navbar.html',
                    controller: 'navBarCtrl'
                },
                'sidebar@createActionPlan': { templateUrl: 'app/modules/sidebar-signup.html' },
                'mainview@createActionPlan': { 
                    templateUrl: 'createActionPlan.html',
                    controller: 'createActionPlanCtrl'
                }
            },  
            resolve: {
                auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
                  var userInfo = authenticationSvc.getUserInfo();
             
                  if (userInfo) {
                    return $q.when(userInfo);
                  } else {
                    return $q.reject({ authenticated: false });
                  }
                }]
              }
        })
        .state('actionplan', {
            url: '/issue/:issue_id/actionplan/:action_plan_id',
            views: {
                '': { templateUrl: 'app/modules/partial-home.html' },
                'navbar@actionplan': { 
                    templateUrl: 'app/modules/navbar.html',
                    controller: 'navBarCtrl'
                },
                'sidebar@actionplan': { templateUrl: 'app/modules/sidebar-signup.html' },
                'mainview@actionplan': { 
                    templateUrl: 'actionPlan.html',
                    controller: 'actionPlanCtrl'
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
                    controller: 'communityCtrl'
                }
            }
        })
        .state('home', {
            url: '/',
            views: {
                '': { templateUrl: 'app/modules/partial-landing.html' },
                'fullview@home': { 
                    templateUrl: 'home.html',
                    controller: 'signUpCtrl'
                }
            }
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
                    controller: 'signUpCtrl'
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
                    controller: 'communityCtrl'
                }
            }
        })
        .state('issue', {
            url: '/issue/:issue_id',
            views: {
                '': { templateUrl: 'app/modules/partial-home.html' },
                'navbar@issue': { 
                    templateUrl: 'app/modules/navbar.html',
                    controller: 'navBarCtrl'
                },
                'sidebar@issue': { templateUrl: 'app/modules/sidebar-signup.html' },
                'mainview@issue': { 
                    templateUrl: 'issue.html',
                    controller: 'issueCtrl'
                }
            }
        })

        ;
         
});



routerApp.controller('communityCtrl', function($scope, $http) {
    $http.get('issue.js')
    .success(function(response) 
        {
          $scope.main= response.issue;
        });

});

routerApp.controller('navBarCtrl', function($scope, $http) {

});

routerApp.controller('signUpCtrl', function($scope, $http) {

});

routerApp.controller('actionPlanCtrl', function($scope, $http) {
    $http.get('issue3.js')
    .success(function(response) 
        {
          $scope.main= response.action_plans;
        });
});

routerApp.controller('createActionPlanCtrl', function($scope, $http) {

});

routerApp.controller('issueCtrl', function($scope, $http, $stateParams) {
    var issue_url = "/issue/" + $stateParams.issue_id;

    $http.get('issue2.js')
    .success(function(response) 
        {
          $scope.main= response.issue;
        });

    $scope.issue_id = $stateParams.issue_id;

});


function openLogin() {
    var x = document.getElementById("loginbox");
    var x2 = document.getElementById("loginbox");
    var y = document.getElementById("SignUpSide"); 
    var window_width = window.innerWidth;

    if (x.style.display == "block") {
        x.style.display = "none";
        y.style.top = "18vh";
    } 
    else{  
        x.style.display = "block"; 
        y.style.top = "27vh";
    }
  
}

function revealMenu() {
    var x = document.getElementById("small-menu");
    var y = document.getElementById("mainview"); 
    var z = document.getElementById("signup-wrap"); 
    if (x.style.top == "0px") {
        x.style.top = "48px";
        y.style.top = "96px";
        z.style.top = "128px";
    } 
    else{  
        x.style.top = "0px"; 
        y.style.top = "48px";
        z.style.top = "80px";
    }
}

routerApp.factory("authenticationSvc", function($http, $q, $window) {
  var userInfo;
 
  function login(userName, password) {
    var deferred = $q.defer();
 
    $http.post("/api/login", {
      userName: userName,
      password: password
    }).then(function(result) {
      userInfo = {
        accessToken: result.data.access_token,
        userName: result.data.userName
      };
      $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
      deferred.resolve(userInfo);
    }, function(error) {
      deferred.reject(error);
    });
 
    return deferred.promise;
  }
 
  return {
    login: login
  };
});

routerApp.factory("authenticationSvc", function() {
  var userInfo;
 
  function getUserInfo() {
    return userInfo;
  }
});

routerApp.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeSuccess", function(userInfo) {
    console.log(userInfo);
  });
 
  $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
    if (eventObj.authenticated === false) {
      $location.path("/login");
    }
  });
}]);