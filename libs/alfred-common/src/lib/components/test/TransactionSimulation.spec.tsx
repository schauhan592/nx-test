import { render } from '@testing-library/react';
import TransactionSimulation from '../TransactionSimulation';
import { Snackbar } from '@mui/material';
describe('TransactionSimulation', () => {
  it('snapshot testing of TransactionSimulation', () => {
    const domTree = render(
      <Snackbar>
        <TransactionSimulation owner="test" transactionSpeed="medium" handleTxSpeed={() => {}} />
      </Snackbar>
    );
    expect(domTree).toMatchSnapshot();
  });
});
