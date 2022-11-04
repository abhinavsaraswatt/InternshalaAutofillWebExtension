// it is second step for process of making web extension accessible
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.todo == "showPageAction") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.pageAction.show(tabs[0].id);
    });
  }

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
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  if (request.todo == "startApplying") {
    // Applying on collected links
    chrome.storage.sync.get("internshalaCollectedLinks", async function (strg) {
      for (let i = 0; i < strg.internshalaCollectedLinks.length; i++) {
        chrome.tabs.create({ url: strg.internshalaCollectedLinks[i] });
        await sleep(2000);
        // we are using tabs for individual links, it is not efficient way but for now continue with it
        // to work this work links should start from 3rd tab
        // 1st tab is for main link, 2nd is for debugging extension
        chrome.tabs.query({ index: i + 2 }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {
            todo: "doApplyingProcess",
          });
        });

        await sleep(5000); // We should have to open tabs with some interval because if we'll open 40 tabs at once then company can ban us.
      }
    });
  }
});
