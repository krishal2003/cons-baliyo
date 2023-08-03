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
  Link,
} from '@mui/material';
// @types
// components
import Iconify from '../../../../../../components/iconify';
import MenuPopover from '../../../../../../components/menu-popover';
import ConfirmDialog from '../../../../../../components/confirm-dialog';
import { ITournamentStreams } from 'src/@types/tournaments';

// ----------------------------------------------------------------------

type Props = {
  row: ITournamentStreams;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
};

export default function TournamentStreamsTableRow({ row, onDeleteRow, onEditRow }: Props) {
  const { stream_title, url } = row;

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
      <TableRow hover>
        <TableCell align="left">{stream_title}</TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          <Link href={url}>{url}</Link>
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
