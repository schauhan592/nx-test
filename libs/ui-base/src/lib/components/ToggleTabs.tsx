import { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export interface ToggleTabsProps {
  tabsOption: {
    id: string;
    tabLabel: string;
  }[];
}
export default function ToggleTabs({ tabsOption }: ToggleTabsProps) {
  const [role, setRole] = useState(tabsOption[0].id);

  const handleChangeRole = (event: React.MouseEvent<HTMLElement>, newRole: string | null) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  };
  return (
    <ToggleButtonGroup
      exclusive
      value={role}
      onChange={handleChangeRole}
      sx={{ mb: 5, borderRadius: 5 }}
      color={'primary'}
    >
      {' '}
      {tabsOption.map(({ id, tabLabel }) => {
        return (
          <ToggleButton
            key={id}
            value={id}
            aria-label={`${id} role`}
            sx={{
              '&.MuiToggleButton-root': {
                borderRadius: '30px !important',
                pl: 2,
              },
            }}
          >
            {tabLabel}
          </ToggleButton>
        );
      })}
      {/* <ToggleButton
        value={id}
        aria-label={`${id} role`}
        sx={{
          '&.MuiToggleButton-root': {
            borderRadius: '30px !important',
            pl: 2,
            pr: 2,
            background: 'primary.main',
          },
        }}
      >
        {tabLabel}
      </ToggleButton> */}
      {/* Next 7 days */}
    </ToggleButtonGroup>
  );
}
