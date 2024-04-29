chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({ url: "options.html" });
});

let localBlocklist = [];

chrome.runtime.onInstalled.addListener(clearBlocklist);
chrome.runtime.onStartup.addListener(clearBlocklist);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "updateBlocklist") {
    switch (message.action) {
      case "add":
        addUrlToLocalBlocklist(message.url, sendResponse);
        break;
      case "remove":
        removeUrlFromLocalBlocklist(message.url, sendResponse);
        break;
      case "fetch":
        fetchLocalBlocklist(sendResponse);
        break;
    }
    return true; // Indicates an asynchronous response
  }
});

function clearBlocklist() {
  chrome.storage.local.clear(() => {
    console.log("Local blocklist has been cleared upon reload/startup.");
  });
  chrome.storage.sync.clear(() => {
    console.log("Local blocklist has been cleared upon reload/startup.");
  });

  // clear all the rules
  chrome.declarativeNetRequest.getDynamicRules((rules) => {
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
  chrome.storage.local.get({ blocklist: [] }, function (data) {
    let blocklist = data.blocklist;
    if (blocklist.indexOf(url) === -1) {
      blocklist.push(url);
      chrome.storage.local.set({ blocklist: blocklist }, () => {
        addDynamicRule(url);
        callback({ status: "Blocklist updated", blocklist: blocklist });
      });
    }
  });
}

// Remove URL from local storage
function removeUrlFromLocalBlocklist(url, callback) {
  chrome.storage.local.get({ blocklist: [] }, function (data) {
    let blocklist = data.blocklist;
    const index = blocklist.indexOf(url);
    if (index > -1) {
      blocklist.splice(index, 1);
      chrome.storage.local.set({ blocklist: blocklist }, () => {
        removeDynamicRule(url);
        callback({ status: "Blocklist updated", blocklist: blocklist });
      });
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

// Function to dynamically add a blocking rule
function addDynamicRule(url) {
  const urlObj = new URL(url);
  let baseDomain = urlObj.hostname;

  // If the domain starts with 'www.', strip it for broader matching
  if (baseDomain.startsWith("www.")) {
    baseDomain = baseDomain.substring(4);
  }

  const pattern = `*://*.${baseDomain}/*`; // Matches all subdomains
  const ruleId = generateUniqueId(baseDomain);

  const rule = {
    id: ruleId, // Ensuring the ID is a manageable integer size
    priority: 1,
    action: {
      type: "redirect",
      redirect: { url: "http://localhost:8000/softblock.html" },
    },
    condition: {
      urlFilter: pattern,
      resourceTypes: ["main_frame"],
    },
  };
  console.log("Adding rule:", { pattern, baseDomain, url }); // Log the details

  // Clear any existing rules with the same ID before adding a new one
  chrome.declarativeNetRequest.updateDynamicRules(
    {
      removeRuleIds: [rule.id],
    },
    () => {
      chrome.declarativeNetRequest.updateDynamicRules(
        {
          addRules: [rule],
        },
        () => {
          console.log("Rule added/updated for URL:", url);
        }
      );
    }
  );
}

// Function to remove a dynamic rule
function removeDynamicRule(url) {
  const urlObj = new URL(url);
  let baseDomain = urlObj.hostname;

  // If the domain starts with 'www.', strip it for broader matching
  if (baseDomain.startsWith("www.")) {
    baseDomain = baseDomain.substring(4);
  }

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

// // Get blocklist from server upon startup
// chrome.runtime.onStartup.addListener(() => {
//   fetchBlocklistFromServer();
// });

// // Get blocklist from server upon install/update
// chrome.runtime.onInstalled.addListener(function () {
//   fetchBlocklistFromServer(); // Fetch blocklist also on install/update
// });

// async function fetchBlocklistFromServer() {
//   try {
//     const response = await fetch("https://yourserver.com/blocklist");
//     if (response.ok) {
//       localBlocklist = await response.json();
//       // Further actions like registering content scripts can be done here
//     } else {
//       throw new Error(`Failed to fetch blocklist: ${response.status}`);
//     }
//   } catch (error) {
//     console.error("Error fetching blocklist:", error);
//   }
// }

// async function updateBlocklistOnServer(blocklist) {
//   try {
//     const response = await fetch("https://yourserver.com/update-blocklist", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ blocklist }),
//     });
//     return await response.json();
//   } catch (error) {
//     console.error("Failed to update blocklist on server:", error);
//     throw error; // Rethrow error to be caught by the caller
//   }
// }
