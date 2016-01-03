describe('aDirective', function () {
	var $compile, $rootScope, $window, ngClickDirective;

	beforeEach(function () {
		$window = {
			location: {
				href: 'initialValue'
			}
		};

		module('ngTouchFaster');

		module(['$provide', function ($provide) {
			$provide.value('$window', $window);
		}])

		inject(['$compile', '$rootScope', 'ngClickDirective', function (_$compile_, _$rootScope_, _ngClickDirective_) {
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			ngClickDirective = _ngClickDirective_[0];
		}]);

		spyOn(ngClickDirective, 'compile').and.callThrough();
	});

	it("should compile the ngClick directive on elements that don't contain it", function () {
		expect(ngClickDirective.compile).not.toHaveBeenCalled();

		var newScope = $rootScope.$new();

		$compile('<a></a>')(newScope);

		expect(ngClickDirective.compile).toHaveBeenCalled();
	});

	it("should compile the ngClick directive just once on elements that already contain it", function () {
		expect(ngClickDirective.compile).not.toHaveBeenCalled();

		var newScope = $rootScope.$new();

		$compile('<a ng-click=""></a>')(newScope);

		expect(ngClickDirective.compile.calls.count()).toBe(1);
	});

	it("should change window.location.href according to the element's href when clicked", function () {
		var element = angular.element('<a href="poop"></a>')
		var newScope = $rootScope.$new();

		$compile(element)(newScope);

		element.triggerHandler('click');

		expect($window.location.href).toBe('poop');
	});

	it("shouldn't change window.location.href if there is no href defined in the element", function () {
		var element = angular.element('<a></a>')
		var newScope = $rootScope.$new();

		$compile(element)(newScope);

		element.triggerHandler('click');

		expect($window.location.href).toBe('initialValue');
	});

	it("should not do any of the above if attribute slow-down is used", function () {
		var newScope = $rootScope.$new();

		$compile('<a slow-down></a>')(newScope);

		expect(ngClickDirective.compile).not.toHaveBeenCalled();
	});
});