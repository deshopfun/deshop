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
  const [compareAtPrice, setCompareAtPrice] = useState<string>('');
  const [inventoryPolicy, setInventoryPolicy] = useState<boolean>(false);
  const [inventoryQuantity, setInventoryQuantity] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [sku, setSku] = useState<string>('');
  const [tax, setTax] = useState<string>('');
  const [taxable, setTaxable] = useState<boolean>(false);
  const [discounts, setDiscounts] = useState<string>('');
  const [tipReceived, setTipReceived] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [weightUnit, setWeightUnit] = useState<string>('');
  const [requiresShipping, setRequiresShipping] = useState<boolean>(false);
  const [options, setOptions] = useState<ProductOption[]>([]);
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

  const init = async (oneValue: string, twoValue: string, threeValue: string) => {
    try {
      let option = '';
      switch (options.length) {
        case 3:
          if (!oneValue || !twoValue || !threeValue) return;
          option = `${oneValue},${twoValue},${threeValue}`;
          break;
        case 2:
          if (!oneValue || !twoValue) return;
          option = `${oneValue},${twoValue}`;
          break;
        case 1:
          if (!oneValue) return;
          option = `${oneValue}`;
          break;
        default:
          return;
      }

      const response: any = await axios.get(Http.product_variant_by_option, {
        params: {
          product_id: props.product_id,
          option: option,
        },
      });

      if (response.result) {
        setTitle(response.data.title);
        setImage(response.data.image);
        setBarcode(response.data.barcode);
        setCompareAtPrice(response.data.compare_at_price);
        setInventoryPolicy(response.data.inventory_policy === 1 ? true : false);
        setInventoryQuantity(response.data.inventory_quantity);
        setPrice(response.data.price);
        setPosition(response.data.position);
        setSku(response.data.sku);
        setTax(response.data.tax);
        setTaxable(response.data.taxable === 1 ? true : false);
        setDiscounts(response.data.discounts);
        setTipReceived(response.data.tip_received);
        setWeight(response.data.weight);
        setWeightUnit(response.data.weight_unit);
        setRequiresShipping(response.data.requires_shipping === 1 ? true : false);
      } else {
        setTitle('');
        setImage('');
        setBarcode('');
        setCompareAtPrice('');
        setInventoryPolicy(false);
        setInventoryQuantity('');
        setPrice('');
        setPosition('');
        setSku('');
        setTax('');
        setTaxable(false);
        setDiscounts('');
        setTipReceived('');
        setWeight('');
        setWeightUnit('');
        setRequiresShipping(false);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later.');
      setSnackOpen(true);
      console.error(e);
    }
  };

  useEffect(() => {
    init(optionOneValue, optionTwoValue, optionThreeValue);
  }, [optionOneValue, optionTwoValue, optionThreeValue]);

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

  const onClickUpdateProductVariant = async () => {
    try {
      if (!image || image === '') {
        setSnackSeverity('error');
        setSnackMessage('Incorrect image upload');
        setSnackOpen(true);
        return;
      }

      if (!position || parseInt(position) <= 0) {
        setSnackSeverity('error');
        setSnackMessage('Incorrect position input');
        setSnackOpen(true);
        return;
      }

      if (!title || title === '') {
        setSnackSeverity('error');
        setSnackMessage('Incorrect title input');
        setSnackOpen(true);
        return;
      }

      if (!price || parseFloat(price) <= 0) {
        setSnackSeverity('error');
        setSnackMessage('Incorrect price input');
        setSnackOpen(true);
        return;
      }

      if (compareAtPrice && parseFloat(compareAtPrice) <= 0) {
        setSnackSeverity('error');
        setSnackMessage('Incorrect compare at price input');
        setSnackOpen(true);
        return;
      }

      if (parseFloat(price) < parseFloat(compareAtPrice)) {
        setSnackSeverity('error');
        setSnackMessage('Incorrect price and compare at price input');
        setSnackOpen(true);
        return;
      }

      if (tipReceived && parseFloat(tipReceived) <= 0) {
        setSnackSeverity('error');
        setSnackMessage('Incorrect tip input');
        setSnackOpen(true);
        return;
      }

      if (discounts && parseFloat(discounts) <= 0) {
        setSnackSeverity('error');
        setSnackMessage('Incorrect discounts input');
        setSnackOpen(true);
        return;
      }

      if (!inventoryQuantity || parseInt(inventoryQuantity) <= 0) {
        setSnackSeverity('error');
        setSnackMessage('Incorrect inventory quantity input');
        setSnackOpen(true);
        return;
      }

      if (weight && (parseFloat(weight) <= 0 || weightUnit === '')) {
        setSnackSeverity('error');
        setSnackMessage('Incorrect weight and unit of weight input');
        setSnackOpen(true);
        return;
      }

      if (taxable) {
        if (!tax || parseFloat(tax) <= 0) {
          setSnackSeverity('error');
          setSnackMessage('Incorrect tax input');
          setSnackOpen(true);
          return;
        }
      }

      let option = '';
      switch (options.length) {
        case 3:
          option = `${optionOneValue},${optionTwoValue},${optionThreeValue}`;
          break;
        case 2:
          option = `${optionOneValue},${optionTwoValue}`;
          break;
        case 1:
          option = `${optionOneValue}`;
          break;
        default:
          return;
      }

      if (!option || option === '') {
        setSnackSeverity('error');
        setSnackMessage('Incorrect option parameter');
        setSnackOpen(true);
        return;
      }

      const response: any = await axios.post(Http.product_variant, {
        product_id: props.product_id,
        image: image,
        position: parseInt(position),
        title: title,
        price: price,
        compare_at_price: compareAtPrice,
        tip_received: tipReceived,
        discounts: discounts,
        barcode: barcode,
        inventory_quantity: parseInt(inventoryQuantity),
        sku: sku,
        weight: weight,
        weight_unit: weightUnit,
        inventory_policy: inventoryPolicy ? 1 : 2,
        taxable: taxable ? 1 : 2,
        tax: taxable ? tax : undefined,
        requires_shipping: requiresShipping ? 1 : 2,
        option: option,
      });

      if (response.result) {
        window.location.reload();
        setSnackSeverity('success');
        setSnackMessage('Update successfully');
        setSnackOpen(true);
      } else {
        setSnackSeverity('error');
        setSnackMessage(response.message);
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
                  onClickUpdateProductVariant();
                }}
              >
                Update Product Variant
              </Button>
            </Stack>
            <Box mt={2}>
              <Stack direction={'row'} alignItems={'center'} gap={2}>
                <Typography mb={1}>Image</Typography>
                {image && image != '' && (
                  <Button
                    variant={'contained'}
                    color="error"
                    onClick={() => {
                      setImage('');
                    }}
                  >
                    Delete
                  </Button>
                )}
              </Stack>
              <Box style={{ border: '1px dashed #000' }} mt={1}>
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
              <Typography mb={1}>Position(the order of the product variant in the list of product variants)</Typography>
              <TextField
                hiddenLabel
                size="small"
                fullWidth
                type="number"
                value={position}
                onChange={(e: any) => {
                  setPosition(e.target.value);
                }}
                placeholder="position your variant"
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
              <Typography mb={1}>
                Compare at price(the original price of the item before an adjustment or a sale)
              </Typography>
              <TextField
                hiddenLabel
                size="small"
                fullWidth
                type="number"
                value={compareAtPrice}
                onChange={(e: any) => {
                  setCompareAtPrice(e.target.value);
                }}
                placeholder="compare at price your variant"
              />
            </Box>
            <Box mt={2}>
              <Typography mb={1}>Tip</Typography>
              <TextField
                hiddenLabel
                size="small"
                fullWidth
                type="number"
                value={tipReceived}
                onChange={(e: any) => {
                  setTipReceived(e.target.value);
                }}
                placeholder="tip at price your variant"
              />
            </Box>
            <Box mt={2}>
              <Typography mb={1}>Discounts</Typography>
              <TextField
                hiddenLabel
                size="small"
                fullWidth
                type="number"
                value={discounts}
                onChange={(e: any) => {
                  setDiscounts(e.target.value);
                }}
                placeholder="discounts at price your variant"
              />
            </Box>
            <Box mt={2}>
              <Typography mb={1}>Barcode(the barcode, UPC, or ISBN number for the product)</Typography>
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
                placeholder="quantity your variant"
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
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={1} mt={2}>
              <Box width={'100%'}>
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
                  placeholder="weight your variant"
                />
              </Box>
              <Box width={'100%'}>
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
            </Stack>
            <Stack mt={2} direction={'row'} alignItems={'center'}>
              <Switch
                checked={inventoryPolicy}
                onChange={() => {
                  setInventoryPolicy(!inventoryPolicy);
                }}
              />
              <Typography>
                Inventory policy(whether customers are allowed to place an order for the product variant when it's out
                of stock)
              </Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'}>
              <Switch
                checked={taxable}
                onChange={() => {
                  setTaxable(!taxable);
                }}
              />
              <Typography>Taxable(whether a tax is charged when the product variant is sold)</Typography>
            </Stack>
            {taxable && (
              <Box py={1}>
                <Typography mb={1}>Tax</Typography>
                <TextField
                  hiddenLabel
                  size="small"
                  fullWidth
                  type="number"
                  value={tax}
                  onChange={(e: any) => {
                    setTax(e.target.value);
                  }}
                  placeholder="tax your variant"
                />
              </Box>
            )}
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
