import { render } from '@testing-library/react';
import InvestStrategy from '../InvestStrategy';
import { Snackbar } from '@mui/material';
import React from 'react';
describe('InvestStrategy', () => {
  it('snapshot testing of InvestStrategy', () => {
    React.useState = jest.fn().mockReturnValueOnce([0, {}]).mockReturnValueOnce([false, {}]);
    const domTree = render(
      <Snackbar>
        <InvestStrategy
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
