/**
 * Component: MainScreen
 *
 * Responsibilities:
 *   - MainScreen of the application.
 *   - Will create all the necessary sub components
 *   - Manage all the application wide events
 *
 */
;(function() {
	(function($) {

		// --------- Component Interface Implementation ---------- //
		function MainScreen() {
		};

		MainScreen.prototype.create = function(data, config) {
			var html = $("#tmpl-MainScreen").render(data);
			var $e = $(html);
			return $e;
		}


		MainScreen.prototype.postDisplay = function(data, config) {
			var c = this;
			var $e = c.$element;

			brite.display("ProjectList", null, {
				parent : c.$element.find(".left-content")
			});
			brite.display("MainContent", null, {
				parent : c.$element.find(".main-content")
			});
		}

		// --------- /Component Interface Implementation ---------- //

		// --------- Component Public API --------- //
		MainScreen.prototype.methodOne = function(someArgs) {
		}

		// --------- /Component Public API --------- //

		// --------- Component Private Methods --------- //
		function privateMethodOne() {
			var c = this;

		}

		// --------- /Component Private Methods --------- //

		// --------- Component Registration --------- //
		brite.registerView("MainScreen", {
			loadTmpl : true
		}, function() {
			return new MainScreen();
		});
		// --------- Component Registration --------- //

	})(jQuery);

})();
