import React from 'react';
import { styled } from '@mui/material/styles';

const PulseStyle = styled('div')(({ theme }) => ({
  background: 'rgb(3, 213 ,192)',
  borderRadius: '50%',
  margin: 10,
  height: 10,
  width: 10,
  // rgb(3 213 192)
  boxShadow: '0 0 0 0 rgba(3, 213, 192, 1)',
  transform: 'scale(1)',
  animation: 'pulse 2s infinite',

  '@keyframes pulse': {
    '0%': {
      transform: 'scale(0.95)',
      boxShadow: '0 0 0 0 rgba(3, 213, 192, 0.7)',
    },
    '70%': {
      transform: 'scale(1)',
      boxShadow: '0 0 0 10px rgba(3, 213, 192, 0)',
    },
    '100%': {
      transform: 'scale(0.95)',
      boxShadow: '0 0 0 0 rgba(3, 213, 192,0)',
    },
  },
}));
export default function Pulse() {
  // const useStyles = makeStyles({
  //   pulse: {
  //     background: 'black',
  //     borderRadius: '50%',
  //     margin: 10,
  //     height: 10,
  //     width: 10,
  //     boxShadow: '0 0 0 0 rgba(0, 0, 0, 1)',
  //     transform: 'scale(1)',
  //     animation: '$pulse 2s infinite',
  //   },
  //   '@keyframes pulse': {
  //     '0%': {
  //       transform: 'scale(0.95)',
  //       boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.7)',
  //     },
  //     '70%': {
  //       transform: 'scale(1)',
  //       boxShadow: '0 0 0 10px rgba(0, 0, 0, 0)',
  //     },
  //     '100%': {
  //       transform: 'scale(0.95)',
  //       boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
  //     },
  //   },
  // });

  // const classes = useStyles();

  return (
    <>
      <PulseStyle></PulseStyle>
    </>
  );
}
