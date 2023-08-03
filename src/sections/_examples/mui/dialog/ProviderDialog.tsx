import { useState } from 'react';
// @mui
import {
  Button,
  Dialog,
  TextField,
  DialogContent,
  DialogActions,
  Box,
} from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
// ----------------------------------------------------------------------

export default function ProviderDialog() {
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
        Add Provider
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ pt: 3 }}>
          <DialogContent>
            <TextField 
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Provider Name"
            />{' '}
            <TextField 
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Address"
            />{' '}
            <TextField
              fullWidth
              type="tel"
              margin="dense"
              variant="outlined"
              label="Contact Details"
            />{' '}
            <TextField
              fullWidth
              type="email"
              margin="dense"
              variant="outlined"
              label="Email Address"
            />
         
            <TextField
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Webstie Url"
            />
            
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
