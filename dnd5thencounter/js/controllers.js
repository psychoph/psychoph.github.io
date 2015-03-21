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

    $scope.expThresholdByLevel = [25,50,75,125,250,300,350,450,550,600,800,1100,1250,1400,1600,2000,2100,2400,2800];

    $scope.calculate = function(){


        var arrayLevel = $scope.level - 1;
        var levelEasy = $scope.expThresholdByLevel[arrayLevel];
        if(arrayLevel != 6 && arrayLevel != 16){ // level 7 and 17 are odd and don't follow the formula
            var levelMedium = $scope.expThresholdByLevel[arrayLevel]*2;
        } else if(arrayLevel == 6) {
            var levelMedium = 750;
        } else {
            var levelMedium = 3900;
        }

        var levelHard = levelMedium + levelEasy;
        var levelDeadly = levelHard + levelMedium - (levelEasy/2);

        $scope.easy = $scope.players * levelEasy;
        $scope.medium = $scope.players * levelMedium;
        $scope.hard = $scope.players * levelHard;
        $scope.deadly = $scope.players * levelDeadly;
        $scope.math = $scope.monsters * $scope.experience;
    }
});