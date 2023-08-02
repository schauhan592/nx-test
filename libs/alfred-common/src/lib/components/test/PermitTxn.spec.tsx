import { render } from '@testing-library/react';
import PermitTxn from '../PermitTxn';
import { Snackbar } from '@mui/material';
describe('PermitTxn', () => {
  it('snapshot testing of PermitTxn', () => {
    const domTree = render(
      <Snackbar>
        <PermitTxn
          value={1}
          owner="0xtest"
          setActiveStep={() => {}}
          status={{
            isLoading: false,
            error: { isError: false },
            success: { isSuccess: true },
          }}
          setStatus={() => {}}
        />
      </Snackbar>
    );
    expect(domTree).toMatchSnapshot();
  });
});
