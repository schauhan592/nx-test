import { render } from '@testing-library/react';
import RemoveLiquidity from '../RemoveLiquidity';
import { Snackbar } from '@mui/material';
describe('RemoveLiquidity', () => {
  it('snapshot testing of RemoveLiquidity', () => {
    const domTree = render(
      <Snackbar>
        <RemoveLiquidity
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
