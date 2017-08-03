"use strict";
angular.module("app",["ui.router"]);

"use strict";
angular.module("app").config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
	$stateProvider.state("main",{
		url:"/main",
		templateUrl:"view/main.html",
		controller:"mainCtrl"
	}).state("position",{
		url:"/position/:id",
		templateUrl:"view/position.html",
		controller:"positionCtrl"
	}).state("company",{
		url:"/company/:id",
		templateUrl:"view/company.html",
		controller:"companyCtrl"
	});
	$urlRouterProvider.otherwise("main");
}]);


"use strict";
angular.module("app").controller("companyCtrl", ["$http","$state","$scope", function($http,$state,$scope){
	$http.get("data/company.json?id="+$state.params.id)
		 .success(function(resp){
		 	$scope.company = resp;
		 });
}]);
"use strict";
angular.module("app").controller("mainCtrl", ["$http", "$scope", function($http,$scope){
	$http.get("data/positionList.json").success(function(resp){
		$scope.list = resp;
	});
}]);
"use strict";
angular.module("app").controller("positionCtrl", ["$q","$http","$state","$scope", function($q,$http,$state,$scope){
	$scope.isLogin = false;
	function getPosition(){
		var def = $q.defer();
		$http.get("./data/position.json?id="+$state.params.id).success(function(resp){
			$scope.position = resp;
			def.resolve(resp);
		}).error(function(err){
			def.reject(err);
		});
		return def.promise;
	}
	function getCompany(id){
		$http.get("./data/company.json?id="+id).success(function(resp){
			$scope.company = resp;
		})
	}
	getPosition().then(function(obj){
		getCompany(obj.companyId);
	});
	
}]);
"use strict";
angular.module("app").directive("appCompany",[function(){
	return {
		restrict: "A",
		replace: true,
		scope:{
			com:"="
		},
		templateUrl: "view/template/company.html"
	};
}]);
"use strict";
angular.module("app").directive("appFoot",[function(){
	return {
		restrict: "A",
		replace: true,
		templateUrl: "view/template/foot.html"
	};
}]);
"use strict";
angular.module("app").directive("appHead",[function(){
	return {
		restrict: "A",
		replace: true,
		templateUrl: "view/template/head.html"
	};
}]);
"use strict";
angular.module("app").directive("appHeadBar",[function(){
	return {
		restrict: "A",
		replace: true,
		templateUrl: "view/template/headBar.html",
		scope:{
			text:"@"
		},
		link:function($scope){
			$scope.back = function(){
				window.history.back(-1);
			}
		}
	};
}]);
"use strict";
angular.module("app").directive("appPositionClass",[function(){
	return {
		restrict : "A",
		replace : true,
		scope : {
			com : "="
		},
		templateUrl: "view/template/positionClass.html",
		link:function($scope){
			$scope.showPositionList = function(idx){
				$scope.positionList = $scope.com.positionClass[idx].positionList;
				$scope.isActive = idx;
			}
			$scope.showPositionList(0);
		}
	};
}]);
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
"use strict";
angular.module("app").directive("appPositionList",[function(){
	return {
		restrict: "A",
		replace: true,
		templateUrl: "view/template/positionList.html",
		scope:{
			data:"="
		}
	};
}]);