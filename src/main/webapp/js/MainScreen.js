;(function() {

	/**
	 * Component: MainScreen
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
	 *  - MainScreen_DO_SHOW_CHARITIES: Show the charities 
	 *  - ..TODO: put the other DO_SHOW_ events here ...
	 *  - MainScreen_DO_CLOSE_POPUP
	 *
	 */
	(function($) {

		// --------- Component Interface Implementation ---------- //
		function MainScreen() {
		};

		MainScreen.prototype.create = function(data, config) {
			var html = $("#tmpl-MainScreen").render(data);
			var $e = $(html);
			return $e;
		}


		MainScreen.prototype.postDisplay = function(data, config) {
			var c = this;
			var $e = c.$element;
			
			brite.display("ProjectList",null,{parent:c.$element.find(".left-content")});
			brite.display("MainContent",null,{parent:c.$element.find(".main-content")});
			
			// bind any btap on a element with data-do="MainScreen_DO" to a 
			// custom event of the same name.
			$e.on("btap",'[data-do^="MainScreen_DO"]',function(event){
				var $target = $(event.target);
				var doEventName = $target.attr("data-do");
				$target.trigger(doEventName);
			});
						
			
			// --------- Handle MainScreen_DO_ events --------- //
			
			$e.on("MainScreen_DO_SHOW_ADMIN",function(event){
				brite.display("Admin",null,{});
			});
			
			
			// TODO add other action event handling
			// --------- /Handle MainScreen_DO_ events --------- //

		}

		// --------- /Component Interface Implementation ---------- //

		// --------- Component Public API --------- //
		MainScreen.prototype.methodOne = function(someArgs) {
		}

		// --------- /Component Public API --------- //

		// --------- Component Private Methods --------- //
		function privateMethodOne() {
			var c = this;

		}

		// --------- /Component Private Methods --------- //

		// --------- Component Registration --------- //
		brite.registerComponent("MainScreen", {loadTmpl:true},
		function() {
			return new MainScreen();
		});
		// --------- Component Registration --------- //

	})(jQuery);

})();
