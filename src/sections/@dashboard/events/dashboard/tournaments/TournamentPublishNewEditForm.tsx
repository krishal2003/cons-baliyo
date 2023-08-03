import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, Typography, MenuItem, TextField } from '@mui/material';
import axiosInstance2 from 'src/utils/axios2';
import { useSnackbar } from '../../../../../components/snackbar';
import FormProvider, {
  RHFEditor,
  RHFTextField,
  RHFSelect,
  RHFSwitch,
} from '../../../../../components/hook-form';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { Tournament } from 'src/@types/tournaments';
import { addDays } from 'date-fns';
import { fDateTime } from 'src/utils/formatTime';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { re } from './TournamentSponsorNewEditForm';

type FormValuesProps = {
  registration_opening_date: Date | string;
  registration_closing_date: Date | string;
  is_free: boolean;
  tournament_prize_pool: string;
  contact_email: string;
  discord_link: string;
  location: string;
  tournament_rules: string;
  maximum_no_of_participants: number;
  tournament_fee: number;
  tournament_participants: 'Player' | 'Team';
};

type Props = {
  isEdit?: boolean;
  currentTournament?: Tournament;
};

export default function TournamentPublishNewEditForm({ isEdit, currentTournament }: Props) {
  const {
    push,
    query: { tournamentSlug, slug },
  } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const TournamentSchema = Yup.object().shape({
    registration_opening_date: Yup.date().required('Registration opening date is required'),
    registration_closing_date: Yup.date()
      .required('Registration closing date is required')
      .min(Yup.ref('registration_opening_date'), 'Closing date must be later than opening date'),
    is_free: Yup.boolean().required('Please specify if the tournament is free or not'),
    tournament_prize_pool: Yup.string().required('Prize pool is required'),
    contact_email: Yup.string().email('Invalid email').required('Contact email is required'),
    discord_link: Yup.string().matches(re, 'URL is not valid'),
    location: Yup.string(),
    tournament_rules: Yup.string().required('Tournament rules are required'),
    maximum_no_of_participants: Yup.number()
      .required('Maximum number of participants is required')
      .min(2, 'Participants must be greater than 2'),
    tournament_fee: Yup.number().required('Tournament fee is required'),
    tournament_participants: Yup.string().required('Please specify the tournament participants'),
  });

  const defaultValues = useMemo(
    () => ({
      registration_opening_date:
        currentTournament?.registration_opening_date || addDays(new Date(), 1),
      registration_closing_date:
        currentTournament?.registration_closing_date || addDays(new Date(), 3),
      is_free: currentTournament?.is_free || false,
      tournament_prize_pool: currentTournament?.tournament_prize_pool || '',
      contact_email: currentTournament?.contact_email || '',
      discord_link: currentTournament?.discord_link || '',
      location: currentTournament?.location || '',
      tournament_rules: currentTournament?.tournament_rules || '',
      maximum_no_of_participants: currentTournament?.maximum_no_of_participants || 0,
      tournament_fee: currentTournament?.tournament_fee || 0,
      tournament_participants: currentTournament?.tournament_participants || 'Player',
    }),
    [currentTournament]
  );

  useEffect(() => {
    if (isEdit && currentTournament) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentTournament]);

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(TournamentSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const formData = new FormData();
    formData.append('slug', tournamentSlug as string);
    formData.append(
      'registration_opening_date',
      new Date(fDateTime(data.registration_opening_date)).toISOString()
    );
    formData.append(
      'registration_closing_date',
      new Date(fDateTime(data.registration_closing_date)).toISOString()
    );
    formData.append('is_free', data.is_free === true ? 'True' : 'False');
    formData.append('tournament_prize_pool', data.tournament_prize_pool);
    formData.append('contact_email', data.contact_email);
    formData.append('location', data.location);
    formData.append('discord_link', data.discord_link);
    formData.append('tournament_rules', data.tournament_rules);
    formData.append('maximum_no_of_participants', data.maximum_no_of_participants.toString());
    formData.append('tournament_fee', data.tournament_fee.toString());
    formData.append('tournament_participants', data.tournament_participants);

    axiosInstance2
      .post('/publish-tournament/', formData, {
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
  };

  const onSave = async (data: FormValuesProps) => {
    const formData = new FormData();
    formData.append('slug', tournamentSlug as string);
    formData.append(
      'registration_opening_date',
      new Date(fDateTime(data.registration_opening_date)).toISOString()
    );
    formData.append(
      'registration_closing_date',
      new Date(fDateTime(data.registration_closing_date)).toISOString()
    );
    formData.append('is_free', data.is_free === true ? 'True' : 'False');
    formData.append('tournament_prize_pool', data.tournament_prize_pool);
    formData.append('contact_email', data.contact_email);
    formData.append('discord_link', data.discord_link);
    formData.append('location', data.location);
    formData.append('tournament_rules', data.tournament_rules);
    formData.append('maximum_no_of_participants', data.maximum_no_of_participants.toString());
    formData.append('tournament_fee', data.tournament_fee.toString());
    formData.append('tournament_participants', data.tournament_participants);

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
      .catch((error) => {
        enqueueSnackbar(error.error);
        console.error(error);
      });
  };

  const values = watch();

  return (
    <FormProvider methods={methods}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Tournament Rules
                </Typography>

                <RHFEditor simple name="tournament_rules" />
              </Stack>
              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Prize Pool
                </Typography>

                <RHFEditor simple name="tournament_prize_pool" />
              </Stack>

              <RHFTextField
                name="maximum_no_of_participants"
                label="Maximum Number of Participants"
                type="number"
              />
              <RHFTextField name="location" label="Location" />
              <RHFSelect name="tournament_participants" label="Tournament Participants">
                <MenuItem value="Player">Player</MenuItem>
                <MenuItem value="Team">Team</MenuItem>
              </RHFSelect>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={1.5} sx={{ mt: 3 }}>
            <RHFSwitch
              name="is_free"
              label="Is Free"
              labelPlacement="start"
              sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
            />
            {!values.is_free && (
              <RHFTextField name="tournament_fee" label="Tournament Fee" type="number" />
            )}

            <RHFTextField name="contact_email" label="Contact Email" />
            <RHFTextField name="discord_link" label="Discord Link" />
            <Controller
              name="registration_opening_date"
              control={control}
              render={({ field }) => (
                <MobileDateTimePicker
                  {...field}
                  onChange={(newValue: Date | null) => field.onChange(newValue)}
                  label="Registration Opening Date"
                  inputFormat="dd/MM/yyyy hh:mm a"
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              )}
            />

            <Controller
              name="registration_closing_date"
              control={control}
              render={({ field }) => (
                <MobileDateTimePicker
                  {...field}
                  onChange={(newValue: Date | null) => field.onChange(newValue)}
                  label="Registration Closing Date"
                  inputFormat="dd/MM/yyyy hh:mm a"
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              )}
            />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <LoadingButton
              onClick={handleSubmit(onSave)}
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              Save
            </LoadingButton>
            <LoadingButton
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              size="large"
              loading={isSubmitting}
            >
              Publish
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
