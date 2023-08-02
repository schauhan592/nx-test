import { useState } from 'react';

// ----------------------------------------------------------------------

export default function useTabs(defaultValues?: string | number) {
  const [currentTab, setCurrentTab] = useState(defaultValues || '');

  return {
    currentTab,
    onChangeTab: (event: React.SyntheticEvent<Element, Event>, newValue: string | number) => {
      setCurrentTab(newValue);
    },
    setCurrentTab,
  };
}
