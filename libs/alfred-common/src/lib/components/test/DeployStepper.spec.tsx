import { render } from '@testing-library/react';
import DeployStepper from '../DeployStepper';
import { Snackbar } from '@mui/material';
describe('DeployStepper', () => {
  it('snapshot testing of DeployStepper', () => {
    const domTree = render(
      <Snackbar>
        <DeployStepper steps={[{ id: 0, label: '' }]} activeStep={1} />
      </Snackbar>
    );
    expect(domTree).toMatchSnapshot();
  });
});
