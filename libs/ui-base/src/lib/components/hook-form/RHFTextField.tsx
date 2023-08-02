// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  positive?: boolean;
  enableWheel?: boolean;
};

type Props = IProps & TextFieldProps;

export default function RHFTextField({ name, positive, enableWheel, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          onFocus={(e) => {
            !enableWheel &&
              e.target.addEventListener(
                'wheel',
                function (e) {
                  e.preventDefault();
                },
                { passive: false }
              );
          }}
          onKeyPress={(event) => {
            if (positive && (event?.key === '-' || event?.key === '+')) {
              event.preventDefault();
            }
          }}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}
