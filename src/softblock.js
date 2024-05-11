// Softblock.js
import React, { useEffect, useState } from "react";

function Softblock() {
  const [interceptedUrl, setInterceptedUrl] = useState("");

  useEffect(() => {
    chrome.runtime.sendMessage({action: "fetchInterceptedURL"}, (response) => {
      if (response.interceptedURL) {
        setInterceptedUrl(response.interceptedURL);
      } else if (response.error) {
        console.error("Error fetching the intercepted URL:", response.error);
      }
    });
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
