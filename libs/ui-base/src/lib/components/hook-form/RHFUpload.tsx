// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { FormHelperText } from '@mui/material';
// type
import {
  UploadAvatar,
  UploadMultiFile,
  UploadMultiFileProps,
  UploadProps,
  UploadSingleFile,
} from '../upload';
import { useCallback } from 'react';

// ----------------------------------------------------------------------

interface Props extends Omit<UploadProps, 'file'> {
  name: string;
  setValue?: any;
  handleDrop?: any;
}

export function RHFUploadAvatar({ name, setValue, handleDrop, ...other }: Props) {
  const { control } = useFormContext();

  const dropHandler = useCallback(
    (name: string, acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          name,
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <div>
            <UploadAvatar
              accept={{ 'image/*': [] }}
              error={checkError}
              onDrop={
                handleDrop
                  ? handleDrop
                  : (acceptedFiles) => {
                      dropHandler(name, acceptedFiles);
                    }
              }
              {...other}
              file={field.value}
            />
            {checkError && (
              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {error.message}
              </FormHelperText>
            )}
          </div>
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFUploadSingleFile({ name, setValue, handleDrop, ...other }: Props) {
  const { control } = useFormContext();
  const dropHandler = useCallback(
    (name: string, acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          name,
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <UploadSingleFile
            accept={{ 'image/*': [] }}
            file={field.value}
            error={checkError}
            onDrop={
              handleDrop
                ? handleDrop
                : (acceptedFiles) => {
                    dropHandler(name, acceptedFiles);
                  }
            }
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

interface RHFUploadMultiFileProps extends Omit<UploadMultiFileProps, 'files'> {
  name: string;
}

export function RHFUploadMultiFile({ name, ...other }: RHFUploadMultiFileProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && field.value?.length === 0;

        return (
          <UploadMultiFile
            accept={{ 'image/*': [] }}
            files={field.value}
            error={checkError}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error?.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    />
  );
}
