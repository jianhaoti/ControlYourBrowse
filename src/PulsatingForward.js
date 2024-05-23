import React from "react";
import { motion } from "framer-motion";
import FastForwardOutlinedIcon from "@mui/icons-material/FastForwardOutlined";
import { Typography } from "@mui/material";

const pulsateVariants = {
  // pointer leaves
  rest: {
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },

  // pointer enters
  hover: {
    scale: [1, 1.2, 1], // Scale up and then back down
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const PulsatingForward = () => {
  return (
    <div>
      <motion.div
        variants={pulsateVariants}
        initial="rest"
        whileHover="hover"
        animate="rest"
        style={{ display: "inline-block", cursor: "pointer" }} // Adjust size as needed
      >
        <FastForwardOutlinedIcon
          style={{
            fontSize: 100,
            fill: "transparent",
            stroke: "currentColor",
            strokeWidth: 0.33,
          }}
        />
      </motion.div>
      <Typography sx={{ fontFamily: "Display Regular" }}>
        bypass block
      </Typography>
    </div>
  );
};

export default PulsatingForward;
