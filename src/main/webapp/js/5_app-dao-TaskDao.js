(function($) {
	//-------- Remote dao ---------//
	function RemoteTaskDao() {
		this.constructor._super.constructor.call(this, "Task");
	}

	brite.inherit(RemoteTaskDao, brite.dao.RemoteDao);

	RemoteTaskDao.prototype.updateTask = function(objectType, projectId,title, status) {
		var data = {
			projectId : projectId,
			title:title,
			status : status
		};

		var dfd = $.ajax({
			type : "POST",
			url : "createTask.do",
			data : data,
			dataType : "json"
		}).pipe(function(val) {
			return val;
		});

	}

	app.RemoteTaskDao = RemoteTaskDao;
})(jQuery); 