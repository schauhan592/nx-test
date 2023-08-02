import { render } from '@testing-library/react';
import TableCheckBox from '../TableCheckbox';
import { Snackbar } from '@mui/material';
describe('TableCheckBox', () => {
  it('snapshot testing of TableCheckBox', () => {
    const domTree = render(
      <Snackbar>
        <TableCheckBox />
      </Snackbar>
    );
    expect(domTree).toMatchSnapshot();
  });
});
