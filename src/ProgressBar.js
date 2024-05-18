import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

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
        <Bar percent={percent} />
        <GoalText>{percent}% Goal Progress</GoalText>
      </BarContainer>
    </div>
  );
};



const BarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Bar = styled.div`
  width: 200px;
  height: 25px;
  border-radius: 10px;
  background: linear-gradient(to right, pink 50%, #e9e7e2 0);
  background-size: 200% 100%;
  background-position: right;
  ${({ percent }) => css`
    background-position: ${100 - percent}%;
    transition: all 0.5s ease;
  `}
`;

const GoalText = styled.span`
  font-size: 16px;
  color: #333;
`;

const PercentBar = styled.div`
  width: 200px;
  height: 25px;
  border-radius: 10px;
  background: linear-gradient(to right, skyblue 50%, #e9e7e2 0);
  background-size: 200% 100%;
  background-position: right;
  ${({ percent }) => css`
    background-position: ${100 - percent}%;
    transition: all 0.3s ease;
  `}
`;

const Box = styled.div`
  display: flex;
  gap: 8px;
`;

export default ProgressBar;
