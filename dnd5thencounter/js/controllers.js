/**
 * Created by jason on 3/21/15.
 */
var dnd5EncApp  = angular.module('dnd5EncApp', ['ngAria']);

dnd5EncApp.controller('playerCalcCtrl', function($scope){
    $scope.math = $scope.players * $scope.level;

});

dnd5EncApp.controller('monstersCalcCtrl', function($scope){

});