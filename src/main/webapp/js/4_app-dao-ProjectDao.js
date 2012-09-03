(function($){
	//-------- Remote dao ---------//
	function RemoteProjectDao(){
		this.constructor._super.constructor.call(this,"Project");
	}
	brite.inherit(RemoteProjectDao,brite.dao.RemoteDao);
	
	RemoteProjectDao.prototype.getProjectById = function(objectType,id){
		var data = {};
		data.id = id;

		return $.ajax({
			type : "GET",
			url : contextPath + "/getProjectById.json",
			data : data,
			dataType : "json"
		}).pipe(function(val) {
			return val.result;
		});
	}

	app.RemoteProjectDao = RemoteProjectDao;
})(jQuery);