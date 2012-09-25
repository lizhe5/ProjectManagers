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
			var html = $("#tmpl-MainScreen").html();
			return $(html);
		}


		MainScreen.prototype.postDisplay = function(data, config) {
			var c = this;
			var $e = c.$element;

			brite.display("ProjectList", null, {
				parent : c.$element.find(".left-content")
			});
			// on Project dataChange, if it is this project, update the project part of the screen
			brite.dao.onDataChange("Project", function(event) {
				var daoEvent = event.daoEvent;
				c.project = daoEvent.result;
				var p = $(document).bFindComponents("ProjectList");
				if (p && p.length > 0) {
					p[0].refresh(c.project.id);
					$e.find(".main-content").empty();
				}
			}, c.id);
		}


		MainScreen.prototype.destroy = function() {
			$(document).off("." + this.id);
			brite.dao.offAny(this.id);
		}

		// --------- /Component Interface Implementation ---------- //

		// --------- Component Registration --------- //
		brite.registerView("MainScreen", {
			loadTmpl : true
		}, function() {
			return new MainScreen();
		});
		// --------- Component Registration --------- //

	})(jQuery);

})();
