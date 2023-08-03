import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils
import { fData } from '../../../../utils/formatNumber';
// assets
import { countries } from '../../../../assets/data';
// components
import { CustomFile } from '../../../../components/upload';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../../components/hook-form';
import { IUserAccountList } from 'src/@types/user';
import { BASE_IMAGE_PATH } from 'src/utils/axios2';

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IUserAccountList, 'avatar'> {
  avatar: CustomFile | string | null;
}

type Props = {
  currentUser?: IUserAccountList;
};
export default function AccountGeneral({ currentUser }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const UpdateUserSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone_number: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    nationality: Yup.string().required('Nationality is required'),
    role: Yup.string().required('Role is required'),
    avatar: Yup.mixed().required('Avatar is required'),
  });

  const defaultValues = useMemo(
    () => ({
      first_name: currentUser?.first_name || '',
      last_name: currentUser?.last_name || '',
      username: currentUser?.username || '',
      email: currentUser?.email || '',
      phone_number: currentUser?.phone_number || '',
      address: currentUser?.address || '',
      nationality: currentUser?.nationality || '',
      // eslint-disable-next-line no-unsafe-optional-chaining
      avatar: currentUser?.avatar ? BASE_IMAGE_PATH + currentUser?.avatar : null,
      is_verified: currentUser?.is_verified || true,
      status: currentUser?.status,
      role: currentUser?.role || '',
      bio: currentUser?.bio || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Update success!');
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatar', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
           

            <Box sx={{ mb: 2 }}>
              <RHFUploadAvatar
                name="avatar"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="first_name" label="First Name" />
              <RHFTextField name="last_name" label="Last Name" />

              <RHFTextField name="email" label="Email Address" disabled />

              <RHFTextField name="phone_number" label="Phone Number" />

              <RHFTextField name="address" label="Address" />

              <RHFSelect native name="nationality" label="Country" placeholder="Country">
                <option value="" />
                {countries.map((country) => (
                  <option key={country.code} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </RHFSelect>
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFTextField name="bio" multiline rows={4} label="Bio" />

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
