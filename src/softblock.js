document.addEventListener("DOMContentLoaded", function () {
  console.log("softblock page launched");
  chrome.storage.local.get("interceptedURL", function (data) {
    if (data.interceptedURL) {
      console.log(
        "Received intercepted URL from storage:",
        data.interceptedURL
      );
      const interceptedElement = document.getElementById("interceptedUrl");
      if (interceptedElement) {
        interceptedElement.textContent = `Intercepted URL: ${data.interceptedURL}`;
      } else {
        console.error("Element 'interceptedUrl' not found.");
      }

      // Clear the URL from storage after using it
      chrome.storage.local.remove("interceptedURL", function () {
        console.log("Intercepted URL cleared from storage.");
      });
    }
  });
});
