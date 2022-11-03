$(function () {
  chrome.storage.sync.get("internshalaCollectedLinks", function (strg) {
    // $("#showLinks").text(strg.internshalaCollectedLinks);
    for (let i = 0; i < strg.internshalaCollectedLinks.length; i++) {
      console.log(strg.internshalaCollectedLinks[i]);
      $("#showLinks").append(
        `<a href="${strg.internshalaCollectedLinks[i]}">${i + 1}. ${
          strg.internshalaCollectedLinks[i]
        }</a><br>`
      );
    }
  });
});
