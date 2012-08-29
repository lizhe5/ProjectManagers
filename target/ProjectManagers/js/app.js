var app = app || {};
(function($) {
	
	//just keep it for now
	//check the browsers type
	var ua = navigator.userAgent.toLowerCase();
	
	var isChrome = ua.match(/chrome\/([\d.]+)/);
	var isSafari = ua.match(/version\/([\d.]+)/);
	var isFirefox = ua.match(/firefox\/([\d.]+)/);
	var isIE = ua.match(/msie ([\d.]+)/);
	
	app.cssPrefix = function(){
		if(isChrome){
			return "-webkit-";
		}else if(isSafari){
			return "-webkit-";
		}else if(isFirefox){
			return "-moz-";
		}else if(isIE){
			return "-ms-";
		}
	}
	
	app.getTransitionEnd = function(){
		if(isChrome){
			return "webkitTransitionEnd";
		}else if(isSafari){
			return "webkitTransitionEnd";
		}else if(isFirefox){
			return "transitionend";
		}
	}
	
	
	
	
	app.currentHash = null;
	
	/**
	 * the time value for get data from server every some seconds
	 */
	app.REFRESH_TABLE_INTERVAL = 2000;
	/**
	 * the whole time when Timer running
	 */
	app.TIMER_ORIGIN_VALUE= 30000;
	/**
	 * the path of resoures
	 */
	app.RES_PATH= "old/res/images";
	
	/**
	 * all notification switches for component, such as Lobby, Room
	 */
	var _notificationSwitches = {};
	var _switchKeyPrefix = "SWITCH_";
	
	
	// -------- Public Methods --------- //
	/**
	 * A method about use ajax to get json data
	 */
	app.getJsonData = function(url, params) {
		var dfd = $.Deferred();
		params = params || {};
		jQuery.ajax({
			  type : params.method ? params.method : "Post",
			  url : url,
			  async : true,
			  data : params,
			  dataType : "json"
		  }).success(function(data) {
			  dfd.resolve(data);
		  }).fail(function(jxhr, arg2) {
			try {
				if (jxhr.responseText) {
					console.log("POKER WARNING: json not well formatted, falling back to JS eval");
					var data = eval("(" + jxhr.responseText + ")");
					dfd.resolve(data);
				} else {
					throw "POKER EXCEPTION: Cannot get content for " + url;
				}
			} catch (ex) {
				console.log("POKER ERROR: " + ex + " Fail parsing JSON for url: " + url + "\nContent received:\n"
				  + jxhr.responseText);
			}
		});

		return dfd.promise();
	}
	
	/**
	 * Do a ajax post for the action and resolve with the JSON object (which is the WebActionHandler action name) and the data.
	 * 
	 * @param data {FormData} today, assume FormData
	 * 
	 * @return a Deferred 
	 */
	app.post = function(action,formData){
		var dfd = $.Deferred();
		
		var xhr = new XMLHttpRequest();
		xhr.open('POST', action, true);
		
		xhr.onload = function(e) {
			var jsonResult = JSON.parse(xhr.response);
			dfd.resolve(jsonResult);
		};
		
		xhr.onerror = function(e) {
			dfd.fail("app.post failed: " + e);
		}
		
		xhr.send(formData);  // multipart/form-data
		
		return dfd.promise();
	}
	
	/**
	 * get a switch by  name
	 * @return {boolean} switch
	 */
	app.getSwitchByName = function(name){
		if(name == "Lobby"){
			return _notificationSwitches[_switchKeyPrefix];
		}else if(name == "Room"){
			return _notificationSwitches[_switchKeyPrefix+"Room"];
		}
		return false;
	}


	/**
	 * This will be called by the MainScreen cmd logic just after we perform a
	 * command.
	 * 
	 * This function needs to seralize the cmd and extra in the URL after the hash
	 * 
	 * @param cmd
	 * @param extra
	 *         this will be the js object that has the
	 */
	app.pushCmd = function(cmd, extra) {
		if (extra) {
			var extraString = JSON.stringify(extra);
			window.location.hash = cmd + ":" + extraString.replace(/\"/g, "|");
		} else {
			window.location.hash = cmd;
		}
		app.currentHash = window.location.hash;
		
		//process switches
		for(var k in _notificationSwitches){
			_notificationSwitches[k] = false;
		}
		_notificationSwitches[_switchKeyPrefix+cmd] = true
	}

	/**
	 * use currect hash to show current screen
	 */
	app.showCurrent = function() {
		setTimeout(executeCmd, 5);
	}
	
	// -------- /Public Methods --------- //
	
	/**
	 * do something when get hash from url
	 */
	function executeCmd() {
		var cmdInfo = getCmdInfo();
		var MainScreen = $(document).bFindComponents("MainScreen");
		if (MainScreen && MainScreen.length > 0) {
			MainScreen[0].$element.trigger(cmdInfo.cmd, cmdInfo.extra);
		}
	}
	
	/**
	 * get a object but hash value
	 * @return {object} cmdInfo object
	 */
	function getCmdInfo() {
		var hash = location.hash;
		var cmdInfo = {};
		var cmdString = hash.substring(1);
		if(!cmdString || cmdString == ""){
			cmdInfo.cmd = "";
		}else if (cmdString.indexOf(":") != -1) {
			cmdInfo.cmd = cmdString.substring(0, cmdString.indexOf(":"));
			var extraString = cmdString.substring(cmdString.indexOf(":") + 1).replace(/\|/g, "\"");
			cmdInfo.extra = JSON.parse(extraString);
		} else {
			cmdInfo.cmd = cmdString;
		}
		
		if(cmdInfo.cmd == ""){
			cmdInfo.cmd = "Cmd_DEFAULT";
		}
		return cmdInfo;
	}
	

})(jQuery);
