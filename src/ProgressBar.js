import React, { useContext } from "react";
import styled from "styled-components";
import { Box } from "./box";
import { Flex } from "./flex";
import { Typography } from "./typography";
import { MotionBox } from "./motion-box";
import { IntersectionContext } from "./intersection-observer";
import { useTheme } from '@mui/material/styles';

// const theme = useTheme();

const Bar = styled(Box)`
  overflow: hidden;
`;
Bar.defaultProps = {
  position: "relative",
  borderRadius: 2,
};

const BarFilling = styled(MotionBox)``;
BarFilling.defaultProps = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
};

const BarCaption = styled(Box)``;
BarCaption.defaultProps = {
  position: "relative",
  textAlign: "right",
  fontWeight: 0,
  pr: 2,
};

const BarPercents = styled(Typography)``;
BarPercents.defaultProps = {
  color: "#000",
  fontWeight: 2,
  pl: 1,
};

export const ProgressBar = ({
  percents,
  caption,
  duration = 3,
  delay = 0.5,
  easing = "easeInOut",
  barWidth = 300,
  barHeight = 24,
//   baseColor = "#fff",
}) => {

  const { inView } = useContext(IntersectionContext);

  const percentsOffset = (percents - 100) * (barWidth / 100);

  const theme = useTheme();

  const progressColor = theme.palette.primary.blue
  const baseColor = theme.palette.primary.light;

  const transition = {
    duration: duration,
    delay: delay,
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
