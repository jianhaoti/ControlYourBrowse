const url = window.location.href;
const visitTime = new Date().toISOString();

// Store the captured data using Chrome storage API
chrome.storage.session.set({ lastVisit: { url, time: visitTime } }, () => {
  console.log("URL and timestamp have been stored in session storage.");
});
