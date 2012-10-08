;(function() {
	brite.registerView("MainContent", {
		loadTmpl : true,
		emptyParent : true,
		parent : ".main-content"
	}, {
		create : function(data, config) {
			var view = this;
			view.projectId = data.id;
			var createDfd = $.Deferred();
			brite.dao("Project").getProjectById(view.projectId).done(function(project) {
				renderer.render('MainContent', project).done(function(html) {
					createDfd.resolve($(html));
				});
			});
			return createDfd.promise();
		},

		events : {
			//show group panel view
			"btap;.addBtn" : function(e) {
				$(".subjectWarning").hide();
				$e.find("input[name='title']").val('');
				$e.find("input[name='taskId']").val('');
				$('#myModal').show();
			},

			"btap;.showDeleteBtn" : function(e) {
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
			},
			"btap;.closeBtn" : function(e) {
				$('#myModal').hide();
			},
			"btap;.saveTaskBtn" : function(e) {
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
			},

			"btap;.opBtn" : function(e) {
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
			},

		},

		docEvents : {
			//bind event with refresh contacts
		},

		daoEvents : {
			// on dataChange of contact, just refresh all for now (can be easily optimized)
		},

		postDisplay : function(data, config) {
			var view = this;
			var $e = view.$el;

			$('#myModal').on("keyup", function(event) {
				if (event.which === 27) {
					$('#myModal').hide();
				}
			});
		}

	});
	// --------- View Private Methods --------- //
	function refresh() {
		var view = this;
		var $e = view.$el;
		setTimeout(function() {
			brite.dao("Project").getProjectById(view.projectId).done(function(project) {
				renderer.render('MainContent').done(function(html) {
					$e.html(html);
				});

			});
		}, 100)
	}

	function refreshList() {
		var p = $(document).bFindComponents("ProjectList");
		if (p && p.length > 0) {
			p[0].refresh();
		}
	}

	// --------- /View Private Methods --------- //
})();

