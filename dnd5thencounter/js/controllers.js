/**
 * Created by jason on 3/21/15.
 */
var dnd5EncApp  = angular.module('dnd5EncApp', ['ngAria']);

dnd5EncApp.controller('playerCalcCtrl', function($scope){
    $scope.math = 0;
    $scope.players = 3;
    $scope.level = 1;
    $scope.calculate = function(){
        $scope.math = $scope.players * $scope.level;
    }

});

dnd5EncApp.controller('monstersCalcCtrl', function($scope){
    $scope.monsters = 3;
    $scope.experience = 100;
    $scope.challengeRating = 1;

    $scope.calculate = function(){
        $scope.math = $scope.monsterss * $scope.experience;
    }
});