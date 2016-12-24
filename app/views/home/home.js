/**
 * Created by zhangdongming on 2016/12/24.
 */
angular.module('app.view.home',[
        'ui.router',
        'ui.bootstrap'
    ])
    .config(['$stateProvider',function($stateProvider){
        $stateProvider
            .state('main.home',{
                url:'/home',
                templateUrl:'views/home/home.html',
                controller:"HomeCtrl"
            })
    }])
    .controller('HomeCtrl',function($scope){

    });
