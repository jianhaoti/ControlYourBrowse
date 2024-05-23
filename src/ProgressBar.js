import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const ProgressBar = () => {
  const [percent, setPercent] = useState(0);

  // Simulate the progress bar shooting to the right on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setPercent(75);
    }, 100); // Slight delay to ensure the initial render is complete
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <BarContainer>
        <BarWrapper>
          <Bar percent={percent} />
        </BarWrapper>
        <GoalText>{percent}% Goal Progress</GoalText>
      </BarContainer>
    </div>
  );
};

const loadbar = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 75%; // This can be dynamic if needed
  }
`;

const BarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BarWrapper = styled.div`
  width: 200px; // Static width for the wrapper
  height: 10px;
  border-radius: 5px;
  background-color: #e9e7e2; // Background for the empty part of the bar
  overflow: hidden;
  position: relative;
`;

const Bar = styled.div`
  height: 100%;
  border-radius: 5px;
  background-color: #0063c6;
  width: 0; // Initial width
  ${({ percent }) => css`
    width: ${percent}%;
    transition: width 2s;
  `}
`;

const GoalText = styled.span`
  font-size: 16px;
  color: #333;
`;

export default ProgressBar;
