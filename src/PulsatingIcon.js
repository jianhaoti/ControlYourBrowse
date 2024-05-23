import React from 'react';
import { motion } from 'framer-motion';
import FastForwardOutlinedIcon from '@mui/icons-material/FastForwardOutlined';
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

const PulsatingIcon = () => {
  return (
    <motion.div
      variants={pulsateVariants}
      initial="rest"
      whileHover="hover"
      animate="rest"
      style={{ display: 'inline-block' }} // Adjust size as needed
    >
      <FastForwardOutlinedIcon style={{ fontSize: 100,
        fill: 'transparent',
        stroke: 'currentColor',
        strokeWidth: 0.33,
      }} />
      <Typography sx={{fontFamily: 'Display Regular'}}>bypass block</Typography>
    </motion.div>
  );
};

export default PulsatingIcon;
