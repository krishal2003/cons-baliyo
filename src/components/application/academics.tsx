import React from 'react';
import { Link, Card, CardHeader, Stack, Typography } from '@mui/material';
import { IApplicationAcademics } from 'src/@types/application';

type Props = {
  academics: IApplicationAcademics;
};

function Academics({ academics }: Props) {
  const { see_gpa, twelve_gpa, eleven_gpa, english_score, english_test } = academics;
  return (
    <Card>
      <CardHeader title="Academic" />
      <Stack>
        {academics.map(() => (
          <>
            <Typography>SEE GPA:</Typography>
            <Typography>{see_gpa}</Typography>
            <Typography>11 GPA:</Typography>
            <Typography>{eleven_gpa}</Typography>
            <Typography>12 GPA:</Typography>
            <Typography>{twelve_gpa}</Typography>
            <Typography>Enlgish Proficiency Score:</Typography>
            <Typography>
              {english_score} ({english_test}){' '}
            </Typography>
          </>
        ))}
      </Stack>
    </Card>
  );
}

export default Academics;
