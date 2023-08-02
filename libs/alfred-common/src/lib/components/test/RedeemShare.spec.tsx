import { render } from '@testing-library/react';
import RedeemShare from '../RedeemShare';
import { Snackbar } from '@mui/material';
describe('RedeemShare', () => {
  it('snapshot testing of RedeemShare', () => {
    const domTree = render(
      <Snackbar>
        <RedeemShare
          payload={undefined}
          setActiveStep={() => {}}
          walletAddress="0xtest"
          status={{
            isLoading: false,
            error: { isError: false },
            success: { isSuccess: true },
          }}
          setStatus={() => {}}
          transactionSpeed="fast"
          handleTxSpeed={() => {}}
        />
      </Snackbar>
    );
    expect(domTree).toMatchSnapshot();
  });
});
