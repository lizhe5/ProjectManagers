/**
 * Component: ProjectList
 *
 * Responsibilities:
 *   - Manage the list of project (create, delete, select)
 *
 */
;(function() {
	(function($) {

		// --------- Component Interface Implementation ---------- //
		function ProjectList() {
		};

		ProjectList.prototype.create = function(data, config) {
			var html = $("#tmpl-ProjectList").render(data);
			var $e = $(html);
			return $e;
		}


		ProjectList.prototype.postDisplay = function(data, config) {
			var c = this;
			var $e = c.$element;

			$e.on("btap", ".item", function() {
				var id = $(this).attr("data-value");
				$e.find(".projectListContain").find("li").removeClass("active");
				$(this).addClass("active");
				brite.display("MainContent", {
					id : id
				});
			});

			$e.on("btap", ".newBtn", function() {
				brite.display("MainContent");
			});
			c.refresh.call(c);
		}

		// --------- /Component Interface Implementation ---------- //

		// --------- Component Public API --------- //
		ProjectList.prototype.refresh = function(id) {
			var c = this;
			var $e = c.$element;
			brite.dao("Project").list().done(function(projectList) {
				var $html = $("#tmpl-ProjectList-item").render(projectList);
				$e.find(".projectListContain").html($html);
				$e.find("[data-value='" + id + "']").addClass("active");
				console.log(projectList.length);
			});
		}


		ProjectList.prototype.refreshContent = function() {
			brite.display("MainContent");
		}

		// --------- /Component Public API --------- //

		// --------- Component Private Methods --------- //
		function privateMethodOne() {
			var c = this;

		}

		// --------- /Component Private Methods --------- //

		// --------- Component Registration --------- //
		brite.registerView("ProjectList", {
			loadTmpl : true
		}, function() {
			return new ProjectList();
		});
		// --------- Component Registration --------- //

	})(jQuery);

})();
