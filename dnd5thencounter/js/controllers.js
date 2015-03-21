/**
 * Created by jason on 3/21/15.
 */
var dnd5EncApp  = angular.module('dnd5EncApp', ['ngAria']);

dnd5EncApp.controller('calcCtrl', function($scope){
    $scope.players = 3;
    $scope.level = 1;
    $scope.monsters = 3;
    $scope.experience = 100;
    $scope.challengeRating = 1;

    $scope.calculate = function(){
        $scope.easy = $scope.players * $scope.level;
        $scope.medium = $scope.players * $scope.level;
        $scope.hard = $scope.players * $scope.level;
        $scope.deadly = $scope.players * $scope.level;
        $scope.math = $scope.monsters * $scope.experience;
    }
});