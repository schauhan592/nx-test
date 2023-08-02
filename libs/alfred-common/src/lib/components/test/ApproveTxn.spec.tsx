import { render } from '@testing-library/react';
import ApproveTxn from '../ApproveTxn';
import { Snackbar } from '@mui/material';
describe('ApproveTxn', () => {
  it('snapshot testing of ApproveTxn', () => {
    const domTree = render(
      <Snackbar>
        <ApproveTxn
          value={0}
          owner=""
          status={{
            isLoading: false,
            error: { isError: false },
            success: { isSuccess: true },
          }}
          transactionSpeed="fast"
          handleTxSpeed={() => {}}
          setActiveStep={() => {}}
          setStatus={() => {}}
        />
      </Snackbar>
    );
    expect(domTree).toMatchSnapshot();
  });
});
