/**
 * Created by zhangdongming on 2016/12/24.
 */
angular.module('app.view.map',[
    'ui.router',
    'ui.bootstrap'
])
    .config(['$stateProvider'],function($stateProvider){
        $stateProvider
            .state('main.group',{
                url:'group',
                templateUrl:'view/map/map.html',
                controller:"MapCtrl"
            })
    })
    .controller('MapCtrl',function($scope){

    });
