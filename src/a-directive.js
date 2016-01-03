/**
 * Extra directive for anchor elements. Gets rid of the 300ms delay of mobile browsers.
 */
angular.module('ngTouchFaster').directive('a', [
	'ngClickDirective', '$window',
	function (ngClickDirective, $window) {
		return {
			restrict: 'E',
			link: function (scope, element, attrs) {
				// If the attribute 'slow-down' is found, don't accelerate this anchor
				if (angular.isDefined(attrs.slowDown)) {
					return;
				}

				// If there isn't an ngClick in this element, compile the directive here to get the event accelaration
				if (angular.isUndefined(attrs.ngClick)) {
					ngClickDirective[0].compile()(scope, element, attrs);
				}

				// When the click even handler is executed by angular-touch, change the location.href manually
				element.on('click', function () {
					// If there isn't an href attribute, do nothing
					if (attrs.href) {
						$window.location.href = attrs.href;
					}
				});
			}
		}
	}]);