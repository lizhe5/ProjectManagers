;(function() {
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
			"DO_SELECT_PROJECT" : function(event, extra) {
				var view = this;
				var $mainPanelsInner = view.$el.find(".MainView-panels-inner");

				var $folderViewPanel = $("<div class='MainView-folderViewPanel current'></div>");

				var oldIdx = brite.array.getIndex(view.folderList, "id", view.currentFolderId);
				view.currentFolderId = extra.id;
				var newIdx = brite.array.getIndex(view.folderList, "id", view.currentFolderId);

				var forward = (oldIdx < newIdx);
				
				brite.display("MainContent", $folderViewPanel, {
					id : extra.id
				}).done(function(result) {
					view.lastChild = $mainPanelsInner.children().filter(":last").removeClass("current").addClass("old");
					var w = view.lastChild.width();
					var newLeft = 0;
					if (view.lastChild.length > 0) {
						if (forward) {
							newLeft = view.lastChild.position().left + w + 10;
						} else {
							newLeft = view.lastChild.position().left - w - 10;
						}
					}
					$folderViewPanel.css("left", newLeft + "px");
					$mainPanelsInner.append($folderViewPanel);
					$mainPanelsInner.css("transform", "translateX(" + (-1 * newLeft) + "px)");
					noteListView = result;
				});
			}

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
					p[0].refresh(view.project.id);
					$e.find(".MainView-panels-inner").empty();
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
