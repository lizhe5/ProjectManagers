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
			var html = $("#tmpl-MainContent").render(data);
			var $e = $(html);
			return $e;
		}


		MainContent.prototype.postDisplay = function(data, config) {
			var c = this;
			var $e = c.$element;
			
			// bind any btap on a element with data-do="MainContent_DO" to a 
			// custom event of the same name.
			$e.on("btap",'[data-do^="MainContent_DO"]',function(event){
				var $target = $(event.target);
				var doEventName = $target.attr("data-do");
				$target.trigger(doEventName);
			});
						
			
			// --------- Handle MainContent_DO_ events --------- //
			
			$e.on("MainContent_DO_SHOW_ADMIN",function(event){
				brite.display("Admin",null,{});
			});
			
			
			// TODO add other action event handling
			// --------- /Handle MainContent_DO_ events --------- //

		}

		// --------- /Component Interface Implementation ---------- //

		// --------- Component Public API --------- //
		MainContent.prototype.methodOne = function(someArgs) {
		}

		// --------- /Component Public API --------- //

		// --------- Component Private Methods --------- //
		function privateMethodOne() {
			var c = this;

		}

		// --------- /Component Private Methods --------- //

		// --------- Component Registration --------- //
		brite.registerComponent("MainContent", {loadTmpl:true},
		function() {
			return new MainContent();
		});
		// --------- Component Registration --------- //

	})(jQuery);

})();
