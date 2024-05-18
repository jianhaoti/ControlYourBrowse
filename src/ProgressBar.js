import React, { useContext } from "react";
import styled from "styled-components";
import { Box } from "./box";
import { Flex } from "./flex";
import { Typography } from "./typography";
import { MotionBox } from "./motion-box";
import { IntersectionContext } from "./intersection-observer";
import { useTheme } from '@mui/material/styles';

const Bar = styled(Box)`
  overflow: hidden;
  position: relative;
  border-radius: 2px;
`;

const BarFilling = styled(MotionBox)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const BarCaption = styled(Box)`
  position: relative;
  text-align: right;
  font-weight: 0;
  padding-right: 2px;
`;

const BarPercents = styled(Typography)`
  color: #000;
  font-weight: 2;
  padding-left: 1px;
`;

export const ProgressBar = ({
  percents,
  caption,
  duration = 3,
  delay = 0.5,
  easing = "easeInOut",
  barWidth = 300,
  barHeight = 24,
}) => {
  const { inView } = useContext(IntersectionContext);
  const percentsOffset = (percents - 100) * (barWidth / 100);
  const theme = useTheme();
  const progressColor = theme.palette.primary.blue || "#0000FF";
  const baseColor = theme.palette.primary.light || "#FFFFFF";

  const transition = {
    duration,
    delay,
    ease: easing,
  };

  const variants = {
    enter: {
      x: -barWidth,
    },
    animate: {
      x: [-barWidth, percentsOffset],
      transition,
    },
  };

  return (
    <Flex my={1}>
      <Bar width={barWidth} height={barHeight} bg={baseColor}>
        <BarFilling
          variants={variants}
          initial="enter"
          animate={inView ? "animate" : "enter"}
          exit="enter"
          bg={progressColor}
        />
        {caption && (
          <BarCaption
            fontSize={barHeight >= 20 ? 2 : "8px"}
            lineHeight={`${barHeight}px`}
          >
            {caption}
          </BarCaption>
        )}
      </Bar>
      <BarPercents>{percents}%</BarPercents>
    </Flex>
  );
};
