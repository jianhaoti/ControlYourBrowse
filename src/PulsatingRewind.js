import React from "react";
import { motion } from "framer-motion";
import FastRewindOutlinedIcon from "@mui/icons-material/FastRewindOutlined";
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

const PulsatingRewind = () => {
  return (
    <div>
      <motion.div
        variants={pulsateVariants}
        initial="rest"
        whileHover="hover"
        animate="rest"
        style={{ display: "inline-block", cursor: "pointer" }}
      >
        <FastRewindOutlinedIcon
          style={{
            fontSize: 100,
            fill: "transparent",
            stroke: "currentColor",
            strokeWidth: 0.33,
          }}
        />
      </motion.div>
      <Typography sx={{ fontFamily: "Display Regular" }}>
        back to work
      </Typography>
    </div>
  );
};

export default PulsatingRewind;
