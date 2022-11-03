chrome.runtime.sendMessage({ todo: "showPageAction" }); // it is first step for process of making web extension accessible

// it is second step for making collect links button work
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.todo == "collectLinks") {
    console.log("here write code for extracting links");
    var collectedLinks = [];
    var currPageLinks = document.getElementsByClassName("view_detail_button");
    for (let i = 0; i < currPageLinks.length; i++) {
      if (currPageLinks[i].getAttribute("href").includes("internship/detail")) {
        if (!currPageLinks[i].textContent.includes("View details")) {
          console.log(currPageLinks[i]);
          // to remove duplicate links
          collectedLinks.push(currPageLinks[i]);
        }
      }
    }
    console.log(collectedLinks.length);
  }
});
