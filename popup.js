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
    chrome.runtime.sendMessage({
      todo: "startApplying",
    });
  });
});
