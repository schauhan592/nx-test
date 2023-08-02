import { render } from '@testing-library/react';
import StaticsChips from '../StaticsChip';
import { Snackbar } from '@mui/material';
describe('StaticsChips', () => {
  it('snapshot testing of StaticsChips', () => {
    const domTree = render(
      <Snackbar>
        <StaticsChips title="test" value="test" />
      </Snackbar>
    );
    expect(domTree).toMatchSnapshot();
  });
});
