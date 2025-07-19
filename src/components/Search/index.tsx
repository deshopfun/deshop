import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const Search = () => {
  const [search, setSearch] = useState<string>('');

  return (
    <Box display={'flex'} justifyContent={'center'} gap={1}>
      <TextField
        hiddenLabel
        size="small"
        style={{ width: 400 }}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="search for product"
      />
      <Button onClick={() => {}} variant="contained">
        Search
      </Button>
    </Box>
  );
};

export default Search;
