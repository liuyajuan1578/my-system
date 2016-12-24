/**
 * Created by zhangdongming on 2016/12/24.
 */
angular.module('app.view.map',[
    'ui.router',
    'ui.bootstrap'
])
    .config(['$stateProvider',function($stateProvider){
        $stateProvider
            .state('main.map',{
                url:'/map',
                templateUrl:'views/map/map.html',
                controller:"MapCtrl"
            })
    }])
    .controller('MapCtrl',function($scope,$timeout){
        $scope.initMap=function(){
            var map=new BMap.Map('map-container');
            var point=new BMap.Point(116.404,39.915);
            map.centerAndZoom(point);
        };

    });
