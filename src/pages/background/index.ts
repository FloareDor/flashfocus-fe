console.log('background script loaded');

// Function to check if the URL has changed
function hasUrlChanged(oldUrl: string, newUrl: string): boolean {
  const cleanOldUrl = oldUrl.replace(/^https?:\/\/(www\.)?/, '').split('#')[0];
  const cleanNewUrl = newUrl.replace(/^https?:\/\/(www\.)?/, '').split('#')[0];
  return cleanOldUrl !== cleanNewUrl;
}

// Keep track of the last URL for each tab
const tabUrls: { [tabId: number]: string } = {};

// Common function to handle URL checks
function handleUrlCheck(details: chrome.webNavigation.WebNavigationFramedCallbackDetails) {
  if (details.frameId === 0) {  // Main frame only
    chrome.tabs.get(details.tabId, (tab) => {
      if (tab.url && (!tabUrls[details.tabId] || hasUrlChanged(tabUrls[details.tabId], tab.url))) {
        tabUrls[details.tabId] = tab.url;
        chrome.tabs.sendMessage(details.tabId, { action: "checkUrl" });
      }
    });
  }
}

// Listen for navigation completion
chrome.webNavigation.onCompleted.addListener(handleUrlCheck, { url: [{ schemes: ["http", "https"] }] });

// Listen for history state updates (for single-page applications)
chrome.webNavigation.onHistoryStateUpdated.addListener(handleUrlCheck, { url: [{ schemes: ["http", "https"] }] });

// Clean up tabUrls when a tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabUrls[tabId];
});