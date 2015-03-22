/**
 * Created by jason on 3/21/15.
 */
var dnd5EncApp  = angular.module('dnd5EncApp', ['ngAria']);

dnd5EncApp.controller('calcCtrl', function($scope){
    $scope.playerGroups = [{'id':1,'count':3,'level':1}];
    $scope.monsterGroups = [{'id':1,'count':3,'experience':100}];

    $scope.easyLvlThresholds = [25,50,75,125,250,300,350,450,550,600,800,1100,1250,1400,1600,2000,2100,2400,2800];
    $scope.mediumLvlThresholds = [50,100,150,250,500,600,750,900,1100,1200,1600,200,2200,2500,2800,3200,3900,4200,4900,5700];
    $scope.hardLvlThresholds = [75,150,225,375,750,900,1100,1400,1600,1900,2400,3000,3400,3800,4300,4800,5900,6300,7300,8500];
    $scope.deadlyLvlThresholds = [100,200,400,500,1100,1400,1700,2100,2400,2800,3600,4500,5100,5700,6400,7200,8800,9500,10900,12700];
    $scope.multiplier = [1,1.5,2,2.5,3,4];
    
    $scope.calculate = function(){
        var multiplierId = 0;
        $scope.easy = 0;
        $scope.medium = 0;
        $scope.hard = 0;
        $scope.deadly = 0;
        $scope.encounterExp = 0;
        $scope.totalMonsterCount = 0;
        $scope.totalPlayerCount = 0;
        $scope.encounterExp  = 0;

        angular.forEach($scope.playerGroups,function(players,key){
            var levelId = players.level - 1;
            $scope.totalPlayerCount = parseInt($scope.totalPlayerCount) + parseInt(players.count);
            $scope.easy = $scope.easy + players.count * $scope.easyLvlThresholds[levelId];
            $scope.medium = $scope.medium+ players.count * $scope.mediumLvlThresholds[levelId];
            $scope.hard = $scope.hard + players.count * $scope.hardLvlThresholds[levelId];
            $scope.deadly = $scope.deadly + players.count * $scope.deadlyLvlThresholds[levelId];
        },$scope);

        angular.forEach($scope.monsterGroups,function(monsters,key){
            $scope.totalMonsterCount = parseInt($scope.totalMonsterCount) + parseInt(monsters.count);
            $scope.encounterExp = $scope.encounterExp + monsters.experience * monsters.count;
        },$scope);

         if($scope.totalMonsterCount == 2){
             multiplierId = 1;
        } else if($scope.totalMonsterCount <= 6 && $scope.totalMonsterCount >= 3){
             multiplierId= 2;
        } else if($scope.totalMonsterCount <= 10 && $scope.totalMonsterCount >= 7){
             multiplierId = 3;
        } else if($scope.totalMonsterCount <= 14 && $scope.totalMonsterCount >= 11){
             multiplierId = 4;
        } else if ($scope.totalMonsterCount >= 15){
             multiplierId = 5;
        }

        if($scope.totalPlayerCount < 3 && multiplierId != 5){
            multiplierId++;
        } else if($scope.totalPlayerCount >5 && multiplierId != 0){
            multiplierId--;
        }

        $scope.encounterMultiplier = $scope.multiplier[multiplierId];
        $scope.encounterCompExp = $scope.encounterExp * $scope.encounterMultiplier;
        $scope.perPlayerExp =  $scope.encounterExp/$scope.totalPlayerCount;

        if($scope.encounterCompExp > $scope.hard){
            $scope.encounterDifficulty = 'Deadly';
        } else if ($scope.encounterCompExp > $scope.medium && $scope.encounterCompExp <= $scope.hard){
            $scope.encounterDifficulty = 'Hard';
        } else if($scope.encounterCompExp > $scope.easy && $scope.encounterCompExp <= $scope.medium){
            $scope.encounterDifficulty = 'Medium';
        } else {
            $scope.encounterDifficulty = 'Easy';
        }
    }

    $scope.addNewPlayerGroup = function() {
        var newItemNo = $scope.playerGroups.length+1;
        $scope.playerGroups.push({id:newItemNo,count:3,level:1});
        $scope.calculate();
    };
    $scope.addNewMonsterGroup = function() {
        var newItemNo = $scope.monsterGroups.length+1;
        $scope.monsterGroups.push({'id':newItemNo,'count':3,'experience':100});
        $scope.calculate();
    };
    $scope.removePlayerGroup = function(index){
        $scope.playerGroups.splice(index,1);
        $scope.calculate();
    }

    $scope.removeMonsterGroup = function(index){
        $scope.monsterGroups.splice(index,1);
        $scope.calculate();
    }
});