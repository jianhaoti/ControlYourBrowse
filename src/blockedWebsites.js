import React, { useState, useEffect } from "react";

const extensionId = "gmpdhjhofpdgofmlocjhdcbbobjddpmm";

function BlockedWebsites() {
  const [blocklist, setBlocklist] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    // Fetch the current blocklist on component mount
    chrome.runtime.sendMessage(
      extensionId,
      { type: "updateBlocklist", action: "fetch" },
      function (response) {
        console.log("Fetch response:", response);
        if (response && response.blocklist) {
          setBlocklist(response.blocklist);
        } else {
          console.error("Failed to fetch blocklist", response);
        }
      }
    );
  }, []);

  const isValidUrl = (urlString) => {
    try {
      new URL(urlString);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleAdd = () => {
    if (newUrl.trim() && isValidUrl(newUrl.trim())) {
      chrome.runtime.sendMessage(
        extensionId,
        { type: "updateBlocklist", action: "add", url: newUrl.trim() },
        (response) => {
          console.log("Add response:", response);
          if (response && response.blocklist) {
            setBlocklist(response.blocklist);
            setNewUrl(""); // Clear the input field
          } else {
            console.error("Failed to add URL", response);
          }
        }
      );
    } else {
      alert("Please enter a valid URL.");
    }
  };

  const handleRemove = () => {
    if (selectedUrl) {
      chrome.runtime.sendMessage(
        extensionId,
        { type: "updateBlocklist", action: "remove", url: selectedUrl },
        (response) => {
          console.log("Remove response:", response);
          if (response && response.blocklist) {
            setBlocklist(response.blocklist);
            setSelectedUrl(""); // Clear the selection
          } else {
            console.error("Failed to remove URL", response);
          }
        }
      );
    }
  };

  const handleClearAll = () => {
    if (
      confirm(
        "Are you sure you want to clear all settings and data? This action cannot be undone."
      )
    ) {
      // Clear the UI immediately
      setBlocklist([]);
      setSelectedUrl("");

      // Send message to background.js to clear storage and dynamic rules
      chrome.runtime.sendMessage(
        extensionId,
        { type: "updateBlocklist", action: "clear" },
        (response) => {
          console.log("Clear response:", response);
          if (response && response.blocklist) {
            setBlocklist(response.blocklist);
          } else {
            console.error("Failed to clear blocklist", response);
          }
        }
      );
    }
  };

  const handleSelect = (url) => {
    setSelectedUrl(url);
  };

  const deselectAll = () => {
    setSelectedUrl("");
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        !event.target.closest("#blocklistDisplay li") &&
        !event.target.closest("#websiteInput")
      ) {
        deselectAll();
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div>
      <h1>Blocked Websites</h1>
      <ul id="blocklistDisplay" style={{ listStyleType: "none", padding: 0 }}>
        {blocklist.map((site, index) => (
          <li
            key={index}
            onClick={() => handleSelect(site)}
            style={{
              backgroundColor: site === selectedUrl ? "#b0b0b0" : "transparent",
              padding: "5px",
              cursor: "pointer",
            }}
          >
            {site}
          </li>
        ))}
      </ul>
      <input
        type="text"
        id="websiteInput"
        placeholder="Add a website URL"
        value={newUrl}
        onChange={(e) => setNewUrl(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />
      <button id="addButton" onClick={handleAdd} style={{ marginRight: "5px" }}>
        Add
      </button>
      <button
        id="removeButton"
        onClick={handleRemove}
        disabled={!selectedUrl}
        style={{ marginRight: "5px" }}
      >
        Remove
      </button>
      <button id="clearAllButton" onClick={handleClearAll}>
        Clear All
      </button>
    </div>
  );
}

export default BlockedWebsites;
