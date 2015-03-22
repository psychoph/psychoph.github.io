/**
 * Created by jason on 3/21/15.
 */
var dnd5EncApp  = angular.module('dnd5EncApp', ['ngAria']);

dnd5EncApp.controller('calcCtrl', function($scope){
    $scope.playerCount = 3;
    $scope.playerLevel = 1;
    $scope.monsterCount = 3;
    $scope.experience = 100;
    $scope.challengeRating = 1;

    $scope.playerGroups = [{id: 'player1'}];
    $scope.monsterGroups = [{id: 'monster1'}];

    $scope.easyLvlThresholds = [25,50,75,125,250,300,350,450,550,600,800,1100,1250,1400,1600,2000,2100,2400,2800];
    $scope.mediumLvlThresholds = [50,100,150,250,500,600,750,900,1100,1200,1600,200,2200,2500,2800,3200,3900,4200,4900,5700];
    $scope.hardLvlThresholds = [75,150,225,375,750,900,1100,1400,1600,1900,2400,3000,3400,3800,4300,4800,5900,6300,7300,8500];
    $scope.deadlyLvlThresholds = [100,200,400,500,1100,1400,1700,2100,2400,2800,3600,4500,5100,5700,6400,7200,8800,9500,10900,12700];
    
    $scope.calculate = function(){
        var arrayLevel = $scope.playerLevel - 1;

        $scope.easy = $scope.playerCount * $scope.easyLvlThresholds[arrayLevel];
        $scope.medium = $scope.playerCount * $scope.mediumLvlThresholds[arrayLevel];
        $scope.hard = $scope.playerCount * $scope.hardLvlThresholds[arrayLevel];
        $scope.deadly = $scope.playerCount * $scope.deadlyLvlThresholds[arrayLevel];
        $scope.encounterExp = $scope.monsterCount * $scope.monsterExp;
        $scope.perPlayerExp =  $scope.encounterExp/$scope.playerCount;
        if($scope.monsterCount == 1){
            $scope.encounterMultiplier = 1;
        } else if($scope.monsterCount == 2){
            $scope.encounterMultiplier = 1.5;
        } else if($scope.monsterCount <= 6 && $scope.monsterCount >= 3){
            $scope.encounterMultiplier = 2;
        } else if($scope.monsterCount <= 10 && $scope.monsterCount >= 7){
            $scope.encounterMultiplier = 2.5;
        } else if($scope.monsterCount <= 14 && $scope.monsterCount >= 11){
            $scope.encounterMultiplier = 3;
        } else {
            $scope.encounterMultiplier = 4;
        }

        $scope.encounterCompExp = $scope.monsterCount * $scope.monsterExp * $scope.encounterMultiplier;

        if($scope.encounterCompExp > $scope.hard){
            $scope.encounterDifficulty == 'Deadly';
        } else if ($scope.encounterCompExp > $scope.medium && $scope.encounterCompExp <= $scope.hard){
            $scope.encounterDifficulty == 'Hard';
        } else if($scope.encounterCompExp > $scope.easy && $scope.encounterCompExp <= $scope.medium){
            $scope.encounterDifficulty == 'Medium';
        } else {
            $scope.encounterDifficulty == 'Easy';
        }
    }

    $scope.addNewPlayerGroup = function() {
        var newItemNo = $scope.playerGroups.length+1;
        $scope.playerGroups.push({'countId':'playerCount'+newItemNo,'levelId':'playerLevel'+newItemNo});
    };
    $scope.addNewMonsterGroup = function() {
        var newItemNo = $scope.monsterGroups.length+1;
        $scope.monsterGroups.push({'id':'monster'+newItemNo});
    };
    $scope.removePlayerGroup = function(index){
        $scope.playerGroups.splice(index,1);
    }
});