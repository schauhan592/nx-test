import { render } from '@testing-library/react';
import InfoToolTip from '../InfoToolTip';
import { Snackbar } from '@mui/material';
describe('infoToolTip', () => {
  it('snapshot testing of infoToolTip', () => {
    const domTree = render(
      <Snackbar>
        <InfoToolTip tooltipTitle="test" />
      </Snackbar>
    );
    expect(domTree).toMatchSnapshot();
  });
});
