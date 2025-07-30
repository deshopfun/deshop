import { Collections } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  ImageList,
  ImageListItem,
  Radio,
  RadioGroup,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackPresistStore } from 'lib';
import { useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

const ProductVariant = () => {
  return (
    <Box>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="h6">Update product variant</Typography>
        <Button variant={'contained'} color={'success'}>
          Add Product Variant
        </Button>
      </Stack>
      <Box mt={2}></Box>
    </Box>
  );
};

export default ProductVariant;
