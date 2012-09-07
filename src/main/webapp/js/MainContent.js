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
			var dfd = $.Deferred();
			var createDfd = $.Deferred();
			data = data || {};
			if (data.id) {
				brite.dao.invoke("getProjectById", "Project", data.id).done(function(project) {
					dfd.resolve(project);
				});

			} else {
				dfd.resolve({});
			}
			dfd.done(function(project) {
				if (project.id) {
					c.projectId = project.id;
				};
				var html = $("#tmpl-MainContent").render(project);
				var $e = $(html);
				createDfd.resolve($e);
			});
			return createDfd.promise();
		}


		MainContent.prototype.postDisplay = function(data, config) {
			var c = this;
			var $e = c.$element;

			$e.on("btap", '.saveBtn', function(event) {
				var id = $e.find("input[name='id']").val();
				var subject = $e.find("input[name='subject']").val();
				var desc = $e.find("textarea[name='description']").val();
				$(".subjectWarning").hide();
				if (subject != "") {
					var data = {
						id : id,
						subject : subject,
						description : desc
					};
					if (id && id != "") {
						brite.dao.update("Project", id, data).done(function(project) {
							refreshList(project.id);
							showMsg(c, "Save success!");
						});
					} else {
						brite.dao.create("Project", data).done(function(project) {
							$e.find("input[name='id']").val(project.id);
							refreshList(project.id);
							showMsg(c, "Save success!");
						});
					};
				} else {
					$(".subjectWarning").show();
				};
			});

			$e.on("btap", '.deleteBtn', function(event) {
				var id = $e.find("input[name='id']").val();
				if (id && id != "") {
					brite.dao.remove("Project", id).done(function() {
						refreshList();
					});
				};
			});

			$e.on("btap", '.addBtn', function(event) {
				$(".subjectWarning").hide();
				var id = $e.find("input[name='id']").val();
				if (id != "") {
					$('#myModal').show();
				} else {
					var subject = $e.find("input[name='subject']");
					if (subject.val() == "") {
						$(".subjectWarning").show();
					} else {
						var desc = $e.find("textarea[name='description']").val();
						var data = {
							id : id,
							subject : subject.val(),
							description : desc
						};
						brite.dao.create("Project", data).done(function(project) {
							$e.find("input[name='id']").val(project.id);
							refreshList(project.id);
							$('#myModal').show();
						});

					};
				};
			});

			$e.on("btap", '.closeBtn', function(event) {
				$('#myModal').hide();
			});

			$e.on("btap", '.saveTaskBtn', function(event) {
				var projectId = $e.find("input[name='id']").val();
				var status = $e.find("select[name='status']").val();
				var title = $('#myModal').find("input[name='title']").val();
				brite.dao.invoke("updateTask", "Task", projectId, title, status).done(function() {
					$('#myModal').hide();
					c.refresh();
					showMsg(c, "Save success!");
				});
			});

			$e.on("change", '.op', function() {
				var id = $(this).attr("data-value");
				var op = $(this).val();
				brite.dao.invoke("opTask", "Task", id, op).done(function() {
					c.refresh();
					showMsg(c, "Save success!");
				});
			});
			
			$('#myModal').on("keyup", function(event){
				// press ESC
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
			var projectId = $e.find("input[name='id']").val();
			setTimeout(function() {
				brite.dao.invoke("getProjectById", "Project", projectId).done(function(project) {
					var html = $("#tmpl-MainContent").render(project);
					$e.html(html);
				});
			}, 300)
		}

		// --------- /Component Public API --------- //

		// --------- Component Private Methods --------- //
		function privateMethodOne() {
			var c = this;

		}

		function showMsg(c, msg) {
			var $e = c.$element;
			$e.find(".msg").html(msg).show();
		}

		function hideMsg() {
			var c = this;
			var $e = c.$element;
			$e.find(".msg").hide();
		}

		function refreshList(projectId) {
			var p = $(document).bFindComponents("ProjectList");
			if (p && p.length > 0) {
				setTimeout(function() {
					p[0].refresh(projectId);
				}, 300)
				if (!projectId) {
					p[0].refreshContent();
				};
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
