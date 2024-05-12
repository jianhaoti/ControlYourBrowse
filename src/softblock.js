import React, { useEffect, useState } from "react";

function Softblock() {
  const [interceptedUrl, setInterceptedUrl] = useState("");

  useEffect(() => {
    const extensionId = 'gnbpdhalckpbngapiidobojpbeljnjlm'; // Replace with your actual extension ID
    // Check if the Chrome APIs are available
    if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage(extensionId, { message: "getInterceptedUrl" }, response => {
        if (response) {
          if (response.error) {
            console.error("Error retrieving URL:", response.error);
            return;
          }
          setInterceptedUrl(response.url);
        } else {
          console.error("Chrome Extension did not respond.");
        }
      });
    } else {
      console.error("Chrome API is not available");
    }
  }, []);

  return (
    <div>
      <h1>Softblock Page</h1>
      {interceptedUrl ? (
        <p>Intercepted URL: {interceptedUrl}</p>
      ) : (
        <p>No URL intercepted or already cleared.</p>
      )}
    </div>
  );
}

export default Softblock;
