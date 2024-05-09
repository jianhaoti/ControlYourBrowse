import React, { useEffect, useState } from "react";

function Softblock() {
  // State to store the intercepted URL
  const [interceptedUrl, setInterceptedUrl] = useState("");

  useEffect(() => {
    // Effect to run once on component mount
    console.log("Softblock page launched");

    // Fetch the intercepted URL from Chrome's local storage
    chrome.storage.local.get("interceptedURL", (data) => {
      if (data.interceptedURL) {
        console.log(
          "Received intercepted URL from storage:",
          data.interceptedURL
        );
        setInterceptedUrl(data.interceptedURL); // Set state

        // Optionally clear the URL from storage after retrieving it
        chrome.storage.local.remove("interceptedURL", () => {
          console.log("Intercepted URL cleared from storage.");
        });
      }
    });
  }, []); // Empty dependency array to mimic componentDidMount

  // Rendering the component with the intercepted URL
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
//intercepted url doesnt display
export default Softblock;
