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
                '': { templateUrl: 'app/modules/partial-signup.html' },
                'navbar@createActionPlan': { 
                    templateUrl: 'app/modules/navbar.html',
                    controller: 'navBarCtrl'
                },
                'signview@createActionPlan': { 
                    templateUrl: 'createActionPlan.html',
                    controller: 'createActionPlanCtrl'
                }
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
                'signview@signup': { 
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
        });
         
});

routerApp.config(['$httpProvider', function ($httpProvider) {    
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
}]);

/**
routerApp.factory('AuthenticationService',
    function (Base64, $http, $rootScope, $timeout, $state) {
        var service = {};

        service.Login = function (email, password) {

            var logindata = Base64.encode(email + ':' + password);

            var config = {headers:  {
                'Authorization': 'Basic ' + logindata
                }
            };

            // $state.go('london');

            $http.get('https://dry-earth-2683.herokuapp.com/auth/token')
               .success(function (response) {

                    var authdata = Base64.encode(response.token + ':' + ' ');
         
                    $rootScope.globals = {
                        currentUser: {
                            now_email: email,
                            now_id: response.id
                        }
                    };
         
                    $http.defaults.headers.common.Authorization = 'Basic ' + authdata; // jshint ignore:line
                    //$cookieStore.put('globals', $rootScope.globals);
                });

        };
 
        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };
 
        return service;
    });

**/


routerApp.controller('communityCtrl', function(Base64, $scope, $http) {


//var authdata = Base64.encode("jiangaishi@gmail.com" + ':' + "password");
//$http.defaults.headers.common.Authorization = 'Basic ' + authdata;

     var authdata = Base64.encode("eyJhbGciOiJIUzI1NiIsImV4cCI6MTQzMTAxNDE0OSwiaWF0IjoxNDMxMDEyMzQ5fQ.eyJpZCI6MX0.Fu0_W42zrD-OvDVMjiK9SUZVvyBHu0230FcC1rMae8o" + ':' + ' ');
         
    $http.defaults.headers.common.Authorization = 'Basic ' + authdata;

var main_url ="https://dry-earth-2683.herokuapp.com/issue"

    $http.get(main_url)
    .success(function(response) 
        {
           $scope.main= response.issue;
        });

});

routerApp.controller('signUpCtrl', function($scope, $http) {

    $scope.signUp = function () {

        var new_user= {email: $scope.email, first_name:$scope.firstname, last_name:$scope.lastname, password:$scope.password, postal_code:$scope.postalcode};

        $http.get('https://dry-earth-2683.herokuapp.com/issue')
        .success(function(response) 
        {
           $scope.main= response.issue;
        });

        $http.post('https://dry-earth-2683.herokuapp.com/auth/signup', JSON.stringify(new_user)).
          success(function(data, status, headers, config) {
             $state.go('trending');
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });


       
                // Simple POST request example (passing data) : 

    }
});


routerApp.controller('navBarCtrl', function($scope, $http, $rootScope, AuthenticationService, $state) {

    $scope.openLogin = function () {
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

    $scope.loginsubmit = function () {
        //AuthenticationService.Login($scope.email, $scope.password);
       
    } 

});


routerApp.controller('actionPlanCtrl', function($scope, $http, $stateParams, $state) {

    $scope.vote = function () {
        var x = document.getElementById("vote-holder");
        if(x.style.backgroundColor == "red"){
            x.style.backgroundColor = "#333333";
        }
        else{
            x.style.backgroundColor = "red";
        }
    }



    var AP_url = "https://dry-earth-2683.herokuapp.com" + '/actionplan/' + $stateParams.action_plan_id;

    $http.get(AP_url)
    .success(function(response) 
        {
          $scope.main= response.action_plans;
        });

    var Comment_url = "https://dry-earth-2683.herokuapp.com" + '/actionplan/' + $stateParams.action_plan_id + '/comments';

    $http.get(Comment_url)
    .success(function(response) 
        {
          $scope.side= response.comments;
        });



    var converter = new Showdown.converter();

        $scope.submitComment = function () {
        var htmlText = converter.makeHtml($scope.comment);

        var createComment_url = "https://dry-earth-2683.herokuapp.com/" + $stateParams.action_plan_id + '/comment/create';
        
         var new_AP = {comment: htmlText}

        $http.post(createComment_url, JSON.stringify(new_AP)).
              success(function(data, status, headers, config) {

                $http.get(Comment_url)
                .success(function(response) 
                    {
                      $scope.side= response.comments;
                    });
              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });
    }



});


routerApp.controller('createActionPlanCtrl', function($scope, $http, $stateParams, $state) {

    var converter = new Showdown.converter();

    $scope.submitAP = function () {
        var htmlText = converter.makeHtml($scope.article);

        var createAP_url = "https://dry-earth-2683.herokuapp.com" + "/issue/" + $stateParams.issue_id + '/plan/create';
        
         var new_AP = {plan: $scope.plan, article:htmlText}

        $http.post(createAP_url, JSON.stringify(new_AP)).
              success(function(data, status, headers, config) {

                 $state.go('issue', {'issue_id': $stateParams.issue_id});
              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });
    }

   $scope.$watch('article', function() {
       $scope.mark = converter.makeHtml($scope.article);
   });
   

});

routerApp.controller('issueCtrl', function($scope, $http, $stateParams) {

  var issue_url = "https://dry-earth-2683.herokuapp.com" + "/issue/" + $stateParams.issue_id;

    $http.get(issue_url)
    .success(function(response) 
        {
          $scope.main= response.issue;
        });

});



routerApp.factory('Base64', function () {
    /* jshint ignore:start */
 
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
 
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };
 
    /* jshint ignore:end */
});



function revealMenu() {
    var x = document.getElementById("small-menu");
    var y = document.getElementById("mainview"); 
    var z = document.getElementById("signup-wrap"); 
    if (x.style.top == "0px") {
        x.style.top = "46px";
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

angular.module('routerApp')
    .filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);
