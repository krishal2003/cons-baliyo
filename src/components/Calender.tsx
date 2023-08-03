import { useState } from 'react';
// @mui
import { Button, Dialog, DialogActions, Box } from '@mui/material';
import { Icon } from '@iconify/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IconButtonAnimate } from './animate';

// ----------------------------------------------------------------------

export default function CalenderDialog() {
  const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButtonAnimate
        color={openPopover ? 'primary' : 'default'}
        onClick={handleClickOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Icon icon="uis:calender" />
      </IconButtonAnimate>
      <Dialog open={open} onClose={handleClose}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar />
        </LocalizationProvider>

        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleClose} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
