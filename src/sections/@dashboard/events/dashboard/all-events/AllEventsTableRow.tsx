import { useState } from 'react';
// @mui
import {
  Button,
  //   Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Divider,
  Stack,
  Avatar,
  Typography,
} from '@mui/material';
// @types
// components
import Iconify from '../../../../../components/iconify';
import MenuPopover from '../../../../../components/menu-popover';
import ConfirmDialog from '../../../../../components/confirm-dialog';
import { EventData } from 'src/@types/events';
import { BASE_IMAGE_PATH } from 'src/utils/axios2';
import Label from 'src/components/label/Label';
import { Router, useRouter } from 'next/router';
import { PATH_DASHBOARD, PATH_PAGE } from 'src/routes/paths';

// ----------------------------------------------------------------------

type Props = {
  row: EventData['event'];
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
};

export default function AllEventsTableRow({ row, onDeleteRow, onEditRow }: Props) {
  const {
    slug,
    event_name,
    is_verified,
    organizer: {
      organizer_name,
      user: { avatar },
    },
  } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };
  const { push } = useRouter();

  return (
    <>
      <TableRow hover>
        <TableCell align="left">{event_name}</TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={organizer_name} src={BASE_IMAGE_PATH + avatar} />

            <Typography variant="subtitle2" noWrap>
              {organizer_name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Label
            variant="soft"
            color={!is_verified ? 'warning' : 'success'}
            sx={{ textTransform: 'capitalize' }}
          >
            {is_verified ? 'Verified' : 'Not Verified'}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={() => push(PATH_DASHBOARD.event.all_events.preview(slug))}>
            <Iconify icon="ion:open-outline" />
          </IconButton>
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Verify Event
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
