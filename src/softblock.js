import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AnimatedDaisyLoad from "./AnimatedDaisyLoad";
import TypewriterComponent from "typewriter-effect";
import { motion } from "framer-motion";
import ProgressBar from "./ProgressBar";
import { useSoftblock } from "./SoftblockContext";

function Softblock() {
  const { isSoftblockOn } = useSoftblock();
  const [interceptedUrl, setInterceptedUrl] = useState("");
  const [animationComplete, setAnimationComplete] = useState(false);
  const theme = useTheme();

  const typewriterStyle = {
    fontFamily: theme.typography.body2.fontFamily,
    fontWeight: 300,
    fontSize: theme.typography.body2.fontSize,
    color: theme.typography.body2.color,
    textAlign: "center",
    fontStyle: "italic",
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1],
      transition: {
        duration: 3.7,
        ease: "easeInOut",
      },
    },
  };

  useEffect(() => {
    const initializeChromeListener = () => {
      const extensionId = "gmpdhjhofpdgofmlocjhdcbbobjddpmm"; // Replace with your actual extension ID

      if (
        chrome &&
        chrome.runtime &&
        chrome.runtime.onMessageExternal &&
        chrome.runtime.sendMessage
      ) {
        // Listen for the intercepted URL message
        chrome.runtime.onMessageExternal.addListener(
          (message, sender, sendResponse) => {
            if (message.message === "interceptedUrl" && message.url) {
              try {
                // Extract the base URL
                const url = new URL(message.url);
                const hostname = url.hostname;
                setInterceptedUrl(hostname);

                // Navigate away if softblock isn't on
                if (!isSoftblockOn) {
                  window.location.href = message.url;
                }
              } catch (e) {
                console.error("Invalid URL:", message.url);
              }
            }
          }
        );

        // Request the intercepted URL
        chrome.runtime.sendMessage(extensionId, {
          message: "getInterceptedUrl",
        });
      } else {
        console.error("Chrome API is not available");
      }
    };

    initializeChromeListener();
  }, [isSoftblockOn]); // Only run this effect when isSoftblockOn changes

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
        position: "relative",
      }}
    >
      <AnimatedDaisyLoad
        interceptedUrl={interceptedUrl}
        onAnimationComplete={handleAnimationComplete}
      />
      {animationComplete && (
        <>
          {interceptedUrl ? (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                marginTop: "16rem",
              }}
            >
              <div style={typewriterStyle}>
                <TypewriterComponent
                  options={{
                    delay: 50,
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(`The Intercepted URL: ${interceptedUrl}`)
                      .callFunction(() => {
                        console.log("String typed out!");
                      })
                      .pauseFor(2500)
                      .callFunction(() => {
                        console.log("All strings were deleted");
                      })
                      .start();
                  }}
                />
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInVariants}
                >
                  <ProgressBar />
                </motion.div>
              </div>
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
