import { render } from '@testing-library/react';
import CardWithErrorBoundary from '../CardWithErrorBoundary';
import { Snackbar } from '@mui/material';
describe('CardWithERrorBoundry', () => {
  it('snapshot testing of CardWithERrorBoundry', () => {
    const domTree = render(
      <Snackbar>
        <CardWithErrorBoundary />
      </Snackbar>
    );
    expect(domTree).toMatchSnapshot();
  });
});
