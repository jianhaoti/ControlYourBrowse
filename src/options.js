// Valid URL checker
function isValidUrl(urlString) {
  try {
    new URL(urlString);
    return true;
  } catch (error) {
    return false;
  }
}

document.getElementById("addButton").addEventListener("click", () => {
  const urlInput = document.getElementById("websiteInput");
  const url = urlInput.value.trim();
  if (url && isValidUrl(url)) {
    chrome.runtime.sendMessage(
      { type: "updateBlocklist", action: "add", url },
      displayBlocklist
    );
  } else {
    alert("Please enter a valid URL.");
    urlInput.focus(); // Focus the input field for the user to correct it
  }
});

// gloabl click listener to clear selection
// unless user clicks a url in the block list
// or inputting a new url
document.addEventListener("click", (event) => {
  if (
    !event.target.closest("#blocklistDisplay li") &&
    !event.target.closest("#websiteInput")
  ) {
    deselectAll();
  }
});

const removeButton = document.getElementById("removeButton");
removeButton.addEventListener("click", () => {
  const selected = document.querySelector("#blocklistDisplay .selected");
  if (selected) {
    // send message to background.js for local and server blocklist updates
    chrome.runtime.sendMessage(
      { type: "updateBlocklist", action: "remove", url: selected.textContent },
      displayBlocklist
    );
  }
});

const clearAllButton = document.getElementById("clearAllButton");
clearAllButton.addEventListener("click", () => {
  // Ask for user confirmation
  if (
    confirm(
      "Are you sure you want to clear all settings and data? This action cannot be undone."
    )
  ) {
    // Clear the UI immediately
    const listElement = document.getElementById("blocklistDisplay");
    listElement.innerHTML = "";

    // Send message to background.js to clear storage and dynamic rules
    chrome.runtime.sendMessage(
      { type: "updateBlocklist", action: "clear" },
      () => {
        console.log("Blocklist cleared in storage and rules reset.");
        // Optionally, handle any callbacks here if necessary
      }
    );
  }
});

function displayBlocklist(response) {
  const listElement = document.getElementById("blocklistDisplay");
  listElement.innerHTML = ""; // Clear current list
  response.blocklist.forEach((site) => {
    const listItem = document.createElement("li");
    listItem.textContent = site;
    listItem.addEventListener("click", function (event) {
      // Prevent the document-level click handler from firing
      event.stopPropagation();
      deselectAll();

      // Remove 'selected' class from previously selected item, if any
      const previousSelected = document.querySelector(
        "#blocklistDisplay .selected"
      );
      if (previousSelected) {
        previousSelected.classList.remove("selected");
      }
      listItem.classList.add("selected");
      removeButton.disabled = false; // Enable the remove button when an item is selected
    });
    listElement.appendChild(listItem);
  });
}

// Deselect all items
function deselectAll() {
  const previouslySelected = document.querySelector(
    "#blocklistDisplay .selected"
  );
  if (previouslySelected) {
    previouslySelected.classList.remove("selected");
  }
  removeButton.disabled = true; // Disable the remove button when nothing is selected
}

// On load, fetch the current blocklist
document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage(
    { type: "updateBlocklist", action: "fetch" },
    function (response) {
      if (response && response.blocklist) {
        displayBlocklist(response);
      } else {
        console.error("Failed to fetch blocklist", response);
      }
    }
  );
});
