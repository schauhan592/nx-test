import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { styled, useTheme } from '@mui/material/styles';
import * as React from 'react';
import { TxnSubStep } from '../@types';
import Typography from '@mui/material/Typography';
import { Components } from './TxnBuilderDialog';
import { Box } from '@mui/material';

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      // backgroundImage: `linear-gradient( 95deg,${theme.palette.primary.light} 0%,${theme.palette.primary.light} 50%,${theme.palette.primary.light} 100%)`,
      backgroundColor: 'transparent',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      // backgroundImage: `linear-gradient( 95deg,${theme.palette.primary.light} 0%,${theme.palette.primary.light} 50%,${theme.palette.primary.light} 100%)`,
      backgroundColor: 'transparent',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: 'transparent',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.divider,
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: `linear-gradient( 136deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.light} 50%, ${theme.palette.primary.main} 100%)`,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: `linear-gradient( 136deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.light} 50%, ${theme.palette.primary.main} 100%)`,
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <AssignmentTurnedInIcon />,
    2: <RocketLaunchIcon />,
    3: <MonetizationOnIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

type Props = {
  steps: TxnSubStep[];
  activeStep: number;
  isWithdrawel?: boolean;
  componentProps?: any;
};

export default function DeployStepper({
  steps,
  activeStep = 0,
  isWithdrawel = false,
  componentProps,
}: Props) {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        width: '100%',
        borderColor: theme.palette.divider,
        borderRadius: 1,
        backgroundColor: 'transparent',
        py: 3,
      }}
      spacing={6}
    >
      <Stepper
        alternativeLabel
        activeStep={isWithdrawel ? activeStep - 2 : activeStep}
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          backgroundColor: 'transparent',
        }}
        connector={<ColorlibConnector />}
      >
        {steps.map(({ label, id }) => (
          <Step
            key={id}
            sx={{
              width: '100%',
              backgroundColor: 'transparent',
              margin: '10px 0px',
            }}
          >
            <Accordion
              sx={{
                width: '100%',
                borderRadius: '16px !important',
                backgroundColor: '#373737',
              }}
              expanded={activeStep === id}
            >
              <AccordionSummary aria-controls="panel1a-content">
                <Stack
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginLeft: '-5px !important',
                  }}
                >
                  <Box
                    sx={{
                      width: '82%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <StepLabel
                      sx={{ transform: 'scale(.8)', marginRight: '10px' }}
                      StepIconComponent={ColorlibStepIcon}
                    ></StepLabel>
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>
                      {label}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#191919',
                      borderRadius: '10px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: id <= activeStep ? '#3574F3' : '#ffffff',
                    }}
                  >
                    {id + 1 < 10 ? `0${id + 1}` : id + 1}
                  </Box>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Components {...componentProps} />
                </Box>
              </AccordionDetails>
            </Accordion>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
