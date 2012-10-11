var app = app || {};


// --------- Entity Dao Registration --------- //
(function($){
		//register RemoteDao
		brite.registerDao(new app.RemoteProjectDao());
		brite.registerDao(new app.RemoteTaskDao());
		
})();

