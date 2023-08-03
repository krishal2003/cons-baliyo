import { useState } from 'react';
// @mui
import {
  Button,
  //   Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Avatar,
  Stack,
} from '@mui/material';
// @types
// components
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import ConfirmDialog from '../../../components/confirm-dialog';
import { ITeam } from 'src/@types/team';
import { SocialsDisplay } from 'src/sections/about/AboutTeam';
import { BASE_IMAGE_PATH } from 'src/utils/axios2';

// ----------------------------------------------------------------------

type Props = {
  row: ITeam;
  selected: boolean;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
};

export default function TeamTableRow({ row, selected, onDeleteRow, onEditRow }: Props) {
  const {
    name,
    post,
    image,
    discord_link,
    facebook_link,
    instagram_link,
    linkedin_link,
    twitch_link,
    twitter_link,
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

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell align="left">
          <Stack direction="row" alignItems="center">
            <Avatar alt={name} src={BASE_IMAGE_PATH + image} />

            <TableCell align="left">{name}</TableCell>
          </Stack>
        </TableCell>

        <TableCell align="left">{post}</TableCell>
        <TableCell align="center">
          {SocialsDisplay(
            facebook_link,
            instagram_link,
            twitter_link,
            discord_link,
            twitch_link,
            linkedin_link
          )}
        </TableCell>

        <TableCell align="right">
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
          Edit
        </MenuItem>
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
