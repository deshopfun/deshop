import { Collections } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  ImageList,
  ImageListItem,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  styled,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackPresistStore } from 'lib';
import { FILE_TYPE, WEIGHT_UNIT_TYPE } from 'packages/constants';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

type Props = {
  product_id: number;
  options?: ProductOption[];
};

type ProductOption = {
  name: string;
  value: string;
};

const ProductVariant = (props: Props) => {
  const [title, setTitle] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [barcode, setBarcode] = useState<string>('');
  const [compareAtPrice, setCompareAtPrice] = useState<number>(0);
  const [inventoryPolicy, setInventoryPolicy] = useState<boolean>(false);
  const [inventoryQuantity, setInventoryQuantity] = useState<number>(0);
  const [price, setPrice] = useState<string>('');
  const [position, setPosition] = useState<number>(0);
  const [sku, setSku] = useState<string>('');
  const [taxable, setTaxable] = useState<boolean>(false);
  const [weight, setWeight] = useState<number>(0);
  const [weightUnit, setWeightUnit] = useState<string>('');
  const [requiresShipping, setRequiresShipping] = useState<boolean>(false);
  const [options, setOptions] = useState<ProductOption[]>([]);
  const [option, setOption] = useState<string>('');
  const [optionOneValue, setOptionOneValue] = useState<string>('');
  const [optionTwoValue, setOptionTwoValue] = useState<string>('');
  const [optionThreeValue, setOptionThreeValue] = useState<string>('');

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

  useEffect(() => {
    if (props.options) {
      setOptions(props.options || []);
      props.options[0] && setOptionOneValue(props.options[0].value.split(',')[0] || '');
      props.options[1] && setOptionTwoValue(props.options[1].value.split(',')[0] || '');
      props.options[2] && setOptionThreeValue(props.options[2].value.split(',')[0] || '');
    }
  }, [props]);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const uploadFile = async (files: FileList) => {
    try {
      if (!files.length || files.length === 0) {
        setSnackSeverity('error');
        setSnackMessage('Not found the file');
        setSnackOpen(true);
        return;
      }

      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });

      const response: any = await axios.post(Http.upload_file, formData, {
        params: {
          file_type: FILE_TYPE.Image,
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.result && response.data.urls.length > 0) {
        setImage(response.data.urls[0]);
      } else {
        setSnackSeverity('error');
        setSnackMessage('Upload Failed');
        setSnackOpen(true);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later.');
      setSnackOpen(true);
      console.error(e);
    }
  };

  const onClickCreateProductVariant = async () => {
    try {
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later.');
      setSnackOpen(true);
      console.error(e);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Update product variant</Typography>
      <Box mt={2}>
        <Card>
          <CardContent>
            {options &&
              options.length > 0 &&
              options.map((item, index) => (
                <Box key={index} mb={4}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Grid container spacing={10} py={1}>
                    {item.value &&
                      item.value.split(',').length > 0 &&
                      item.value.split(',').map((innerItem, innerIndex) => (
                        <Grid size={{ xs: 2, md: 2 }} key={innerIndex}>
                          <Button
                            variant={'contained'}
                            color={
                              index === 0 && innerItem === optionOneValue
                                ? 'success'
                                : index === 1 && innerItem === optionTwoValue
                                ? 'success'
                                : index === 2 && innerItem === optionThreeValue
                                ? 'success'
                                : 'primary'
                            }
                            onClick={() => {
                              if (index === 0) {
                                setOptionOneValue(innerItem);
                              } else if (index === 1) {
                                setOptionTwoValue(innerItem);
                              } else if (index === 2) {
                                setOptionThreeValue(innerItem);
                              }
                            }}
                          >
                            {innerItem}
                          </Button>
                        </Grid>
                      ))}
                  </Grid>
                </Box>
              ))}
          </CardContent>
        </Card>
      </Box>
      <Box mt={2}>
        <Card>
          <CardContent>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Typography mb={1} variant="h6">
                Product Variant
              </Typography>
              <Button
                variant={'contained'}
                color={'success'}
                onClick={() => {
                  onClickCreateProductVariant();
                }}
              >
                Add Product Variant
              </Button>
            </Stack>
            <Box mt={2}>
              <Typography mb={1}>Image</Typography>
              <Box style={{ border: '1px dashed #000' }}>
                {image && image != '' ? (
                  <img srcSet={image} src={image} alt={'image'} loading="lazy" />
                ) : (
                  <Button component="label" role={undefined} tabIndex={-1} fullWidth>
                    <Box py={12} textAlign={'center'}>
                      <VisuallyHiddenInput
                        type="file"
                        onChange={async (event: any) => {
                          await uploadFile(event.target.files);
                        }}
                      />
                      <Collections fontSize={'large'} />
                      <Typography mt={1}>Select video or image to upload</Typography>
                      <Typography>or drag or drop it here</Typography>
                    </Box>
                  </Button>
                )}
              </Box>
            </Box>
            <Box mt={2}>
              <Typography mb={1}>Position</Typography>
              <TextField
                hiddenLabel
                size="small"
                fullWidth
                type="number"
                value={position}
                onChange={(e: any) => {
                  setPosition(e.target.value);
                }}
              />
            </Box>
            <Box mt={2}>
              <Typography mb={1}>Title</Typography>
              <TextField
                hiddenLabel
                size="small"
                fullWidth
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="title your variant"
              />
            </Box>
            <Box mt={2}>
              <Typography mb={1}>Price</Typography>
              <TextField
                hiddenLabel
                size="small"
                fullWidth
                type="number"
                value={price}
                onChange={(e: any) => {
                  setPrice(e.target.value);
                }}
                placeholder="price your variant"
              />
            </Box>
            <Box mt={2}>
              <Typography mb={1}>Compare at price</Typography>
              <TextField
                hiddenLabel
                size="small"
                fullWidth
                type="number"
                value={compareAtPrice}
                onChange={(e: any) => {
                  setCompareAtPrice(e.target.value);
                }}
              />
            </Box>
            <Box mt={2}>
              <Typography mb={1}>Barcode</Typography>
              <TextField
                hiddenLabel
                size="small"
                fullWidth
                value={barcode}
                onChange={(e) => {
                  setBarcode(e.target.value);
                }}
                placeholder="barcode your variant"
              />
            </Box>
            <Box mt={2}>
              <Typography mb={1}>Inventory quantity</Typography>
              <TextField
                hiddenLabel
                size="small"
                fullWidth
                type="number"
                value={inventoryQuantity}
                onChange={(e: any) => {
                  setInventoryQuantity(e.target.value);
                }}
              />
            </Box>
            <Box mt={2}>
              <Typography mb={1}>Sku</Typography>
              <TextField
                hiddenLabel
                size="small"
                fullWidth
                value={sku}
                onChange={(e: any) => {
                  setSku(e.target.value);
                }}
                placeholder="sku your variant"
              />
            </Box>
            <Box mt={2}>
              <Typography mb={1}>Weight</Typography>
              <TextField
                hiddenLabel
                size="small"
                fullWidth
                type="number"
                value={weight}
                onChange={(e: any) => {
                  setWeight(e.target.value);
                }}
              />
            </Box>
            <Box mt={2}>
              <Typography mb={1}>Weight unit</Typography>
              <FormControl hiddenLabel fullWidth>
                <Select
                  displayEmpty
                  value={weightUnit}
                  onChange={(e: any) => {
                    setWeightUnit(e.target.value);
                  }}
                  size={'small'}
                  inputProps={{ 'aria-label': 'Without label' }}
                  renderValue={(selected: any) => {
                    if (selected.length === 0) {
                      return <em>Choose weight</em>;
                    }

                    return selected;
                  }}
                >
                  {WEIGHT_UNIT_TYPE &&
                    Object.entries(WEIGHT_UNIT_TYPE).map((item, index) => (
                      <MenuItem value={item[1]} key={index}>
                        {item[1]}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <Stack mt={2} direction={'row'} alignItems={'center'}>
              <Switch
                checked={inventoryPolicy}
                onChange={() => {
                  setInventoryPolicy(!inventoryPolicy);
                }}
              />
              <Typography>Inventory policy</Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'}>
              <Switch
                checked={taxable}
                onChange={() => {
                  setTaxable(!taxable);
                }}
              />
              <Typography>Taxable</Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'}>
              <Switch
                checked={requiresShipping}
                onChange={() => {
                  setRequiresShipping(!requiresShipping);
                }}
              />
              <Typography>Requires shipping</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ProductVariant;
