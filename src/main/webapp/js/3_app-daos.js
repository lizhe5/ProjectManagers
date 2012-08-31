var app = app || {};


// --------- Entity Dao Registration --------- //
(function($){
		//register RemoteDao
		brite.registerDao("Project",new brite.dao.RemoteDao("Project"));
		brite.registerDao("Task",new brite.dao.RemoteDao("Task"));
})();

