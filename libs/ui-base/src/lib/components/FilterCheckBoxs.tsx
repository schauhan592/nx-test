import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { checkTrait, CustomAccordian } from '@sdf/base';
import { useRouter } from 'next/router';

import { memo } from 'react';

const StyledButton = styled(Button)({
  margin: 3,
});
const FilterCheckBoxs = memo(
  ({
    title,
    options,
    expanded,
    handleCheck,
    onClick,
  }: {
    title: string;
    expanded?: boolean;
    handleCheck: (type: string, item: boolean) => void;
    options: { label: string; name: string }[];
    onClick: () => void;
  }) => {
    return (
      <CustomAccordian
        expandIcon={<ExpandMoreIcon />}
        expanded={expanded}
        onClick={onClick}
        summary={<Typography variant="subtitle1">{title}</Typography>}
        details={<MultiCheckbox handleCheck={handleCheck} options={options} />}
      />
    );
  }
);

const TraitsCheckBoxs = memo(
  ({
    title,
    options,
    expanded,
    handleCheck,
  }: {
    title: string;
    expanded?: boolean;
    handleCheck: (group: string, name: string, item: boolean) => void;
    options: { value: string; count: number }[];
  }) => {
    return (
      <CustomAccordian
        expandIcon={<ExpandMoreIcon />}
        expanded={expanded}
        summary={<Typography variant="subtitle1">{title}</Typography>}
        details={<TraitsMultiCheckbox title={title} handleCheck={handleCheck} options={options} />}
      />
    );
  }
);

const FilterButtons = memo(
  ({
    title,
    options,
    expanded,
    handleClick,
    onClick,
  }: {
    title: string;
    expanded?: boolean;
    handleClick: (type: string, item: string) => void;
    options: { id: string; name: string }[];
    onClick: () => void;
  }) => {
    const { query } = useRouter();
    const isQuery = query[title];
    return (
      <CustomAccordian
        expandIcon={<ExpandMoreIcon />}
        expanded={expanded}
        onClick={onClick}
        summary={<Typography variant="subtitle1">{title}</Typography>}
        details={options.map((item: { id: string; name: string }, index: number) => {
          const isActive = !isQuery ? index === 0 : item.id === isQuery;
          return (
            <StyledButton
              variant={isActive ? 'contained' : 'outlined'}
              onClick={() => handleClick(title, item.id)}
            >
              {item.name}
            </StyledButton>
          );
        })}
      />
    );
  }
);

const MultiCheckbox = memo(
  ({
    options,
    handleCheck,
  }: {
    options: { label: string; name: string }[];
    handleCheck: (type: string, item: boolean) => void;
  }) => {
    const { query } = useRouter();
    return (
      <FormGroup>
        {options?.map((item, index) => {
          return (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={Boolean(query[item.name])}
                  onChange={(e) => handleCheck(item.name, e.target.checked)}
                  name={item.label}
                />
              }
              label={item.label}
            />
          );
        })}
      </FormGroup>
    );
  }
);

const TraitsMultiCheckbox = memo(
  ({
    options,
    title,
    handleCheck,
  }: {
    title: string;
    options: { value: string; count: number }[];
    handleCheck: (group: string, name: string, item: boolean) => void;
  }) => {
    const router = useRouter();
    return (
      <FormGroup>
        {options?.map((item, index) => {
          return (
            <Box key={index} display="flex" justifyContent="space-between" alignItems="center">
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={checkTrait(router, title, item.value)}
                    onChange={(e) => handleCheck(title, item.value, e.target.checked)}
                    name={item.value}
                  />
                }
                label={item.value}
              />
              <Typography variant="subtitle1">{item.count}</Typography>
            </Box>
          );
        })}
      </FormGroup>
    );
  }
);

export { FilterCheckBoxs, TraitsCheckBoxs, FilterButtons, MultiCheckbox, TraitsMultiCheckbox };
