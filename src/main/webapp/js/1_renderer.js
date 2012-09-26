var renderer = renderer || {};
(function($) {
	function uuid() {
		return brite.uuid();
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


	renderer.render = function(message) {
		console.log("sendMessage");
		var dfd = $.Deferred();
		var id = saveDfd(dfd)
		var m = {
			templateName : message.templateName,
			data : message.data,
			id : id
		};
		document.getElementById('theFrame').contentWindow.postMessage(m, '*');
		return dfd.promise();
	}


	window.addEventListener('message', function(event) {
		console.log(event.data.id)
		var dfd = getDfd(event.data.id);
		dfd.resolve(event.data.result);
		removeDfd(event.data.id);
	});
})(jQuery); 