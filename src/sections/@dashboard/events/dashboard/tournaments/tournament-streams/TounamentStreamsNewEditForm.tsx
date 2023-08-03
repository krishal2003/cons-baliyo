import * as Yup from 'yup';
import { Dispatch, SetStateAction, useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
// routes
// components
import { useSnackbar } from '../../../../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../../../../components/hook-form';
import axiosInstance2 from 'src/utils/axios2';
import uuidv4 from '../../../../../../utils/uuidv4';
import { ITournamentStreams } from 'src/@types/tournaments';
import { re } from '../TournamentSponsorNewEditForm';

// ----------------------------------------------------------------------

type FormValuesProps = {
  stream_title: string;
  url: string;
};

type Props = {
  isEdit?: boolean;
  currentStream?: ITournamentStreams;
  tournamentSlug?: string;
  refetch: boolean;
  setRefetch: Dispatch<SetStateAction<boolean>>;
};

export default function TournamentStreamsNewEditForm({
  isEdit = false,
  currentStream,
  tournamentSlug,
  refetch,
  setRefetch,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const streamSchema = Yup.object().shape({
    stream_title: Yup.string().required('Stream Title is required'),
    url: Yup.string().matches(re, 'URL is not valid'),
  });

  const defaultValues = useMemo(
    () => ({
      stream_title: currentStream?.stream_title || '',
      url: currentStream?.url || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentStream]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(streamSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const formData = new FormData();
    formData.append('stream_title', data.stream_title);
    formData.append('url', data.url);
    if (!isEdit && !currentStream) {
      formData.append('value', uuidv4());
      formData.append('slug', tournamentSlug || '');
      axiosInstance2
        .post('/create-tournament-stream/', formData)
        .then((res) => {
          reset();
          enqueueSnackbar(res.data.success);
          setRefetch(!refetch);
        })
        .catch((error) => enqueueSnackbar(error.value, { variant: 'error' }));
    } else {
      formData.append('id', `${currentStream?.id}`);
      axiosInstance2
        .post('/update-tournament-stream/', formData)
        .then((res) => {
          reset();
          enqueueSnackbar(res.data.success);
          setRefetch(!refetch);
        })
        .catch((error) => enqueueSnackbar(error.value, { variant: 'error' }));
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} sx={{ pt: 1 }}>
        <RHFTextField name="stream_title" label="Stream Title" />
        <RHFTextField name="url" label="Stream URL" />
      </Stack>

      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {!isEdit ? 'Create Stream' : 'Save Changes'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
