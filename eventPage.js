// it is second step for process of making web extension accessible
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.todo == "showPageAction") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.pageAction.show(tabs[0].id);
    });
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.todo == "addLinksToStorage") {
    chrome.storage.sync.set(
      { internshalaCollectedLinks: request.links },
      function () {
        var notifOptions = {
          type: "basic",
          iconUrl: "india.png",
          title: "Links Added",
          message: `You have added ${request.links.length} links!`,
        };
        chrome.notifications.create("linksAddedNotif", notifOptions);
      }
    );
  }
});
