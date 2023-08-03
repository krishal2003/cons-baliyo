import * as Yup from 'yup';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField, RHFUpload } from '../../../components/hook-form';
import axiosInstance2, { BASE_IMAGE_PATH } from 'src/utils/axios2';
import uuidv4 from '../../../utils/uuidv4';
import { ITeam } from 'src/@types/team';
import { Box } from '@mui/system';
// import { re } from '../events/dashboard/tournaments/TournamentSponsorNewEditForm';
import { CustomFile } from 'src/components/upload';

// ----------------------------------------------------------------------

type FormValuesProps = {
  name: string;
  post: string;
  image: CustomFile | string | null;
  facebook_link: string;
  twitter_link: string;
  discord_link: string;
  instagram_link: string;
  linkedin_link: string;
  twitch_link: string;
};

type Props = {
  isEdit?: boolean;
  refetch: boolean;

  setRefetch: Dispatch<SetStateAction<boolean>>;
  currentTeam?: Partial<ITeam>;
};

export default function TeamNewEditForm({
  isEdit = false,
  currentTeam,
  setRefetch,
  refetch,
}: Props) {
  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    post: Yup.string().required('Post is required'),
    image: Yup.mixed().required('Image is required'),
  });
  const defaultValues = useMemo(
    () => ({
      name: currentTeam?.name || '',
      post: currentTeam?.post || '',
      facebook_link: currentTeam?.facebook_link || '',
      instagram_link: currentTeam?.instagram_link || '',
      twitch_link: currentTeam?.twitch_link || '',
      twitter_link: currentTeam?.twitter_link || '',
      linkedin_link: currentTeam?.linkedin_link || '',
      discord_link: currentTeam?.discord_link || '',
      image: currentTeam?.image ? `${BASE_IMAGE_PATH + currentTeam.image}` : null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentTeam]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentTeam) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentTeam]);

  const onSubmit = async (data: FormValuesProps) => {
    const formData = new FormData();
    formData.append('value', uuidv4());
    formData.append('name', data.name);
    formData.append('post', data.post);
    formData.append('image', data.image as Blob);
    formData.append('facebook_link', data.facebook_link);
    formData.append('instagram_link', data.instagram_link);
    formData.append('discord_link', data.discord_link);
    formData.append('twitch_link', data.twitch_link);
    formData.append('twitter_link', data.twitter_link);
    formData.append('linkedin_link', data.linkedin_link);

    if (isEdit) {
      axiosInstance2
        .post('/update-ourteam/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          params: {
            id: currentTeam?.id,
          },
          
        })
        .then((res) => {
          reset();
          enqueueSnackbar(res.data.success);
          push(PATH_DASHBOARD.ourTeam.list);
          setRefetch(!refetch);

        })
        .catch((error) => console.error(error));
    } else {
      axiosInstance2
        .post('/create-ourteam/ ', formData)
        .then((res) => {
          reset();
          enqueueSnackbar(res.data.success);
          setRefetch(!refetch);
        })
        .catch((error) => enqueueSnackbar(error.value, { variant: 'error' }));
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('image', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = () => {
    setValue('image', null);
  };

  return (
    <Box sx={{ maxWidth: '1800px' }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Box sx={{ display: 'grid', gap: 2 }}>
            <Box sx={{ display: 'grid', gap: 2 }}>
              <RHFTextField name="name" label="Full Name" />
              <RHFTextField name="post" label="Post" />
              <RHFUpload
                name="image"
                maxSize={2097152}
                onDrop={handleDrop}
                onDelete={handleRemoveFile}
              />{' '}
            </Box>
            <Box sx={{ display: 'grid', gap: 2 }}>
              <RHFTextField name="facebook_link" label="Facebook Link" />
              <RHFTextField name="instagram_link" label="Instagram Link" />
              <RHFTextField name="twitter_link" label="Twitter Link" />
              <RHFTextField name="twitch_link" label="Twitch Link" />
              <RHFTextField name="discord_link" label="Discord Link" />
              <RHFTextField name="linkedin_link" label="Linkedin Link" />
            </Box>
          </Box>
        </Stack>

        <Stack alignItems="flex-end" sx={{ mt: 3, pb: 2 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!isEdit ? 'Create new member' : 'Save Changes'}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
}
