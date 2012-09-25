var app = app || {};

var contextPath = "http://localhost:8080/pm";
brite.defaultComponentConfig.loadTmpl = true;

(function($) {
	brite.display("MainScreen", null, {
		parent : "#bodyPage"
	});

	function uuid() {
		return Math.random+"";
	}

	function saveDfd(dfd) {
		var id = uuid();
		jQuery(document).data(id, dfd);
		return id;
	}

	function getDfd(id) {
		return jQuery(document).data(id);
	}

	function removeDfd(id) {
		return jQuery(document).removeData(id);
	}

	app.sendMessage = function(message) {
		console.log("sendMessage");
		var dfd =  message.dfd;
		var id = saveDfd(dfd)
		var m = {
			templateName : message.templateName,
			data :message.data,
			id :id
		};
		document.getElementById('theFrame').contentWindow.postMessage(m, '*');
	}


	window.addEventListener('message', function(event) {
		console.log(event.data.id)
		var dfd = getDfd(event.data.id);
		dfd.resolve(event.data.result);
		removeDfd(event.data.id);
	});
})();

