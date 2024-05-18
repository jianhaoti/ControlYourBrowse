import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import AnimatedDaisyLoad from "./AnimatedDaisyLoad";
import TypewriterComponent from "typewriter-effect";
import { ProgressBar } from "./ProgressBar";

function Softblock() {
  const [interceptedUrl, setInterceptedUrl] = useState("");
  const [animationComplete, setAnimationComplete] = useState(false);
  const theme = useTheme();

  const typewriterStyle = {
    fontFamily: theme.typography.body2.fontFamily,
    fontWeight: 300,
    fontSize: theme.typography.body2.fontSize,
    color: theme.typography.body2.color,
    position: "center",
    top: "-2rem", // Adjust the top position as needed
    textAlign: "center",
    fontStyle:"italic",
  };

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
    console.log("cssbaseline") // Check what this outputs
    debugger;
    console.log(theme);
  }, []);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };

  return (
    <Box 
      sx={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: theme.palette.background.default 
      }}
    >
      <Typography variant="h4">Redoing Page</Typography>
      <AnimatedDaisyLoad onAnimationComplete={handleAnimationComplete}/>
      {animationComplete && (
        <>
          {interceptedUrl ? (
            <div style={typewriterStyle}>
              <TypewriterComponent
                options={{
                  delay: 50,
                }}
                onInit={(typewriter) => {
                  typewriter.typeString(`The Intercepted URL: ${interceptedUrl}`)
                    .callFunction(() => {
                      console.log('String typed out!');
                    })
                    .pauseFor(2500)
                    .callFunction(() => {
                      console.log('All strings were deleted');
                    })
                    .start();
                }}
              />
              <ProgressBar percents={75} caption="Loading..." />
            </div>
          ) : (
            <Typography>No URL intercepted or already cleared.</Typography>
          )}
        </>
      )}
    </Box>
  );
}

export default Softblock;
