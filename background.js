var toggle = true;
chrome.browserAction.onClicked.addListener(function(tab) {
  toggle = !toggle;
  if(toggle){

    chrome.browserAction.setIcon({path: "on.png", tabId:tab.id});
    
  }
  else{
    chrome.browserAction.setIcon({path: "off.png", tabId:tab.id});
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      if(toggle){

    chrome.browserAction.setIcon({path: "on.png", tabId:tab.id});
    
  }
  else{
    chrome.browserAction.setIcon({path: "off.png", tabId:tab.id});
  }
});


chrome.contextMenus.create({
  'title' : 'Search Discogs for %s',
  'contexts' : ['selection'],
  'onclick' : function(info, tab) {
  	var text=info.selectionText.toLowerCase();
  	var destination="http://www.discogs.com/search/?q="+text+"&type=all";
  	chrome.tabs.create({url:destination, active:false});
  	passToDB(text,"all");
  }
});

function passToDB(string1,string2){
  if(toggle){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
    	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        	document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET","http://www.dbiwer.com/Pages/DiscogsApp/databaseUpdate.php?key=" + string1 + "&tag=" + string2, true);
    xmlhttp.send();
  }

}

function resetDefaultSuggestion() {
  chrome.omnibox.setDefaultSuggestion({
    description: 'Discogs: Search the Discogs website for %s'
  });
}

resetDefaultSuggestion();



function navigate(url) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: url});
  });
}


chrome.omnibox.onInputEntered.addListener(function(text) {
	text = text.toLowerCase();
	var n = -1;
	if((n = text.indexOf("-a")) && (n != -1)){
		text=text.substr(0,n);
		navigate("http://www.discogs.com/search/?q=" + text + "&type=artist");
		passToDB(text,"artist");
	}
	else if((n = text.indexOf("-r")) && (n != -1)){
		text=text.substr(0,n);
		navigate("http://www.discogs.com/search/?q=" + text + "&type=release");
		passToDB(text,"release");
	}
	else if((n = text.indexOf("-m")) && (n != -1)){
		text=text.substr(0,n);
		navigate("http://www.discogs.com/search/?q=" + text + "&type=master");
		passToDB(text,"master");
	}
	else if((n = text.indexOf("-l")) && (n != -1)){
		text=text.substr(0,n);
		navigate("http://www.discogs.com/search/?q=" + text + "&type=label");
		passToDB(text,"label");
	}
	else{
  		navigate("http://www.discogs.com/search/?q=" + text + "&type=all");
  		passToDB(text,"all");
  	}
});

