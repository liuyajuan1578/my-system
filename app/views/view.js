/**
 * Created by zhangdongming on 2016/12/24.
 */
angular.module('app.view',[
    'app.view.main',
    'app.view.home',
    'app.view.map',
    ])
    .config(['$stateProvider','$urlRouterProvider','$locationProvider',function($stateProvider,$urlRouterProvider,$locationProvider){
        $locationProvider.hashPrefix('');
        $urlRouterProvider.otherwise('/home');
    }]);

