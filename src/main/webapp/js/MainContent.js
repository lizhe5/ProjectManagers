/**
 * Component: MainContent
 *
 * Responsibilities:
 *   - Manage a single project screen
 *   - Manage the task list of a project
 *
 */
;(function() {
	(function($) {

		// --------- Component Interface Implementation ---------- //
		function MainContent() {
		};

		MainContent.prototype.create = function(data, config) {
			var c = this;
			c.projectId = data.id;
			var dfd = $.Deferred();

			brite.dao("Project").getProjectById(c.projectId).done(function(project) {
				var html = $("#tmpl-MainContent").render(project);
				var $e = $(html);
				dfd.resolve($e);
			});
			return dfd.promise();
		}


		MainContent.prototype.postDisplay = function(data, config) {
			var c = this;
			var $e = c.$element;

			$e.on("btap", '.addBtn', function(event) {
				$(".subjectWarning").hide();
				$('#myModal').show();
			});

			$e.on("btap", '.showDeleteBtn', function(event) {
				// create the delete-controls element
				var $controls = $($("#tmpl-MainContent-delControls").render());
				$e.find(".deleteControl").html($controls);

				var $inner = $e.find(".delete-controls-inner");
				//$inner.css("transform","scale(2)");
				setTimeout(function() {
					$inner.addClass("show");
				}, 10);

				$controls.on("click", ".cancelBtn", function() {
					$controls.find(".delete-controls-inner").removeClass("show").on("btransitionend", function() {
						$controls.remove();
					});
				});

				$controls.on("click", ".deleteBtn", function() {
					brite.dao("Project").remove(c.projectId);
				});

			});

			$e.on("btap", '.closeBtn', function(event) {
				$('#myModal').hide();
			});

			$e.on("btap", '.saveTaskBtn', function(event) {
				var projectId = c.projectId;
				var status = $e.find("select[name='status']").val();
				var title = $('#myModal').find("input[name='title']").val();
				brite.dao("Task").updateTask("Task", projectId, title, status).done(function() {
					$('#myModal').hide();
					c.refresh();
				});
			});

			$e.on("change", '.op', function() {
				var id = $(this).attr("data-value");
				var op = $(this).val();
				brite.dao("Task").opTask(id, op).done(function() {
					c.refresh();
				});
			});

			$('#myModal').on("keyup", function(event) {
				if (event.which === 27) {
					$('#myModal').hide();
				}
			});
		}

		// --------- /Component Interface Implementation ---------- //

		// --------- Component Public API --------- //
		MainContent.prototype.refresh = function() {
			var c = this;
			var $e = c.$element;
			setTimeout(function() {
				brite.dao("Project").getProjectById(c.projectId).done(function(project) {
					var html = $("#tmpl-MainContent").render(project);
					$e.html(html);
				});
			}, 100)

		}

		// --------- /Component Public API --------- //

		// --------- Component Private Methods --------- //
		function privateMethodOne() {
			var c = this;

		}

		function showMsg(msg) {
			var c = this;
			var $e = $(c);
			$e.find(".msg").html(msg).show();
		}

		function hideMsg() {
			var c = this;
			var $e = c.$element;
			$e.find(".msg").hide();
		}

		function refreshList() {
			var p = $(document).bFindComponents("ProjectList");
			if (p && p.length > 0) {
				p[0].refresh();
			}
		}

		// --------- /Component Private Methods --------- //

		// --------- Component Registration --------- //
		brite.registerView("MainContent", {
			loadTmpl : true,
			emptyParent : true,
			parent : ".main-content"
		}, function() {
			return new MainContent();
		});
		// --------- Component Registration --------- //

	})(jQuery);

})();
