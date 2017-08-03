"use strict";
angular.module("app").directive("appPositionInfo",[function(){
	return {
		restrict: "A",
		replace: true,
		templateUrl: "view/template/positionInfo.html",
		scope: {
			isActive: "=",
			isLogin:"=",
			pos:"="
		},
		link:function($scope){
			$scope.imagePath = $scope.isActive ? "img/star-active.png" : "img/star.png";
		}
	};
}]);