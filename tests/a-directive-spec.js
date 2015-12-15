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

		spyOn(ngClickDirective, 'compile');
	});

	it("should compile the ngClick directive on elements that don't contain it", function () {
		var newScope = $rootScope.$new();
		expect(true).toBe(true);
		// To be continued
	});
	
});