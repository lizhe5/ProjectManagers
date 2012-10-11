var app = app || {};
(function($) {
	//-------- Remote dao ---------//
	function RemoteTaskDao() {
		this.constructor._super.constructor.call(this, "Task");
	}

	brite.inherit(RemoteTaskDao, brite.dao.RemoteDao);

	RemoteTaskDao.prototype.updateTask = function(objectType,id, projectId,title, status) {
		var data = {
			id:id,
			projectId : projectId,
			title:title,
			status : status
		};

		var dfd = $.ajax({
			type : "POST",
			url : contextPath +"/createTask.do",
			data : data,
			dataType : "json"
		}).pipe(function(val) {
			return val;
		});

	}

	RemoteTaskDao.prototype.opTask = function(id,op) {
		var data = {
			id : id,
			op : op
		};

		var dfd = $.ajax({
			type : "POST",
			url : contextPath +"/opTask.do",
			data : data,
			dataType : "json"
		}).pipe(function(val) {
			return val;
		});
	}

	app.RemoteTaskDao = RemoteTaskDao;
})(jQuery); 