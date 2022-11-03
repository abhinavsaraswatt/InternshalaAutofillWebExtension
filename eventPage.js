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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.todo == "startApplying") {
    // Applying on collected links
    chrome.storage.sync.get("internshalaCollectedLinks", async function (strg) {
      for (let i = 0; i < strg.internshalaCollectedLinks.length; i++) {
        chrome.tabs.create({ url: strg.internshalaCollectedLinks[i] }); // We should have to open tabs with some interval because if we'll open 40 tabs at once then company can ban us.
        await sleep(2000);
      }
    });
  }
});
