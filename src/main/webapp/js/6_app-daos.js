var app = app || {};


// --------- Entity Dao Registration --------- //
(function($){
		//register RemoteDao
		brite.registerDao("Project",new app.RemoteProjectDao());
		brite.registerDao("Task",new app.RemoteTaskDao());
})();

