;(function() {

	/**
	 * View: MainScreen
	 *
	 * Responsibilities:
	 *   - The Main Screen of the application.
	 *   - Handle the overall dimension (for now fixed)
	 */

	// --------- View Registration --------- //
	brite.registerView("MainScreen", {
		loadTmpl : true,
		parent : "#bodyPage"
	}, {
		create : function(data, config) {
			var dfd = $.Deferred();
			renderer.render("MainScreen", data).done(function(html) {
				var $e = $(html);
				dfd.resolve($e);
			});
			return dfd.promise();
		},

		docEvents : {
		
		},

		postDisplay : function(data, config) {
			var view = this;
			var $e = view.$el;

			brite.display("ProjectList");
			// on Project dataChange, if it is this project, update the project part of the screen
			brite.dao.onDataChange("Project", function(event) {
				var daoEvent = event.daoEvent;
				view.project = daoEvent.result;
				var p = $(document).bFindComponents("ProjectList");
				if (p && p.length > 0) {
					p[0].refresh(c.project.id);
					$e.find(".main-content").empty();
				}
			}, view.id);
		}

	});
	// --------- View Registration --------- //

	// load screen
	$(function() {
		if (renderer.isChromeApp) {
			renderer.$rendererFrame.on("load", function() {
				brite.display("MainScreen");
			});
		} else {
			brite.display("MainScreen");
		}
	});
})();
