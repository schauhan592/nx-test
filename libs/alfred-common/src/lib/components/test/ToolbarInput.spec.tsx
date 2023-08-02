import { render } from '@testing-library/react';
import QuickSearchToolbarProps from '../ToolbarInput';
import { Snackbar } from '@mui/material';
describe('ToolbarInput', () => {
  it('snapshot testing of ToolbarInput', () => {
    const domTree = render(
      <Snackbar>
        <QuickSearchToolbarProps searchWord="" placeholder="" setSearchWord={() => {}} />
      </Snackbar>
    );
    expect(domTree).toMatchSnapshot();
  });
});
