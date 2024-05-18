import styled from 'styled-components';
import { Box } from './box';
import { compose } from '@styled-system/core';
import {
  alignContent,
  alignItems,
  alignSelf,
  display,
  flex,
  flexBasis,
  flexDirection,
  flexGrow,
  flexShrink,
  flexWrap,
  justifyContent,
  justifyItems,
  justifySelf,
} from 'styled-system';

const composedHelpers = compose(
  alignContent,
  alignItems,
  alignSelf,
  display,
  flex,
  flexBasis,
  flexDirection,
  flexGrow,
  flexShrink,
  flexWrap,
  justifyContent,
  justifyItems,
  justifySelf
);

export const Flex = styled(Box)`
  display: flex;
  ${composedHelpers}
`;

Flex.defaultProps = {};