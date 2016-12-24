/**
 * Created by zhangdongming on 2016/12/24.
 */
'use strict';
angular.module('app.view.main',['ui.router'])
    .config(['$stateProvider'],function($stateProvider){
       $stateProvider
           .state('main',{
               abstract:true,
               url:'',
               templateUrl:'views/main/main.html',
               controller:function($rootScope,$state){

               }
           })
    });
