import { SetStateAction, useState } from 'react';
import TabContainer, { TabValuesType } from './TabContainer';
import TabPanel from './TabPanel';

export default {
  title: 'Tabs',
  component: TabContainer,
};

const tabs: TabValuesType[] = [
  { label: 'NFTs', id: 0 },
  { label: 'Collections', id: 1 },
  { label: 'Categories', id: 2 },
  { label: 'Activities', id: 3 },
  { label: 'Portfolio', id: 4 },
];

export const Primary = () => {
  const [value, setValue] = useState<number>(0);
  const handleChange = (e: any, newValue: SetStateAction<number>) => {
    setValue(newValue);
  };
  return (
    <TabContainer tabs={tabs} handleChange={handleChange} value={value}>
      <TabPanel value={value} index={0}>
        This is tab 0
      </TabPanel>
      <TabPanel value={value} index={1}>
        This is tab 1
      </TabPanel>
      <TabPanel value={value} index={2}>
        This is tab 2
      </TabPanel>
    </TabContainer>
  );
};
