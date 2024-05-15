import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';

function Softblock() {
  const [interceptedUrl, setInterceptedUrl] = useState("");
  const theme = useTheme();

  useEffect(() => {
    const extensionId = "gnbpdhalckpbngapiidobojpbeljnjlm"; // Replace with your actual extension ID
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

  useEffect(() => {
    console.log("cssbaseline") // Check what this outputs\
    debugger;
    console.log(theme);
  }, []);
  

  return (
    <div style={{backgroundColor: theme.palette.background.default}}>
      <Typography variant = "h4">Softblock Page</Typography>
      {interceptedUrl ? (
        <Typography>Intercepted URL: {interceptedUrl}</Typography>
      ) : (
        <Typography>No URL intercepted or already cleared.</Typography>
      )}
    </div>
  );
}

export default Softblock;
