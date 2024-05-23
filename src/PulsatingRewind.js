import React from 'react';
import { motion } from 'framer-motion';
import FastRewindOutlinedIcon from '@mui/icons-material/FastRewindOutlined';
import { Typography } from '@mui/material';

const pulsateVariants = {
  rest: {
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  },
  hover: {
    scale: [1, 1.2, 1], // Scale up and then back down
    transition: {
      duration: 1,
      ease: 'easeInOut',
    }
  }
};

const PulsatingRewind = () => {
  return (
    <motion.div
      variants={pulsateVariants}
      initial="rest"
      whileHover="hover"
      style={{ display: 'inline-block' }} // Adjust size as needed
    >
      <FastRewindOutlinedIcon
        style={{
          fontSize: 100,
          fill: 'transparent',
          stroke: 'currentColor',
          strokeWidth: 0.33,
        }}
      />
      <Typography sx={{fontFamily: 'Display Regular'}}>back to work</Typography>
    </motion.div>
  );
};

export default PulsatingRewind;
