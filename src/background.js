chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({ url: "http://localhost:8080/schedule" });
});
//this is if we click on the tab, navigates us to calendar

let localBlocklist = [];
//blocklist stored locally
let domainNames = [];

// this is external messaging, a technique to get chrome api to connect with external webpage
chrome.runtime.onMessageExternal.addListener(function (
  request,
  sender,
  sendResponse
) {
  if (sender.url === "http://localhost:8080/softblock") {
    if (request.message === "getInterceptedUrl") {
      chrome.storage.local.get("interceptedURL", function (data) {
        sendResponse({ url: data.interceptedURL });
      });
      return true; // Indicates asynchronous response
    }
  }
});

chrome.runtime.onMessageExternal.addListener(
  (message, sender, sendResponse) => {
    console.log("Received message:", message);
    switch (message.type) {
      case "updateBlocklist":
        switch (message.action) {
          case "add":
            addUrlToLocalBlocklist(message.url, sendResponse);
            return true; // Keep the message channel open for asynchronous response
          case "remove":
            removeUrlFromLocalBlocklist(message.url, sendResponse);
            return true;
          case "clear":
            clearBlocklist();
            sendResponse({ status: "success" });
            break;
          case "fetch":
            fetchLocalBlocklist(sendResponse);
            return true;
        }
        break;
    }
  }
);

// captures intercepted url and previous url to send to softblock page
chrome.webRequest.onBeforeRedirect.addListener(
  function (details) {
    const urlObj = new URL(details.url);
    const baseDomain = getBaseDomain(urlObj);

    chrome.storage.local.get({ domainNames: [] }, function (data) {
      const domainNames = new Set(data.domainNames);
      //turn it into set to check for uniqueness

      if (domainNames.has(baseDomain)) {
        // Save the URL to local storage
        chrome.storage.local.set(
          { interceptedURL: urlObj.toString() },
          function () {
            console.log("URL before redirect saved:", urlObj);
          }
        );
      }
    });
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);

function clearBlocklist() {
  chrome.storage.local.clear(() => {
    console.log("Local blocklist has been cleared upon reload/startup.");
  });

  // clear all the rules
  chrome.declarativeNetRequest.getDynamicRules((rules) => {
    //rules?
    const ruleIds = rules.map((rule) => rule.id);
    chrome.declarativeNetRequest.updateDynamicRules(
      {
        removeRuleIds: ruleIds,
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error("Failed to remove rules:", chrome.runtime.lastError);
        } else {
          console.log("All dynamic rules have been cleared.");
        }
      }
    );
  });
}

// Add URL to local storage
function addUrlToLocalBlocklist(url, callback) {
  chrome.storage.local.get({ blocklist: [], domainNames: [] }, function (data) {
    let blocklist = data.blocklist;
    let domainNames = new Set(data.domainNames);
    const baseDomain = getBaseDomain(new URL(url));

    console.log(domainNames, baseDomain);

    if (!domainNames.has(baseDomain)) {
      if (blocklist.indexOf(url) === -1) {
        blocklist.push(url);
        domainNames.add(baseDomain);
        chrome.storage.local.set(
          { blocklist: blocklist, domainNames: Array.from(domainNames) },
          () => {
            addDynamicRule(url);
            callback({ status: "Blocklist updated", blocklist: blocklist });
          }
        );
      }
    }
  });
}

// Remove URL from local storage
function removeUrlFromLocalBlocklist(url, callback) {
  chrome.storage.local.get({ blocklist: [], domainNames: [] }, function (data) {
    let blocklist = data.blocklist;
    let domainNames = new Set(data.domainNames);
    const baseDomain = getBaseDomain(new URL(url));
    const index = blocklist.indexOf(url);
    if (index > -1) {
      blocklist.splice(index, 1);
      domainNames.delete(baseDomain);
      chrome.storage.local.set(
        { blocklist: blocklist, domainNames: Array.from(domainNames) },
        () => {
          removeDynamicRule(url);
          callback({ status: "Blocklist updated", blocklist: blocklist });
        }
      );
    }
  });
}

function fetchLocalBlocklist(callback) {
  chrome.storage.local.get({ blocklist: [] }, function (data) {
    if (data.blocklist) {
      callback({ status: "success", blocklist: data.blocklist });
    } else {
      callback({
        status: "error",
        blocklist: [],
        message: "No blocklist found",
      });
    }
  });
}

function addDynamicRule(url) {
  //how chrome tells you to navigate somewhere else
  //create rules
  //extract base domain, generate ruleid based on basedomain...to block all subredits, not speccific url
  const urlObj = new URL(url);
  const baseDomain = getBaseDomain(urlObj);

  // Generate the unique rule ID based on the domain
  const ruleId = generateUniqueId(baseDomain);

  // Define the general block rule
  const rule = {
    id: ruleId,
    priority: 1,
    action: {
      type: "redirect",
      //this is the type of rule to redirect
      //rules is like a library
      //declarativenetrequest controls all of this
      //these rules always change
      //need declarative net reequest for dynamic things...
      redirect: { url: "http://localhost:8080/softblock" },
    },
    condition: {
      urlFilter: `*://*${baseDomain}/*`,
      //once we extract basedomain, stars in filter is anything....
      //wildcard characters to pattern match
      resourceTypes: ["main_frame"],
      //*TODO google
    },
  };

  // Apply the general rule
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [rule],
  });

  // Rule to allow e.g. Youtube Music
  const allowMusic = {
    id: ruleId + 1,
    priority: 2,
    //priority that rules are read in...first read priority 1, then priority 2
    //this is allow action type...i allow things that match the patterned wildccards
    action: {
      type: "allow",
    },
    condition: {
      urlFilter: `*://music.${baseDomain}/*`,
      resourceTypes: ["main_frame"],
    },
  };

  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [allowMusic],
  });
}

// Function to remove a dynamic rule
function removeDynamicRule(url) {
  const baseDomain = getBaseDomain(new URL(url));

  const ruleId = generateUniqueId(baseDomain);
  chrome.declarativeNetRequest.updateDynamicRules(
    {
      removeRuleIds: [ruleId],
    },
    () => {
      console.log("Removing rule for URL:", url);
    }
  );
}

// This helper function generates a unique ID based on the  the URL
function generateUniqueId(baseDomain) {
  let hash = 0;
  for (let i = 0; i < baseDomain.length; i++) {
    const char = baseDomain.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function getBaseDomain(urlObj) {
  var hostname = urlObj.hostname;
  var parts = hostname.split(".");
  var baseDomain = "";

  // Handling more complex TLDs by checking the length of the split parts
  if (parts.length > 2) {
    // Common second-level domain TLDs (adjust list as needed)
    const commonSLDs = ["co.uk", "com.au", "gov.uk", "co.in"];
    const lastPart = parts[parts.length - 2] + "." + parts[parts.length - 1];

    if (commonSLDs.includes(lastPart)) {
      // If the last two parts are a known second-level domain, include the third-to-last part
      baseDomain = parts[parts.length - 3] + "." + lastPart;
    } else {
      // Otherwise, take the second-to-last part as usual
      baseDomain = parts[parts.length - 2] + "." + parts[parts.length - 1];
    }
  } else if (parts.length == 2) {
    // Directly use both parts if there are only two
    baseDomain = hostname;
  }

  return baseDomain;
}
