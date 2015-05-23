var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/signup');
    
    $stateProvider
        .state('not-signed-in', {
            url: '/please-sign-in',
            views: {
                '': { templateUrl: 'app/modules/partial-home.html' },
                'navbar@not-signed-in': { 
                    templateUrl: 'app/modules/navbar.html',
                    controller: 'navBarCtrl'
                },
                'sidebar@not-signed-in': { 
                    templateUrl: 'app/modules/pleasesignin.html',
                    controller: 'sidebarCtrl'
                },
                'mainview@not-signed-in': { 
                    templateUrl: 'app/modules/sidebar-signup.html',
                    controller: 'sidebarCtrl'
                }
            }
        })
        .state('allissues', {
            url: '/issues',
            views: {
                '': { templateUrl: 'app/modules/partial-home.html' },
                'navbar@allissues': { 
                    templateUrl: 'app/modules/navbar.html',
                    controller: 'navBarCtrl'
                },
                'sidebar@allissues': { 
                    templateUrl: 'app/modules/sidebar-signup.html',
                    controller: 'sidebarCtrl'
                },
                'mainview@allissues': { 
                    templateUrl: 'allissues.html',
                    controller: 'communityCtrl'
                }
            }
        })
        .state('trending', {
            url: '/trending',
            views: {
                '': { templateUrl: 'app/modules/partial-home.html' },
                'navbar@trending': { 
                    templateUrl: 'app/modules/navbar.html',
                    controller: 'navBarCtrl'
                },
                'sidebar@trending': { 
                    templateUrl: 'app/modules/sidebar-signup.html',
                    controller: 'sidebarCtrl'
                },
                'mainview@trending': { 
                    templateUrl: 'trending.html',
                    controller: 'trendingCtrl'
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
                'sidebar@actionplan': { 
                    templateUrl: 'app/modules/sidebar-signup.html',
                    controller: 'sidebarCtrl'
                },
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
                'sidebar@london': { 
                    templateUrl: 'app/modules/sidebar-signup.html',
                    controller: 'sidebarCtrl'
                },
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
                'sidebar@bridgewater': { 
                    templateUrl: 'app/modules/sidebar-signup.html',
                    controller: 'sidebarCtrl'
                },
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
                'sidebar@issue': { 
                    templateUrl: 'app/modules/sidebar-signup.html',
                    controller: 'sidebarCtrl'
                },
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




routerApp.factory('AuthenticationService',
    function (Base64, $http, $rootScope, $timeout, $state) {
        var service = {};

        service.Login = function (email, password) {

            var logindata = Base64.encode(email + ':' + password);

            $http.defaults.headers.common.Authorization = 'Basic ' + logindata;

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
                        document.cookie="token=" + authdata + ";";
                        document.cookie= "user_id=" + $rootScope.globals.currentUser.now_id + ";";
                        document.cookie= "user_email=" + $rootScope.globals.currentUser.now_email + ";";

                    console.log("stored token=" + authdata+ "; user_id=" + $rootScope.globals.currentUser.now_id + "; user_email=" + $rootScope.globals.currentUser.now_email);
                    //document.cookie="user_email=" + __________;

                    //$cookieStore.put('globals', $rootScope.globals);
                    //console.log("token"+ response.token);


                    $state.go('allissues');
                    //$state.go($state.current, {}, {reload: true});

                    
                });

        };
 
        service.ClearCredentials = function () {
            console.log("clearcredentials")

            $rootScope.globals = {
                    currentUser: {
                        now_email: null,
                        now_id: null
                    }

                };

            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            document.cookie = "user_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

            //$cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';

            $state.go($state.current, {}, {reload: true});
        };
 
        return service;
    });




routerApp.controller('sidebarCtrl', function($rootScope, $http, $scope) {

    if ($rootScope.globals.currentUser.now_id != null){
        var unlogged = document.getElementById("SignUpSide");
        unlogged.style.display = "none";

        var AP_url = "https://dry-earth-2683.herokuapp.com" + '/auth/user/' + $rootScope.globals.currentUser.now_id;

        $http.get(AP_url)
        .success(function(response) 
            {
              $scope.main= response;
            });

    }

    else{
        var unlogged = document.getElementById("UserSide");
        unlogged.style.display = "none";
    }



});


routerApp.controller('communityCtrl', function(Base64, $scope, $http, $rootScope) {


    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        console.log("change")
      if ($rootScope.loggedInUser == null) {
        // no logged user, redirect to /login
        if ( next.templateUrl === "partials/login.html") {
        } else {
          $state.go('not-signed-in');
        }
      }
    });







var main_url ="https://dry-earth-2683.herokuapp.com/issue"

    $http.get(main_url)
    .success(function(response) 
        {
           $scope.main = response.issue;
        });

});

routerApp.controller('signUpCtrl', function($scope, $http, $state, AuthenticationService, $rootScope) {

    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        console.log("change")
      if ($rootScope.loggedInUser == null) {
        // no logged user, redirect to /login
        if ( next.templateUrl === "partials/login.html") {
        } else {
          $state.go('not-signed-in');
        }
      }
    });





    $scope.signUp = function () {

        var new_user= {email: $scope.email, first_name:$scope.firstname, last_name:$scope.lastname, password:$scope.password, postal_code:$scope.postalcode};

        $http.get('https://dry-earth-2683.herokuapp.com/issue')
        .success(function(response) 
        {
           $scope.main= response.issue;
        });

        $http.post('https://dry-earth-2683.herokuapp.com/auth/signup', JSON.stringify(new_user)).
          success(function(data, status, headers, config) {
             AuthenticationService.Login($scope.email, $scope.password);
             //$state.go('trending');
             $state.go('allissues');
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
        AuthenticationService.Login($scope.email, $scope.password);
    } 

     $scope.Logout = function () {
        AuthenticationService.ClearCredentials();
     }

    if ($rootScope.globals.currentUser.now_id == null){
        checkCookie();
    }

    function checkCookie() {
        var authdata_token=getCookie("token");
        if (authdata_token!="") {
            console.log("inhere");

            $http.defaults.headers.common.Authorization = 'Basic ' + authdata_token;
            console.log(authdata_token);

            var user_id=getCookie("user_id");
            console.log("user_id:" + user_id);
            var user_email=getCookie("user_email");
            console.log("user_email:" + user_email);

                $rootScope.globals = {
                    currentUser: {
                        now_email: user_email,
                        now_id: user_id
                    }

                };
        }
    }

    if ($rootScope.globals.currentUser.now_id != null){
        var login = document.getElementById("login");
        login.style.display = "none";

        var logout = document.getElementById("logout");
        logout.style.display = "block";

    }

//hello user

    if ($rootScope.globals.currentUser.now_id != null){

        var AP_url = "https://dry-earth-2683.herokuapp.com" + '/auth/user/' + $rootScope.globals.currentUser.now_id;

        $http.get(AP_url)
        .success(function(response) 
            {
              $scope.main= response;
            });

    }

    else{
        var unlogged = document.getElementById("user");
        unlogged.style.display = "none";
    }


});

routerApp.controller('trendingCtrl', function($scope, $http, $stateParams) {

var main_url ="https://dry-earth-2683.herokuapp.com/events"

    $http.get(main_url)
    .success(function(response) 
        {
           $scope.main = response.issue;
        });



});


routerApp.controller('createActionPlanCtrl', function($scope, $http, $stateParams, $state, $rootScope) {


    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        console.log("change")
      if ($rootScope.loggedInUser == null) {
        // no logged user, redirect to /login
        if ( next.templateUrl === "partials/login.html") {
        } else {
          $state.go('not-signed-in');
        }
      }
    });





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

routerApp.controller('issueCtrl', function($scope, $http, $stateParams, $state, $rootScope, $location, $anchorScroll) {

        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        console.log("change")
      if ($rootScope.loggedInUser == null) {
        // no logged user, redirect to /login
        if ( next.templateUrl === "partials/login.html") {
        } else {
          $state.go('not-signed-in');
        }
      }
    });





  var issue_url = "https://dry-earth-2683.herokuapp.com" + "/issue/" + $stateParams.issue_id;

    $http.get(issue_url)
    .success(function(response) 
        {
          $scope.issue= response.issue;

        });




// Action Plan Stuffs

    $scope.vote = function ($index) {

        if($scope.issue[0].action_plan_id[$index].isVote == true){

            var vote_url = "https://dry-earth-2683.herokuapp.com/" + $scope.issue[0].action_plan_id[$index].id + '/delete_vote_by/' + $rootScope.globals.currentUser.now_id;

            $http.post(vote_url).success(function(response) 
            {
            });

            $scope.issue[0].action_plan_id[$index].isVote  = false;
            $scope.issue[0].action_plan_id[$index].votes -= 1;

        }
        else{

            $scope.issue[0].action_plan_id[$index].isVote  = true;
            $scope.issue[0].action_plan_id[$index].votes += 1;

            var vote_url = "https://dry-earth-2683.herokuapp.com/" + $scope.issue[0].action_plan_id[$index].id + '/vote';
            var new_vote = {userid: $rootScope.globals.currentUser.now_id};
            $http.post(vote_url, JSON.stringify(new_vote));
        }

    }

    $scope.isVoted = function($index){
        var color = $scope.issue[0].action_plan_id[$index].isVote ? 'red' : '#333333' ;
        return { background: color};
    }

    check_all_votes = function(){
        $http.get(issue_url)
        .success(function(response) 
            {
              $scope.issue= response.issue;

              for (i = 0; i < $scope.issue[0].action_plan_id.length; i++) { 
                  

                   var Already_voted_url = "https://dry-earth-2683.herokuapp.com/" + $scope.issue[0].action_plan_id[i].id + '/check_vote/' + $rootScope.globals.currentUser.now_id;

                    check_vote(i, Already_voted_url);
                   
                }

            });
    }

    check_all_votes();

    check_vote = function (x, Already_voted_url){
        $http.get(Already_voted_url)
                    .success(function(input) 
                        {
                            if(input == "True"){
                                votepresent(x);
                            }
                        });
                }

     votepresent = function(i){
                    $scope.issue[0].action_plan_id[i].isVote= true;
                }



//Action Plan Comment System

    $scope.upvote = function($index, $parent){

        if($scope.issue[0].action_plan_id[$parent].comments[$index].isGreen == true){

            var vote_url = "https://dry-earth-2683.herokuapp.com/" + $scope.issue[0].action_plan_id[$parent].id  + '/' + $scope.issue[0].action_plan_id[$parent].comments[$index].id + '/delete_upvote_by/' + $rootScope.globals.currentUser.now_id;
            $http.post(vote_url);

        //
            $scope.issue[0].action_plan_id[$parent].comments[$index].upvotes -= 1;
            $scope.issue[0].action_plan_id[$parent].comments[$index].isGreen = false;

          //  check_all_commentvotes();


        }
        else{

            var vote_url = "https://dry-earth-2683.herokuapp.com/" + $scope.issue[0].action_plan_id[$parent].id + '/' + $scope.issue[0].action_plan_id[$parent].comments[$index].id + '/upvote';
            var new_vote = {userid: $rootScope.globals.currentUser.now_id};
            $http.post(vote_url, JSON.stringify(new_vote));

        //
            $scope.issue[0].action_plan_id[$parent].comments[$index].upvotes += 1;
            $scope.issue[0].action_plan_id[$parent].comments[$index].isGreen = true;

            //delete downvote
            if($scope.issue[0].action_plan_id[$parent].comments[$index].isRed == true){

                var vote_url = "https://dry-earth-2683.herokuapp.com/" + $scope.issue[0].action_plan_id[$parent].id + '/' + $scope.issue[0].action_plan_id[$parent].comments[$index].id + '/delete_downvote_by/' + $rootScope.globals.currentUser.now_id;
                $http.post(vote_url);

            //
                $scope.issue[0].action_plan_id[$parent].comments[$index].downvotes -= 1;
                $scope.issue[0].action_plan_id[$parent].comments[$index].isRed = false;


            }

        //    check_all_commentvotes();
        }

        
    }

    $scope.downvote = function($index, $parent){

        if($scope.issue[0].action_plan_id[$parent].comments[$index].isRed == true){

            var vote_url = "https://dry-earth-2683.herokuapp.com/" + $scope.issue[0].action_plan_id[$parent].id+ '/' + $scope.issue[0].action_plan_id[$parent].comments[$index].id + '/delete_downvote_by/' + $rootScope.globals.currentUser.now_id;
            $http.post(vote_url);

        //
            $scope.issue[0].action_plan_id[$parent].comments[$index].downvotes -= 1;
            $scope.issue[0].action_plan_id[$parent].comments[$index].isRed = false;

          //  check_all_commentvotes();


        }
        else{

            var vote_url = "https://dry-earth-2683.herokuapp.com/" + $scope.issue[0].action_plan_id[$parent].id + '/' + $scope.issue[0].action_plan_id[$parent].comments[$index].id + '/downvote';
            var new_vote = {userid: $rootScope.globals.currentUser.now_id};
            $http.post(vote_url, JSON.stringify(new_vote));

        //
            $scope.issue[0].action_plan_id[$parent].comments[$index].downvotes += 1;
            $scope.issue[0].action_plan_id[$parent].comments[$index].isRed = true;

        //    check_all_commentvotes();

                    //delete upvote
            if($scope.issue[0].action_plan_id[$parent].comments[$index].isGreen == true){

                var vote_url = "https://dry-earth-2683.herokuapp.com/" + $scope.issue[0].action_plan_id[$parent].id + '/' + $scope.issue[0].action_plan_id[$parent].comments[$index].id + '/delete_upvote_by/' + $rootScope.globals.currentUser.now_id;
                $http.post(vote_url);

            //
                $scope.issue[0].action_plan_id[$parent].comments[$index].upvotes -= 1;
                $scope.issue[0].action_plan_id[$parent].comments[$index].isGreen = false;


            }

        }
        
    }

    $scope.isUpvoted = function($index, $parent){
        var sprite = $scope.issue[0].action_plan_id[$parent].comments[$index].isGreen ? 'url(sprites.png) 23.5px 0px' : 'url(sprites.png) 0px 0px' ;
        return { background: sprite};
    }

    $scope.isDownvoted = function($index, $parent){
        var sprite = $scope.issue[0].action_plan_id[$parent].comments[$index].isRed ? 'url(sprites.png) 23.5px 26px' : 'url(sprites.png) 0px 26px' ;
        return { background: sprite};
    }

    check_all_commentvotes = function(){
        $http.get(issue_url)
        .success(function(response) 
            {
              $scope.issue= response.issue;

              for (i = 0; i < $scope.issue[0].action_plan_id.length; i++) { 

                  for (x = 0; x < $scope.issue[0].action_plan_id[i].comments.length; x++) { 

                  var Already_commentvoted_url = "https://dry-earth-2683.herokuapp.com/" + $scope.issue[0].action_plan_id[i].id + '/' + $scope.issue[0].action_plan_id[i].comments[x].id + '/check_vote/' + $rootScope.globals.currentUser.now_id;
                    
                    check_commentvote(i,x, Already_commentvoted_url);

                    }

                }

            });
    }

    check_all_commentvotes();

    check_commentvote = function (i,x, Already_commentvoted_url){
        $http.get(Already_commentvoted_url)
                    .success(function(input) 
                        {
                            if(input == 1){
                                upvotepresent(i,x);
                            }

                            if(input == -1){
                                downvotepresent(i,x);
                            }
                        });
                }

     upvotepresent = function(i,x){
                    $scope.issue[0].action_plan_id[i].comments[x].isGreen = true;
                }

    downvotepresent = function(i,x){
                    $scope.issue[0].action_plan_id[i].comments[x].isRed = true;
                }




    var converter = new Showdown.converter();

    $scope.submitComment = function ($index) {
        var htmlText = converter.makeHtml($scope.issue[0].action_plan_id[$index].comment_create);

        var createComment_url = "https://dry-earth-2683.herokuapp.com/" +  $scope.issue[0].action_plan_id[$index].id + '/comment/create';
        
         var new_AP = {comment: htmlText, userid: $rootScope.globals.currentUser.now_id}

        $http.post(createComment_url, JSON.stringify(new_AP)).
              success(function(data, status, headers, config) {

                $http.get(issue_url)
                .success(function(response) 
                    {
                      $scope.issue= response.issue;
                      check_all_commentvotes();
                      $scope.issue[0].action_plan_id[$index].comment_create="";
                    });
              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });
    }


    $scope.isCommentDisplay = function ($index) {
        var displays = $scope.issue[0].action_plan_id[$index].yesDisplay ? 'block' : 'none' ;
        return { display: displays };
    }

    $scope.isOppositeCommentDisplay = function ($index) {
        var displays = $scope.issue[0].action_plan_id[$index].yesDisplay ? 'none' : 'block' ;
        return { display: displays };
    }

    $scope.displayComment = function ($index) {
        if ($scope.issue[0].action_plan_id[$index].yesDisplay == false){
            $scope.issue[0].action_plan_id[$index].yesDisplay = true;
        }
        else{
            $scope.issue[0].action_plan_id[$index].yesDisplay = false;
        }
    }



    $scope.gotoActionPlan = function($index) {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('aplan-author-holder'+$index);

      // call $anchorScroll()
      $anchorScroll();
    };

 $http.get(issue_url)
        .success(function(response) 
            {
              $scope.issue= response.issue;

                if ($scope.issue[0].action_plan_id.length == 0){
                        $scope.actionplanempty={display:'none'};
                }

                $scope.isAuthor = function($index){
                    if ($scope.issue[0].action_plan_id[$index].id == $rootScope.globals.currentUser.now_id){
                        return { display: block};
                    }
                    
                }

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

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

routerApp.run(function($rootScope, $location, $state) {

    $rootScope.globals = {
        currentUser: {
            now_email: null,
            now_id: null
        }

    };

    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        console.log("change")
      if ($rootScope.loggedInUser == null) {
        // no logged user, redirect to /login
        if ( next.templateUrl === "partials/login.html") {
        } else {
          $state.go('not-signed-in');
        }
      }
    });
  });

routerApp.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);
