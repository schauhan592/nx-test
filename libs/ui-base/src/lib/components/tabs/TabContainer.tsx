import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box, { BoxProps } from '@mui/material/Box';

function a11yProps(index: number | string) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface BasicTabsProps extends BoxProps {
  value: number;
  children: React.ReactNode;
  handleChange(event: React.SyntheticEvent, newValue: number): void;
  tabs: TabValuesType[];
}

export type TabValuesType = {
  label: string;
  id: number | string;
};

export default function BasicTabs({
  value,
  children,
  tabs,
  handleChange,
  ...others
}: BasicTabsProps) {
  return (
    <Box {...others}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {tabs?.map(({ label, id }) => {
            return <Tab key={id} label={label} {...a11yProps(id)} />;
          })}
        </Tabs>
      </Box>
      {children}
    </Box>
  );
}
