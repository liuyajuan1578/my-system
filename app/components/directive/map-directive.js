/**
 * Created by zhangdongming on 2016/12/24.
 */
'use strict';
angular.module('app.directive.map',[])
    .directive('map',function(){
        return{
            restrict:'AEC',
            link:function(scope,element,attr){
                console.log('this is directive');
                var map = new BMap.Map("container");          // 创建地图实例
                var point = new BMap.Point(116.404, 39.915);  // 创建点坐标
                map.centerAndZoom(point, 15);
            }
        }
    });
