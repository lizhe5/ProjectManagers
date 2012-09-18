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
				var obj = $(this).bEntity();
				$e.find(".projectListContain").find("li").removeClass("active");
				$(this).closest("li").addClass("active");
				brite.display("MainContent", {
					id : obj.id
				});
			});

			$e.on("btap", ".editBtn", function() {
				var obj = $(this).bEntity();
				$e.find(".projectListContain").find("li").removeClass("active");
				$(this).closest("li").addClass("active");
				obj.subject=$(this).attr("data-value");
				editProject(obj);
			});

			$e.on("btap", ".newBtn", function() {
				editProject();
			});

			function editProject(project) {
				if ($e.find(".addItem").length < 1) {
					var html = $("#tmpl-ProjectList-add-item").render({});
					$e.find(".addProjectContain").append(html);
				}

				$e.find(".addItem input[type='text']").focus().on("keyup", function(event) {
					var data = {
						subject : $(this).val()
					};
					// press ENTER
					if (event.which === 13) {
						if (project && project.id) {
							data = {
								subject : $(this).val(),
								id : project.id
							};
							brite.dao("Project").update(data).done(function(project) {
								$e.find(".addItem").remove();
								brite.display("MainContent", {
									id : project.id
								});
							});
						} else {
							brite.dao("Project").create(data).done(function(project) {
								$e.find(".addItem").remove();
								brite.display("MainContent", {
									id : project.id
								});
							});
						};

					}
					// press ESC
					else if (event.which === 27) {
						$e.find(".addItem").remove();
					}
				}).on("blur", function() {
					$e.find(".addItem").remove();
				});

				if (project) {
					$e.find(".addItem input[name='addItem']").val(project.subject);
				};
			}


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
				$e.find("[data-entity-id='" + id + "']").addClass("active");
			});
		}

		// --------- /Component Public API --------- //

		// --------- Component Registration --------- //
		brite.registerView("ProjectList", {
			loadTmpl : true
		}, function() {
			return new ProjectList();
		});
		// --------- Component Registration --------- //

	})(jQuery);

})();
