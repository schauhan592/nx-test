// @mui
import { Box, Dialog as MuiDialog, DialogProps, Paper } from '@mui/material';
import { AnimatePresence, m } from 'framer-motion';

import { varFade } from '../animate';

export interface Props extends DialogProps {
  variants?: Record<string, unknown>;
  onClose?: VoidFunction;
  animate?: boolean;
}

export default function Dialog({
  open = false,
  variants,
  onClose,
  children,
  sx,
  animate = false,
  ...other
}: Props) {
  if (animate) {
    return (
      <AnimatePresence>
        <MuiDialog
          fullWidth
          open={open}
          onClose={onClose}
          {...other}
          PaperComponent={(props) => (
            <Box
              component={m.div}
              {...(variants ||
                varFade({
                  distance: 120,
                  durationIn: 0.32,
                  durationOut: 0.24,
                  easeIn: 'easeInOut',
                }).inUp)}
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box onClick={onClose} sx={{ width: '100%', height: '100%', position: 'fixed' }} />
              <Paper sx={sx} {...props}>
                {props.children}
              </Paper>
            </Box>
          )}
        >
          {children}
        </MuiDialog>
      </AnimatePresence>
    );
  } else {
    return (
      <MuiDialog
        fullWidth
        open={open}
        onClose={onClose}
        {...other}
        PaperComponent={(props) => (
          <Box
            component={m.div}
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box onClick={onClose} sx={{ width: '100%', height: '100%', position: 'fixed' }} />
            <Paper sx={sx} {...props}>
              {props.children}
            </Paper>
          </Box>
        )}
      >
        {children}
      </MuiDialog>
    );
  }
}
