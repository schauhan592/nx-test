import { render } from '@testing-library/react';
import Statics from '../Statics';
import { Snackbar } from '@mui/material';
describe('Statics', () => {
  it('snapshot testing of Statics', () => {
    const domTree = render(
      <Snackbar>
        <Statics heading="test" value="test" />
      </Snackbar>
    );
    expect(domTree).toMatchSnapshot();
  });
});
