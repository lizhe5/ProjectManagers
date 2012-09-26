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
			var createDfd = $.Deferred();
			brite.dao("Project").getProjectById(c.projectId).done(function(project) {
				var message = {
					templateName : 'tmpl-MainContent',
					data : project
				};
				renderer.render(message).done(function(html) {
					createDfd.resolve($(html));
				});
			});
			return createDfd.promise();
		}


		MainContent.prototype.postDisplay = function(data, config) {
			var c = this;
			var $e = c.$element;

			$e.on("btap", '.addBtn', function(event) {
				$(".subjectWarning").hide();
				$e.find("input[name='title']").val('');
				$e.find("input[name='taskId']").val('');
				$('#myModal').show();
			});

			$e.on("btap", '.showDeleteBtn', function(event) {
				// create the delete-controls element
				var $controls = $($("#tmpl-MainContent-delControls").html());
				$e.find(".deleteControl").html($controls);

				var $inner = $e.find(".delete-controls-inner");
				//$inner.css("transform","scale(2)");
				setTimeout(function() {
					$inner.addClass("show");
				}, 10);
				$e.on("click", ".cancelBtn", function() {
					$e.find(".delete-controls-inner").removeClass("show").on("btransitionend", function() {
						$controls.remove();
						$e.find(".showDeleteBtn").show();
					});
				});

				$e.on("click", ".deleteBtn", function() {
					brite.dao("Project").remove(c.projectId);
				});
				$(this).hide();
			});

			$e.on("btap", '.closeBtn', function(event) {
				$('#myModal').hide();
			});

			$e.on("btap", '.saveTaskBtn', function(event) {
				var projectId = c.projectId;
				var id = $('#myModal').find("input[name='taskId']").val();
				var title = $('#myModal').find("input[name='title']").val();
				if (title == "") {
					return;
				};
				brite.dao("Task").updateTask("Task", id, projectId, title).done(function() {
					$('#myModal').hide();
					c.refresh();
				});
			});

			$e.on("btap", '.opBtn', function() {
				var obj = $(this).bEntity();
				var op = $(this).attr("op");
				if (op == 'edit') {
					var title = $(this).attr("data-value");
					$e.find("input[name='title']").val(title);
					$e.find("input[name='taskId']").val(obj.id);
					$('#myModal').show();
				} else {
					brite.dao("Task").opTask(obj.id, op).done(function() {
						c.refresh();
					});
				};
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
					var message = {
						templateName : 'tmpl-MainContent',
						data : {
						}
					};
					renderer.render(message).done(function(html) {
						$e.html(html);
					});

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
