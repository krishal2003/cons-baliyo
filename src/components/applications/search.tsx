import { Icon } from '@iconify/react';
import { Container, InputAdornment, TextField } from '@mui/material';
import { SetStateAction, useState } from 'react';
import Iconify from '../iconify/Iconify';


export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container sx={{ mt: 1, ml: -3 }}>
      <TextField
        id="search"
        type="search"
        label="Search"
        value={searchTerm}
        sx={{ width: 330}}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Iconify icon="material-symbols:search" />
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
}
