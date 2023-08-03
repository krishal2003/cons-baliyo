import { useState } from 'react';
// @mui
import {
  Button,
  Dialog,
  TextField,
  DialogContent,
  DialogActions,
  Box,
  Typography,
} from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// ----------------------------------------------------------------------

export default function ApplicationDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        startIcon={<Iconify icon="eva:plus-fill" />}
        variant="contained"
        onClick={handleClickOpen}
      >
        Add Application
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ pt: 3 }}>
          <DialogContent>
            <TextField
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Course Name"
            />{' '}
            <TextField fullWidth type="text" margin="dense" variant="outlined" label="Provider" />{' '}
           
            <TextField
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="College Location"
            />{' '}
            <Box sx={{ pt: 1 }}>
              <Typography variant="h6" color="text.disabled">
                Course Start Date:
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
            </Box>
          </DialogContent>
        </Box>

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
