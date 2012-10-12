;(function() {
	brite.registerView("ProjectList", {
		loadTmpl : true,
		emptyParent : true,
		parent : ".left-content"
	}, {
		create : function(data, config) {
			var createDfd = $.Deferred();
			renderer.render('ProjectList').done(function(html) {
				createDfd.resolve($(html));
			});
			return createDfd.promise();
		},

		events : {
			//show group panel view
			"btap;.item" : function(e) {
				var view = this;
				var $e = view.$el;
				var obj = $(e.currentTarget).bEntity();
				$e.find(".projectListContain").find("li").removeClass("active");
				$(e.currentTarget).closest("li").addClass("active");
				var id = obj == null ? "" : obj.id;
				$(e.currentTarget).trigger("DO_SELECT_PROJECT", {
					id : id
				});
			},
			"btap;.editBtn" : function(e) {
				var view = this;
				var $e = view.$el;
				var obj = $(e.currentTarget).bEntity();
				$e.find(".projectListContain").find("li").removeClass("active");
				$(e.currentTarget).closest("li").addClass("active");
				obj.subject = $(e.currentTarget).attr("data-value");
				editProject.call(view, obj);
			},
			"btap;.newBtn" : function(e) {
				var view = this;
				var $e = view.$el;
				editProject.call(view);
			},

		},

		docEvents : {
			"DO_SELECT_PROJECT" : function(event, extra) {
				var view = this;
				var id = extra.id; 
				
				view.$el.find("li.sel").removeClass("sel");
				view.$el.find("i.icon-folder-open").removeClass("icon-folder-open").addClass("icon-folder-close");

				// select the li
				var $selectedLi = view.$element.find("li[data-obj_id='" + id + "']");
				$selectedLi.addClass("sel");
				$selectedLi.find("i.icon-folder-close").removeClass("icon-folder-close").addClass("icon-folder-open");

				// keep that for dataChangeEvent (to keep the item selected)
				view.selectedFolderId = id;
			}

		},

		daoEvents : {
			// on dataChange of contact, just refresh all for now (can be easily optimized)
		},

		postDisplay : function(data, config) {
			var view = this;
			var $e = view.$el;

			view.refresh.call(view);
		},
		refresh : function(id) {
			var view = this;
			var $e = view.$el;
			brite.dao("Project").list().done(function(projectList) {
				renderer.render('ProjectList-item', projectList).done(function(html) {
					$e.find(".projectListContain").html(html);
					$e.find("[data-entity-id='" + id + "']").addClass("active");
					if (!id) {
						var a = $e.find(".projectListContain a");
						if (a.length > 0) {
							a = $(a.get(0));
							a.trigger("btap");
						};
					};
				});

			});
		}

	});
	// --------- View Private Methods --------- //

	function editProject(project) {
		var view = this;
		var $e = view.$el;

		if ($e.find(".addItem").length < 1) {
			var html = $("#tmpl-ProjectList-add-item").html();
			$e.find(".addProjectContain").append(html);
		}

		$e.find(".addItem input[type='text']").focus().on("keyup", function(event) {
			var data = {
				subject : $(this).val()
			};
			// press ENTER
			if (event.which === 13) {
				if ($(this).val() == "") {
					return;
				};
				if (project && project.id) {
					data = {
						subject : $(this).val(),
						id : project.id
					};

					brite.dao("Project").update(data).done(function(project) {
						$e.find(".addItem").remove();
						brite.display("MainContent", null, {
							id : project.id
						});
					});
				} else {
					brite.dao("Project").create(data).done(function(project) {
						$e.find(".addItem").remove();
						brite.display("MainContent", null, {
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

	// --------- /View Private Methods --------- //
})();

