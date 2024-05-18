import styled from "styled-components";
import { Box } from "./box";

import { lineHeight } from "styled-system";
import { compose } from "@styled-system/core";

const composedHelpers = compose(lineHeight);

export const Typography = styled(Box)`
  ${composedHelpers}
`;

Typography.defaultProps = {
  // as: 'p',
  fontWeight: 1
  // color: 'text500',
};
