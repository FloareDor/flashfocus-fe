console.log('background script loaded');
// background.ts

chrome.webNavigation.onCompleted.addListener((details) => {
	if (details.frameId === 0) {  // Main frame only
	  chrome.tabs.sendMessage(details.tabId, { action: "checkUrl" });
	}
  }, { url: [{ schemes: ["http", "https"] }] });
  
  chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
	if (details.frameId === 0) {  // Main frame only
	  chrome.tabs.sendMessage(details.tabId, { action: "checkUrl" });
	}
  }, { url: [{ schemes: ["http", "https"] }] });

  
