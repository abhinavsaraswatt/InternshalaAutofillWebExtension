$(function () {
  // it is first step for making collect links button work
  $("#btnCollectLinks").click(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        todo: "collectLinks",
      });
    });
  });
  $("#btnStartApplying").click(function () {
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // to send message in content script we use tabs.sendMessage and to send message in eventPage (or background script) we use runtime.sendMessage
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    chrome.runtime.sendMessage({ todo: "startApplying" });
  });
});
