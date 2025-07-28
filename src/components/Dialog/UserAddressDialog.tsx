import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackPresistStore } from 'lib';
import { COUNTRYPROVINCES } from 'packages/constants/countryState';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { IsValidEmail } from 'utils/verify';

type DialogType = {
  openDialog: boolean;
  handleCloseDialog: () => Promise<void>;
  handle: number;
  addressId?: number;
  firstName?: string;
  lastName?: string;
  company?: string;
  addressOne?: string;
  addressTwo?: string;
  email?: string;
  phone?: string;
  country?: string;
  city?: string;
  province?: string;
  zip?: string;
};

export default function UserAddressDialog(props: DialogType) {
  const [handle, setHandle] = useState<number>(0);
  const [addressId, setAddressId] = useState<number>();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [addressOne, setAddressOne] = useState<string>('');
  const [addressTwo, setAddressTwo] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [province, setProvince] = useState<string>('');
  const [zip, setZip] = useState<string>('');

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

  useEffect(() => {
    setHandle(props.handle);
    setAddressId(props.addressId);
    props.firstName && setFirstName(props.firstName);
    props.lastName && setLastName(props.lastName);
    props.company && setCompany(props.company);
    props.addressOne && setAddressOne(props.addressOne);
    props.addressTwo && setAddressTwo(props.addressTwo);
    props.email && setEmail(props.email);
    props.phone && setPhone(props.phone);
    props.country && setCountry(props.country);
    props.city && setCity(props.city);
    props.province && setProvince(props.province);
    props.zip && setZip(props.zip);
  }, [
    props.handle,
    props.addressId,
    props.firstName,
    props.lastName,
    props.company,
    props.addressOne,
    props.addressTwo,
    props.email,
    props.phone,
    props.country,
    props.city,
    props.province,
    props.zip,
  ]);

  const onClickSaveAddress = async () => {
    try {
      if (!firstName || firstName === '') {
        setSnackSeverity('error');
        setSnackMessage('Incorrect first name input');
        setSnackOpen(true);
        return;
      }

      if (!lastName || lastName === '') {
        setSnackSeverity('error');
        setSnackMessage('Incorrect last name input');
        setSnackOpen(true);
        return;
      }

      if (!email || email === '' || !IsValidEmail(email)) {
        setSnackSeverity('error');
        setSnackMessage('Incorrect email input');
        setSnackOpen(true);
        return;
      }

      if (!phone || phone === '') {
        setSnackSeverity('error');
        setSnackMessage('Incorrect phone input');
        setSnackOpen(true);
        return;
      }

      if (!addressOne || addressOne === '') {
        setSnackSeverity('error');
        setSnackMessage('Incorrect address one input');
        setSnackOpen(true);
        return;
      }

      if (!country || country === '') {
        setSnackSeverity('error');
        setSnackMessage('Incorrect country select');
        setSnackOpen(true);
        return;
      }

      if (!city || city === '') {
        setSnackSeverity('error');
        setSnackMessage('Incorrect city input');
        setSnackOpen(true);
        return;
      }

      if (!province || province === '') {
        setSnackSeverity('error');
        setSnackMessage('Incorrect province select');
        setSnackOpen(true);
        return;
      }

      if (!zip || zip === '') {
        setSnackSeverity('error');
        setSnackMessage('Incorrect zip input');
        setSnackOpen(true);
        return;
      }

      if (handle === 1) {
        const response: any = await axios.post(Http.address, {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          country: country,
          city: city,
          province: province,
          zip: zip,
        });

        if (response.result) {
          await props.handleCloseDialog();

          setSnackSeverity('success');
          setSnackMessage('Save successfully');
          setSnackOpen(true);
        } else {
          setSnackSeverity('error');
          setSnackMessage('Save Failed');
          setSnackOpen(true);
        }
      } else if (handle === 2) {
        const response: any = await axios.put(Http.address, {
          address_id: addressId,
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          country: country,
          city: city,
          province: province,
          zip: zip,
        });

        if (response.result) {
          await props.handleCloseDialog();

          setSnackSeverity('success');
          setSnackMessage('Save successfully');
          setSnackOpen(true);
        } else {
          setSnackSeverity('error');
          setSnackMessage('Save Failed');
          setSnackOpen(true);
        }
      } else {
        setSnackSeverity('error');
        setSnackMessage('not support');
        setSnackOpen(true);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later.');
      setSnackOpen(true);
      console.error(e);
    }
  };

  return (
    <Dialog
      open={props.openDialog}
      onClose={() => {
        props.handleCloseDialog();
      }}
      fullWidth
    >
      <DialogTitle>Add new shipping address</DialogTitle>
      <DialogContent>
        <Stack direction={'row'} alignItems={'center'} gap={2}>
          <Box width={'100%'}>
            <Typography mb={1}>First name</Typography>
            <TextField
              hiddenLabel
              size="small"
              fullWidth
              value={firstName}
              onChange={(e: any) => {
                setFirstName(e.target.value);
              }}
              placeholder="Enter first name"
            />
          </Box>
          <Box width={'100%'}>
            <Typography mb={1}>Last name</Typography>
            <TextField
              hiddenLabel
              size="small"
              fullWidth
              value={lastName}
              onChange={(e: any) => {
                setLastName(e.target.value);
              }}
              placeholder="Enter last name"
            />
          </Box>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} gap={2} mt={3}>
          <Box width={'100%'}>
            <Typography mb={1}>Email address</Typography>
            <TextField
              hiddenLabel
              size="small"
              fullWidth
              value={email}
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter email address"
            />
          </Box>
          <Box width={'100%'}>
            <Typography mb={1}>Company</Typography>
            <TextField
              hiddenLabel
              size="small"
              fullWidth
              value={company}
              onChange={(e: any) => {
                setCompany(e.target.value);
              }}
              placeholder="Enter company"
            />
          </Box>
        </Stack>

        <Box mt={3}>
          <Typography mb={1}>Phone number</Typography>
          <TextField
            hiddenLabel
            size="small"
            fullWidth
            value={phone}
            onChange={(e: any) => {
              setPhone(e.target.value);
            }}
            placeholder="Enter phone number"
          />
        </Box>
        <Box mt={3}>
          <Typography mb={1}>Address line 1</Typography>
          <TextField
            hiddenLabel
            size="small"
            fullWidth
            value={addressOne}
            onChange={(e: any) => {
              setAddressOne(e.target.value);
            }}
            placeholder="Enter address"
          />
        </Box>
        <Box mt={3}>
          <Typography mb={1}>Address line 2</Typography>
          <TextField
            hiddenLabel
            size="small"
            fullWidth
            value={addressTwo}
            onChange={(e: any) => {
              setAddressTwo(e.target.value);
            }}
            placeholder="Enter address"
          />
        </Box>
        <Box mt={3}>
          <Typography mb={1}>Country/Region</Typography>
          <FormControl hiddenLabel fullWidth>
            <Select
              displayEmpty
              value={country}
              onChange={(e: any) => {
                setProvince('');
                setCountry(e.target.value);
              }}
              size={'small'}
              inputProps={{ 'aria-label': 'Without label' }}
              renderValue={(selected: any) => {
                if (selected.length === 0) {
                  return <em>Choose country</em>;
                }

                return selected;
              }}
            >
              {COUNTRYPROVINCES &&
                COUNTRYPROVINCES.map((item, index) => (
                  <MenuItem value={item.name} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
        <Stack mt={3} direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2}>
          <Box>
            <Typography mb={1}>City</Typography>
            <TextField
              hiddenLabel
              size="small"
              fullWidth
              value={city}
              onChange={(e: any) => {
                setCity(e.target.value);
              }}
              placeholder="Enter city"
            />
          </Box>
          <Box>
            <Typography mb={1}>State/Province</Typography>
            <FormControl hiddenLabel fullWidth>
              <Select
                displayEmpty
                value={province}
                onChange={(e: any) => {
                  setProvince(e.target.value);
                }}
                size={'small'}
                inputProps={{ 'aria-label': 'Without label' }}
                renderValue={(selected: any) => {
                  if (selected.length === 0) {
                    return <em>Choose state</em>;
                  }

                  return selected;
                }}
              >
                {country &&
                  COUNTRYPROVINCES &&
                  COUNTRYPROVINCES.find((item) => item.name === country)?.provinces.map((item, index) => (
                    <MenuItem value={item.name} key={index}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Typography mb={1}>ZIP/Postal code</Typography>
            <TextField
              hiddenLabel
              size="small"
              fullWidth
              value={zip}
              onChange={(e: any) => {
                setZip(e.target.value);
              }}
              placeholder="Enter ZIP"
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant={'contained'}
          onClick={() => {
            props.handleCloseDialog();
          }}
        >
          Close
        </Button>
        <Button color="success" variant={'contained'} onClick={onClickSaveAddress}>
          {props.handle === 1 ? 'Save' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
