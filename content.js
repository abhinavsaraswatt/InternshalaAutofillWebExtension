chrome.runtime.sendMessage({ todo: "showPageAction" }); // it is first step for process of making web extension accessible

// it is second step for making collect links button work
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.todo == "collectLinks") {
    console.log("here write code for extracting links");
    var collectedLinks = [];
    var currPageLinks = document.getElementsByClassName("view_detail_button");
    for (let i = 0; i < currPageLinks.length; i++) {
      if (
        currPageLinks[i].getAttribute("href").includes("internship/detail") &&
        !currPageLinks[i].textContent.includes("View details")
      ) {
        //   console.log(currPageLinks[i]);
        // to remove duplicate links
        collectedLinks.push(
          currPageLinks[i]["href"].replace(
            "internship/detail",
            "application/form"
          )
        ); // here we are saying specifically add href in array which is gonna be stored.
      }
    }
  }
  // console.log(collectedLinks.length);
  //   console.log(collectedLinks);

  // In content scripts we don't have access to chrome api !!!!!!!!!!!!!!
  chrome.runtime.sendMessage({
    todo: "addLinksToStorage",
    links: collectedLinks,
  });

  // doApplyingProcess
  // if (request.todo == "doApplyingProcess") {
  //   console.log("click it");
  //   document.getElementsByClassName("copyCoverLetterTitle")[0].click();
  //   // if (document.getElementsByTagName('h4').length == 2) { keep this tab open and move to next one and keep filling}
  //   // document.getElementById('submit').click()
  // }

  if (request.todo == "doApplyingProcess") {
    console.log("click it");

    document.getElementsByClassName("copyCoverLetterTitle")[0].click();

    setTimeout(() => {
      document.getElementById("submit").click();
    }, 2000);

    // means there is no additional question
    // if (document.getElementsByTagName('h4').length == 1)
  }
});
