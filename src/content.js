chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "interceptedURL") {
    console.log("Received intercepted URL from background:", message.url);
    // Process the intercepted URL
    document.getElementById(
      "interceptedUrl"
    ).textContent = `Intercepted URL: ${message.url}`;
  }
  // You can add more conditions for other types of messages here
});
