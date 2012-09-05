;(function() {

	/**
	 * Component: MainContent
	 *
	 * Responsibilities:
	 *   - The Main Screen of the application.
	 *   - Handle the overall dimension (for now fixed)
	 *
	 * Constructor Data:
	 *   - none
	 *
	 * Component API:
	 *  format: [method_name]([args]) : [concise description]
	 *  - none
	 *
	 * Component Events:
	 *  - MainContent_DO_SHOW_CHARITIES: Show the charities
	 *  - ..TODO: put the other DO_SHOW_ events here ...
	 *  - MainContent_DO_CLOSE_POPUP
	 *
	 */
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
				if (subject != "") {
					var data = {
						id : id,
						subject : subject,
						description : desc
					};
					if (id && id != "") {
						brite.dao.update("Project", id, data).done(function(project) {
							refreshList(project.id);
						});
					} else {
						brite.dao.create("Project", data).done(function(project) {
							refreshList(project.id);
						});
					};
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
				var id = $e.find("input[name='id']").val();
				if (id != "") {
					$('#myModal').show();
				} else {
					var subject = $e.find("input[name='subject']");
					if (subject.val() == "") {
						alert("Please input subject");
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
				});
			});

			$e.on("change", '.op', function() {
				var id = $(this).attr("data-value");
				var op = $(this).val();
				brite.dao.invoke("opTask", "Task", id, op).done(function() {
					c.refresh();
				});
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

		function refreshList(projectId) {
			var p = $(document).bFindComponents("ProjectList");
			if (p && p.length > 0) {
				setTimeout(function() {
					p[0].refresh(projectId);
				}, 300)

			}
		}

		// --------- /Component Private Methods --------- //

		// --------- Component Registration --------- //
		brite.registerComponent("MainContent", {
			loadTmpl : true,
			emptyParent : true,
			parent : ".main-content"
		}, function() {
			return new MainContent();
		});
		// --------- Component Registration --------- //

	})(jQuery);

})();
