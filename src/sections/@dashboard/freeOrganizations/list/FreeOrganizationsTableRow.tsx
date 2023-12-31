import { useState } from 'react';
// @mui
import { Stack, Avatar, Button, TableRow, TableCell, Typography } from '@mui/material';
// @types
import { IFreePlayer } from 'src/@types/user';
// components
import ConfirmDialog from '../../../../components/confirm-dialog';
import { BASE_IMAGE_PATH } from 'src/utils/axios2';
import { Organization } from 'src/@types/freePlayer';

// ----------------------------------------------------------------------

type Props = {
  row: Organization;
  onRequest?: VoidFunction;
};

export default function FreeOrganizationsTableRow({ row, onRequest }: Props) {
  const {
    organization_name,
    user: { avatar, email },
  } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <TableRow hover>
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={`${organization_name}`} src={BASE_IMAGE_PATH + avatar} />

            <Typography variant="subtitle2" noWrap>
              {`${organization_name}`}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">{email || 'No Email'}</TableCell>

        {onRequest && (
          <TableCell align="right">
            <Button variant="contained" onClick={handleOpenConfirm}>
              Request to Join
            </Button>
          </TableCell>
        )}
      </TableRow>

      {onRequest && (
        <ConfirmDialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          title="Request to your Organization"
          content="Are you sure want to request this Player?"
          action={
            <Button
              variant="contained"
              color="info"
              onClick={() => {
                onRequest();
                handleCloseConfirm();
              }}
            >
              Yes
            </Button>
          }
        />
      )}
    </>
  );
}
