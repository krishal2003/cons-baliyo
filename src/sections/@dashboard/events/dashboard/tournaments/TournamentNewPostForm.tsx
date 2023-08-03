import * as Yup from 'yup';
import { useCallback, useMemo, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, Typography, MenuItem, Divider, TextField } from '@mui/material';
import { paramCase } from 'change-case';
import axiosInstance2, { BASE_IMAGE_PATH } from 'src/utils/axios2';
import { useSnackbar } from '../../../../../components/snackbar';
import FormProvider, {
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFSelect,
  RHFUploadAvatar,
} from '../../../../../components/hook-form';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { Tournament } from 'src/@types/tournaments';
import { addDays, isBefore } from 'date-fns';
import { fDateTime } from 'src/utils/formatTime';
import { MobileDateTimePicker } from '@mui/x-date-pickers';

type FormValuesProps = {
  tournament_name: Tournament['tournament_name'];
  tournament_short_description: string;
  tournament_start_date: Date | string;
  tournament_end_date: Date | string;
  tournament_description: Tournament['tournament_description'];
  tournament_logo: Tournament['tournament_logo'];
  tournament_banner: Tournament['tournament_banner'];
  game_id: string | number;
  tournament_mode: string;
};

type Props = {
  isEdit?: boolean;
  currentTournament?: Tournament;
};

export default function TournamentNewPostForm({ isEdit, currentTournament }: Props) {
  const {
    push,
    query: { slug },
  } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [GAME_OPTIONS, SET_GAMES] = useState<
    { id: string; game_name: string; game_type: string }[]
  >([]);

  const TournamentSchema = Yup.object().shape({
    tournament_name: Yup.string().required('Tournament name is required'),
    tournament_short_description: Yup.string().required('Tournament short description is required'),
    tournament_description: Yup.string().required('Tournament description is required'),
    tournament_logo: Yup.mixed().required('Tournament logo is required'),
    game_id: Yup.string().required('Game is required'),
    tournament_banner: Yup.mixed().required('Tournament Banner is required'),
    tournament_mode: Yup.string().required('Tournament Mode is required'),
  });

  const defaultValues = useMemo(
    () => ({
      tournament_name: currentTournament?.tournament_name || '',
      tournament_short_description: currentTournament?.tournament_short_description || '',
      tournament_description: currentTournament?.tournament_description || '',
      tournament_start_date: currentTournament?.tournament_start_date || addDays(new Date(), 1),
      tournament_end_date: currentTournament?.tournament_end_date || addDays(new Date(), 3),
      game_id: currentTournament?.game.id || '',
      tournament_logo: currentTournament?.tournament_logo
        ? `${BASE_IMAGE_PATH + currentTournament.tournament_logo}`
        : null,
      tournament_banner: currentTournament?.tournament_banner
        ? `${BASE_IMAGE_PATH + currentTournament.tournament_banner}`
        : null,
      tournament_mode: currentTournament?.tournament_mode || '',
    }),
    [currentTournament]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(TournamentSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const getPost = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/game-list');
      SET_GAMES(response.data.games);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getPost();
  }, [getPost]);

  useEffect(() => {
    if (isEdit && currentTournament) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentTournament]);

  const onSubmit = async (data: FormValuesProps) => {
    const formData = new FormData();
    formData.append('slug', slug as string);
    formData.append('tournament_slug', paramCase(data.tournament_name));
    formData.append('tournament_name', data.tournament_name);
    formData.append('tournament_description', data.tournament_description);
    formData.append('tournament_short_description', data.tournament_short_description);
    formData.append(
      'tournament_start_date',
      new Date(fDateTime(data.tournament_start_date)).toISOString()
    );
    formData.append(
      'tournament_end_date',
      new Date(fDateTime(data.tournament_end_date)).toISOString()
    );
    formData.append('tournament_logo', data.tournament_logo || '');
    formData.append('game_id', `${data.game_id}`);
    formData.append('tournament_banner', data.tournament_banner || '');
    formData.append('tournament_mode', data.tournament_mode);

    if (isEdit) {
      formData.append('slug', `${currentTournament!.slug}`);
      axiosInstance2
        .post('/update-tournament/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          reset();
          enqueueSnackbar(res.data.success);
          push(PATH_DASHBOARD.event.event_tournaments.list(slug as string));
        })
        .catch((error) => console.error(error));
    } else {
      axiosInstance2
        .post('/create-tournament/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          reset();
          enqueueSnackbar(res.data.success);
          push(PATH_DASHBOARD.event.event_tournaments.list(slug as string));
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('tournament_logo', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = () => {
    setValue('tournament_logo', null);
  };
  const handleDrop1 = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('tournament_banner', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile1 = () => {
    setValue('tournament_banner', null);
  };
  const values = watch();
  const isDateError =
    values.tournament_start_date && values.tournament_end_date
      ? isBefore(new Date(values.tournament_end_date), new Date(values.tournament_start_date))
      : false;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="tournament_name" label="Tournament Name" />
              <RHFTextField
                name="tournament_short_description"
                label="Short Description"
                multiline
                rows={4}
              />

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Tournament Description
                </Typography>

                <RHFEditor simple name="tournament_description" />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Logo Image
                </Typography>

                <RHFUploadAvatar
                  name="tournament_logo"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onDelete={handleRemoveFile}
                />
              </Stack>
              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Banner Image
                </Typography>
                <RHFUpload
                  name="tournament_banner"
                  maxSize={3145728}
                  onDrop={handleDrop1}
                  onDelete={handleRemoveFile1}
                />
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Controller
              name="tournament_start_date"
              control={control}
              render={({ field }) => (
                <MobileDateTimePicker
                  {...field}
                  onChange={(newValue: Date | null) => field.onChange(newValue)}
                  label="Start date"
                  inputFormat="dd/MM/yyyy hh:mm a"
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              )}
            />

            <Controller
              name="tournament_end_date"
              control={control}
              render={({ field }) => (
                <MobileDateTimePicker
                  {...field}
                  onChange={(newValue: Date | null) => field.onChange(newValue)}
                  label="End date"
                  inputFormat="dd/MM/yyyy hh:mm a"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!isDateError}
                      helperText={isDateError && 'End date must be later than start date'}
                    />
                  )}
                />
              )}
            />
            <RHFSelect name="game_id" label="Games">
              <MenuItem value="">None</MenuItem>
              <Divider sx={{ borderStyle: 'dashed' }} />

              {GAME_OPTIONS.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.game_name} ({option.game_type})
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFSelect name="tournament_mode" label="Tournament Mode">
              <MenuItem value="">None</MenuItem>
              <Divider sx={{ borderStyle: 'dashed' }} />

              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="Offline">Offline</MenuItem>
            </RHFSelect>

            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              Save
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
