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
			var html = $("#tmpl-MainContent").render({});
			var $e = $(html);
			return $e;
		}


		MainContent.prototype.postDisplay = function(data, config) {
			var c = this;
			var $e = c.$element;
			
			$e.on("btap", '.saveBtn', function(event) {
					var id =  $e.find("input[name='id']").val();
					var subject = $e.find("input[name='subject']").val();
					var desc  =  $e.find("input[name='description']").val();
					app.actions.createProject(id, subject,desc).done(function(extraData) {
						alert("OK");
					});
				});
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
