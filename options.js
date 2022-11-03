$(function () {
  chrome.storage.sync.get("internshalaCollectedLinks", function (strg) {
    // $("#showLinks").text(strg.internshalaCollectedLinks);
    for (let i = 1; i < strg.internshalaCollectedLinks.length + 1; i++) {
      console.log(strg.internshalaCollectedLinks[i]);
      $("#showLinks").append(
        `<a href="${strg.internshalaCollectedLinks[i]}">${i}. ${strg.internshalaCollectedLinks[i]}</a><br>`
      );
    }
  });
});
