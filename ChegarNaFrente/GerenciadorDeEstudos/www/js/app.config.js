var app = angular.module("app", ['controllers','ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl : 'views/home.html',
        controller : 'HomeCtrl'
    })
    .when('/edital/new', {
        templateUrl : 'views/edital.html',
        controller : 'NovoEditalCtrl'
    })
    .when('/edital/import/new', {
        templateUrl : 'views/edital.html',
        controller : 'NovoEditalFromImportController'
    })
    .when('/edital/import', {
        templateUrl : 'views/importar.html',
        controller : 'ImportarEditalCtrl'
    })
    .otherwise({
        redirectTo : '/'
    })
}]).run();

var controllers = angular.module("controllers", []);

// -TODO : Refactory this.

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

app.directive('onLongPress', function($timeout) {
	return {
		restrict: 'A',
		link: function($scope, $elm, $attrs) {
			$elm.bind('touchstart', function(evt) {
				// Locally scoped variable that will keep track of the long press
				$scope.longPress = true;

				// We'll set a timeout for 600 ms for a long press
				$timeout(function() {
					if ($scope.longPress) {
						// If the touchend event hasn't fired,
						// apply the function given in on the element's on-long-press attribute
						$scope.$apply(function() {
							$scope.$eval($attrs.onLongPress)
						});
					}
				}, 600);
			});

			$elm.bind('touchend', function(evt) {
				// Prevent the onLongPress event from firing
				$scope.longPress = false;
				// If there is an on-touch-end function attached to this element, apply it
				if ($attrs.onTouchEnd) {
					$scope.$apply(function() {
						$scope.$eval($attrs.onTouchEnd)
					});
				}
			});
		}
	};
})
