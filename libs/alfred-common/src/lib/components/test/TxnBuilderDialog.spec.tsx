import { render } from '@testing-library/react';
import TxnBuilderDialog from '../TxnBuilderDialog';
import { Snackbar } from '@mui/material';
describe('TransactionBuilderDialog', () => {
  it('snapshot testing of TransactionBuilderDialog', () => {
    const domTree = render(
      <Snackbar>
        <TxnBuilderDialog
          {...{
            title: '',
            isOpen: true,
            steps: [
              {
                id: 0,
                label: '',
              },
            ],
            activeStep: 0,
            handleClose(): void {},
            setActiveStep: () => {},
            basicInfo: {
              amountToBeDeployed: { amount: 0, currency: '' },
            },
          }}
        />
      </Snackbar>
    );
    expect(domTree).toMatchSnapshot();
  });
});
