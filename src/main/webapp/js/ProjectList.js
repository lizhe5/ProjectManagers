;(function() {

	/**
	 * Component: ProjectList
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
	 *  - ProjectList_DO_SHOW_CHARITIES: Show the charities
	 *  - ..TODO: put the other DO_SHOW_ events here ...
	 *  - ProjectList_DO_CLOSE_POPUP
	 *
	 */
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
			
			
			$e.on("btap",".item",function(){
				var id = $(this).attr("data-value");
				$e.find(".projectListContain").find("li").removeClass("active");
				$(this).addClass("active");
				brite.display("MainContent",{id:id});
			});
			
			$e.on("btap",".newBtn",function(){
				brite.display("MainContent");
			});
			c.refresh.call(c);
		}

		// --------- /Component Interface Implementation ---------- //

		// --------- Component Public API --------- //
		ProjectList.prototype.refresh = function(id) {
			var c = this;
			var $e = c.$element;
			brite.dao.list("Project").done(function(projectList){
				var $html = $("#tmpl-ProjectList-item").render(projectList);
				$e.find(".projectListContain").html($html);
				$e.find("[data-value='"+id+"']").addClass("active");
				console.log(projectList.length);
			});
		}

		// --------- /Component Public API --------- //

		// --------- Component Private Methods --------- //
		function privateMethodOne() {
			var c = this;

		}

		// --------- /Component Private Methods --------- //

		// --------- Component Registration --------- //
		brite.registerComponent("ProjectList", {
			loadTmpl : true
		}, function() {
			return new ProjectList();
		});
		// --------- Component Registration --------- //

	})(jQuery);

})();
