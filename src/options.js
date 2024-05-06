// Valid URL checker
function isValidUrl(urlString) {
  try {
    new URL(urlString);
    // typecasting into url object for input validation
    return true;
  } catch (error) {
    return false;
  }
}

const addButton = document.getElementById("addButton");
// associates id with object to be used for html....we do logic on this object
// check if id is valid for typescripe and js, not just html
// can do javascript on add button, associates it to html element addbutton
if (!addButton.hasClickListener) {
  //this is to prevent click from registering twice
  //flagged: try to understand this later....
  addButton.addEventListener("click", () => {
    // first listen for click, if click execute rest of code
    const urlInput = document.getElementById("websiteInput");
    const url = urlInput.value.trim();
    if (url && isValidUrl(url)) {
      //if the object input is a url
      chrome.runtime.sendMessage(
        { type: "updateBlocklist", action: "add", url },
        //type: updateblocklist ->>
        displayBlocklist
        //you send out messge to rest of files
        //you neeedd a receiver
        //will be received in background.js
      );
    } else {
      alert("Please enter a valid URL.");
      urlInput.focus(); // Focus the input field for the user to correct it
    }
  });
  addButton.hasClickListener = true; // Set a flag that you've added the listener
  //prevent it from triggering again
}

const removeButton = document.getElementById("removeButton");
if (!removeButton.hasClickListener) {
  removeButton.addEventListener("click", () => {
    const selected = document.querySelector("#blocklistDisplay .selected");
    //to select which guy we click
    if (selected) {
      // send message to background.js for local and server blocklist updates
      chrome.runtime.sendMessage(
        {
          type: "updateBlocklist",
          action: "remove",
          url: selected.textContent,
        },
        displayBlocklist
      );
    }
  });
  removeButton.hasClickListener = true; // Set a flag that you've added the listener
}

const clearAllButton = document.getElementById("clearAllButton");
if (!clearAllButton.hasClickListener) {
  clearAllButton.addEventListener("click", () => {
    // Ask for user confirmation
    if (
      confirm(
        "Are you sure you want to clear all settings and data? This action cannot be undone."
      )
      //opens up dialog in chrome
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
  clearAllButton.hasClickListener = true; // Set a flag that you've added the listener
}

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
