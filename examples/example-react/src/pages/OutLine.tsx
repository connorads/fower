import React from 'react';
import { Box } from '@styli/react';

export default () => {
  return (
    <Box>
      <Box f-30 fontBold>
        OutLine
      </Box>
      <Box debug toCenter>
        <Box toCenter s-200>
          <Box as="input" defaultValue="common input" />
        </Box>
        <Box toCenter s-200>
          <Box as="input" outlineNone defaultValue="outlineNone" />
        </Box>
        <Box toCenter s-200>
          <Box as="input" outlineOffset-10 defaultValue="outlineOffset-10" />
        </Box>
        <Box toCenter s-200>
          <Box
            as="input"
            outline="8px ridge rgba(170, 50, 220, .6)"
            defaultValue="8px ridge rgba(170, 50, 220, .6)"
          />
        </Box>
      </Box>
    </Box>
  );
};
