document.addEventListener("DOMContentLoaded", function () {
  const siteUrl = window.location.href;

  // List of websites to detect
  const targetSites = ["youtube.com", "twitter.com"];

  // Check if the current URL contains any of the target sites
  const isTargetSite = targetSites.some((site) => siteUrl.includes(site));

  if (isTargetSite) {
    // Send message to background script with the current URL
    chrome.runtime.sendMessage({ type: "siteVisited", url: siteUrl });
  }
});
