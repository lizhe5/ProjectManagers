var app = app || {};
(function($) {
	app.actions = {};

	app.actions.getProjectList = function() {
		var params = {
			method : "Get"
		}
		return app.getJsonData(contextPath + "/getProjectList.json", params);
	}
	
	
	app.actions.createProject = function(id,subject,desc) {
   		var params = {
   			id:id,
   			subject : subject,
            desc : desc
   		}
   		return app.getJsonData("createProject.do", params);
   	}

})(jQuery);
