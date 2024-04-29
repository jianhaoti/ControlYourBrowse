// Function to handle global clicks
function handleGlobalClick(event) {
  const { target } = event;

  if (target.id === "addButton") {
    const urlInput = document.getElementById("websiteInput");
    const url = urlInput.value.trim();
    if (url && isValidUrl(url)) {
      chrome.runtime.sendMessage(
        { type: "updateBlocklist", action: "add", url },
        displayBlocklist
      );
    } else {
      alert("Please enter a valid URL.");
      urlInput.focus();
    }
  } else if (target.id === "removeButton") {
    const selected = document.querySelector("#blocklistDisplay .selected");
    if (selected) {
      chrome.runtime.sendMessage(
        {
          type: "updateBlocklist",
          action: "remove",
          url: selected.textContent,
        },
        displayBlocklist
      );
    }
  } else if (target.closest("#blocklistDisplay li")) {
    // Assuming deselectAll is defined elsewhere
    deselectAll();
    target.classList.add("selected");
    document.getElementById("removeButton").disabled = false;
  } else if (
    target.id === "fullClearButton" &&
    confirm("Are you sure you want to clear all settings and data?")
  ) {
    chrome.runtime.sendMessage({ action: "clearBlocklist" });
  } else if (!target.closest("#websiteInput")) {
    deselectAll();
  }
}

// Ensure the listener is added only once using a flag
if (!window.globalClickListenerAdded) {
  document.addEventListener("click", handleGlobalClick);
  window.globalClickListenerAdded = true;
}

function isValidUrl(urlString) {
  try {
    new URL(urlString);
    return true;
  } catch (error) {
    return false;
  }
}

function displayBlocklist(response) {
  const listElement = document.getElementById("blocklistDisplay");
  listElement.innerHTML = "";
  response.blocklist.forEach((site) => {
    const listItem = document.createElement("li");
    listItem.textContent = site;
    listElement.appendChild(listItem);
  });
}

function deselectAll() {
  const selectedItems = document.querySelectorAll(
    "#blocklistDisplay .selected"
  );
  selectedItems.forEach((item) => {
    item.classList.remove("selected");
  });
  document.getElementById("removeButton").disabled = true;
}

// Optional: If you need to re-check when the DOM is fully loaded or re-initialized
document.addEventListener("DOMContentLoaded", () => {
  if (!window.globalClickListenerAdded) {
    document.addEventListener("click", handleGlobalClick);
    window.globalClickListenerAdded = true;
  }
});
