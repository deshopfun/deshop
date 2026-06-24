// import { useSnackPresistStore } from 'lib';
// import { FILE_TYPE, WEIGHT_UNIT_TYPE } from 'packages/constants';
// import { CURRENCYS } from 'packages/constants/currency';
// import { useEffect, useState } from 'react';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';
// import { ProductOptionType } from 'utils/types';

// type Props = {
//   product_id: number;
//   options?: ProductOptionType[];
//   currency: string;
// };

// const ProductVariant = (props: Props) => {
//   const [currency, setCurrency] = useState<string>('');
//   const [title, setTitle] = useState<string>('');
//   const [image, setImage] = useState<string>('');
//   const [barcode, setBarcode] = useState<string>('');
//   const [compareAtPrice, setCompareAtPrice] = useState<string>('');
//   const [inventoryPolicy, setInventoryPolicy] = useState<boolean>(false);
//   const [inventoryQuantity, setInventoryQuantity] = useState<string>('');
//   const [price, setPrice] = useState<string>('');
//   const [position, setPosition] = useState<string>('');
//   const [sku, setSku] = useState<string>('');
//   const [tax, setTax] = useState<string>('');
//   const [taxable, setTaxable] = useState<boolean>(false);
//   const [shipping, setShipping] = useState<string>('');
//   const [shippable, setShippable] = useState<boolean>(false);
//   const [discounts, setDiscounts] = useState<string>('');
//   const [tip, setTip] = useState<string>('');
//   const [weight, setWeight] = useState<string>('');
//   const [weightUnit, setWeightUnit] = useState<string>('');
//   const [options, setOptions] = useState<ProductOptionType[]>([]);
//   const [optionOneValue, setOptionOneValue] = useState<string>('');
//   const [optionTwoValue, setOptionTwoValue] = useState<string>('');
//   const [optionThreeValue, setOptionThreeValue] = useState<string>('');

//   const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

//   useEffect(() => {
//     if (props.options) {
//       setOptions(props.options || []);
//       props.options[0] && setOptionOneValue(props.options[0].value.split(',')[0] || '');
//       props.options[1] && setOptionTwoValue(props.options[1].value.split(',')[0] || '');
//       props.options[2] && setOptionThreeValue(props.options[2].value.split(',')[0] || '');
//       setCurrency(props.currency);
//     }
//   }, [props]);

//   const init = async (oneValue: string, twoValue: string, threeValue: string) => {
//     try {
//       let option = '';
//       switch (options.length) {
//         case 3:
//           if (!oneValue || !twoValue || !threeValue) return;
//           option = `${oneValue},${twoValue},${threeValue}`;
//           break;
//         case 2:
//           if (!oneValue || !twoValue) return;
//           option = `${oneValue},${twoValue}`;
//           break;
//         case 1:
//           if (!oneValue) return;
//           option = `${oneValue}`;
//           break;
//         default:
//           return;
//       }

//       const response: any = await axios.get(Http.product_variant, {
//         params: {
//           product_id: props.product_id,
//           option: option,
//         },
//       });

//       if (response.result) {
//         setTitle(response.data.title);
//         setImage(response.data.image);
//         setBarcode(response.data.barcode);
//         setCompareAtPrice(response.data.compare_at_price);
//         setInventoryPolicy(response.data.inventory_policy === 1 ? true : false);
//         setInventoryQuantity(response.data.inventory_quantity);
//         setPrice(response.data.price);
//         setPosition(response.data.position);
//         setSku(response.data.sku);
//         setTax(response.data.tax);
//         setTaxable(response.data.taxable === 1 ? true : false);
//         setDiscounts(response.data.discounts);
//         setTip(response.data.tip);
//         setWeight(response.data.weight);
//         setWeightUnit(response.data.weight_unit);
//         setShipping(response.data.shipping);
//         setShippable(response.data.shippable === 1 ? true : false);
//       } else {
//         setTitle('');
//         setImage('');
//         setBarcode('');
//         setCompareAtPrice('');
//         setInventoryPolicy(false);
//         setInventoryQuantity('');
//         setPrice('');
//         setPosition('');
//         setSku('');
//         setTax('');
//         setTaxable(false);
//         setDiscounts('');
//         setTip('');
//         setWeight('');
//         setWeightUnit('');
//         setShipping('');
//         setShippable(false);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later.');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     init(optionOneValue, optionTwoValue, optionThreeValue);
//   }, [optionOneValue, optionTwoValue, optionThreeValue]);

//   const VisuallyHiddenInput = styled('input')({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     height: 1,
//     overflow: 'hidden',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     whiteSpace: 'nowrap',
//     width: 1,
//   });

//   const uploadFile = async (files: FileList) => {
//     try {
//       if (!files.length || files.length === 0) {
//         setSnackSeverity('error');
//         setSnackMessage('Not found the file');
//         setSnackOpen(true);
//         return;
//       }

//       const formData = new FormData();
//       Array.from(files).forEach((file) => {
//         formData.append('files', file);
//       });

//       const response: any = await axios.post(Http.upload_file, formData, {
//         params: {
//           file_type: FILE_TYPE.Image,
//         },
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.result && response.data.urls.length > 0) {
//         setImage(response.data.urls[0]);
//       } else {
//         setSnackSeverity('error');
//         setSnackMessage('Upload Failed');
//         setSnackOpen(true);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later.');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   const onClickUpdateProductVariant = async () => {
//     try {
//       if (!image || image === '') {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect image upload');
//         setSnackOpen(true);
//         return;
//       }

//       if (!position || parseInt(position) <= 0) {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect position input');
//         setSnackOpen(true);
//         return;
//       }

//       if (!title || title === '') {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect title input');
//         setSnackOpen(true);
//         return;
//       }

//       if (!price || Number(price) <= 0) {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect price input');
//         setSnackOpen(true);
//         return;
//       }

//       if (compareAtPrice && Number(compareAtPrice) <= 0) {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect compare at price input');
//         setSnackOpen(true);
//         return;
//       }

//       if (Number(price) < Number(compareAtPrice)) {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect price and compare at price input');
//         setSnackOpen(true);
//         return;
//       }

//       if (tip && Number(tip) <= 0) {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect tip input');
//         setSnackOpen(true);
//         return;
//       }

//       if (discounts && Number(discounts) <= 0) {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect discounts input');
//         setSnackOpen(true);
//         return;
//       }

//       if (Number(discounts) > Number(price)) {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect discounts input');
//         setSnackOpen(true);
//         return;
//       }

//       if (!inventoryQuantity || parseInt(inventoryQuantity) <= 0) {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect inventory quantity input');
//         setSnackOpen(true);
//         return;
//       }

//       if (weight && (Number(weight) <= 0 || weightUnit === '')) {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect weight and unit of weight input');
//         setSnackOpen(true);
//         return;
//       }

//       if (taxable) {
//         if (!tax || Number(tax) <= 0) {
//           setSnackSeverity('error');
//           setSnackMessage('Incorrect tax input');
//           setSnackOpen(true);
//           return;
//         }
//       }

//       // if (shippable) {
//       //   if (!shipping || Number(shipping) <= 0) {
//       //     setSnackSeverity('error');
//       //     setSnackMessage('Incorrect shipping input');
//       //     setSnackOpen(true);
//       //     return;
//       //   }
//       // }

//       let option = '';
//       switch (options.length) {
//         case 3:
//           option = `${optionOneValue},${optionTwoValue},${optionThreeValue}`;
//           break;
//         case 2:
//           option = `${optionOneValue},${optionTwoValue}`;
//           break;
//         case 1:
//           option = `${optionOneValue}`;
//           break;
//         default:
//           return;
//       }

//       if (!option || option === '') {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect option parameter');
//         setSnackOpen(true);
//         return;
//       }

//       const response: any = await axios.post(Http.product_variant, {
//         product_id: props.product_id,
//         image: image,
//         position: parseInt(position),
//         title: title,
//         price: price,
//         compare_at_price: compareAtPrice,
//         tip: tip,
//         discounts: discounts,
//         barcode: barcode,
//         inventory_quantity: parseInt(inventoryQuantity),
//         sku: sku,
//         // weight: weight,
//         // weight_unit: weightUnit,
//         inventory_policy: inventoryPolicy ? 1 : 2,
//         taxable: taxable ? 1 : 2,
//         tax: taxable ? tax : undefined,
//         // shippable: shippable ? 1 : 2,
//         // shipping: shippable ? shipping : undefined,
//         option: option,
//       });

//       if (response.result) {
//         await init(optionOneValue, optionTwoValue, optionThreeValue);
//         setSnackSeverity('success');
//         setSnackMessage('Update successfully');
//         setSnackOpen(true);
//       } else {
//         setSnackSeverity('error');
//         setSnackMessage(response.message);
//         setSnackOpen(true);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later.');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   return (
//     <Box>
//       <Typography variant="h6">Update product variant</Typography>
//       <Box mt={2}>
//         <Card>
//           <CardContent>
//             {options &&
//               options.length > 0 &&
//               options.map((item, index) => (
//                 <Box key={index} mb={4}>
//                   <Typography variant="h6">{item.name}</Typography>
//                   <Grid container spacing={10} py={1}>
//                     {item.value &&
//                       item.value.split(',').length > 0 &&
//                       item.value.split(',').map((innerItem, innerIndex) => (
//                         <Grid size={{ xs: 2, md: 2 }} key={innerIndex}>
//                           <Button
//                             variant={'contained'}
//                             color={
//                               index === 0 && innerItem === optionOneValue
//                                 ? 'success'
//                                 : index === 1 && innerItem === optionTwoValue
//                                 ? 'success'
//                                 : index === 2 && innerItem === optionThreeValue
//                                 ? 'success'
//                                 : 'primary'
//                             }
//                             onClick={() => {
//                               if (index === 0) {
//                                 setOptionOneValue(innerItem);
//                               } else if (index === 1) {
//                                 setOptionTwoValue(innerItem);
//                               } else if (index === 2) {
//                                 setOptionThreeValue(innerItem);
//                               }
//                             }}
//                           >
//                             {innerItem}
//                           </Button>
//                         </Grid>
//                       ))}
//                   </Grid>
//                 </Box>
//               ))}
//           </CardContent>
//         </Card>
//       </Box>
//       <Box mt={2}>
//         <Card>
//           <CardContent>
//             <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//               <Typography mb={1} variant="h6">
//                 Product Variant
//               </Typography>
//               <Button
//                 variant={'contained'}
//                 color={'success'}
//                 onClick={() => {
//                   onClickUpdateProductVariant();
//                 }}
//               >
//                 Update Product Variant
//               </Button>
//             </Stack>
//             <Box mt={2}>
//               <Stack direction={'row'} alignItems={'center'} gap={2}>
//                 <Typography mb={1}>Image</Typography>
//                 {image && image != '' && (
//                   <Button
//                     variant={'contained'}
//                     color="error"
//                     onClick={() => {
//                       setImage('');
//                     }}
//                   >
//                     Delete
//                   </Button>
//                 )}
//               </Stack>
//               <Box style={{ border: '1px dashed #000' }} mt={1}>
//                 {image && image != '' ? (
//                   <img srcSet={image} src={image} alt={'image'} loading="lazy" />
//                 ) : (
//                   <Button component="label" role={undefined} tabIndex={-1} fullWidth>
//                     <Box py={12} textAlign={'center'}>
//                       <VisuallyHiddenInput
//                         type="file"
//                         onChange={async (event: any) => {
//                           await uploadFile(event.target.files);
//                         }}
//                       />
//                       {/* <Collections fontSize={'large'} /> */}
//                       <Typography mt={1}>Select video or image to upload</Typography>
//                       <Typography>or drag or drop it here</Typography>
//                     </Box>
//                   </Button>
//                 )}
//               </Box>
//             </Box>
//             <Box mt={2}>
//               <Typography mb={1}>Position(the order of the product variant in the list of product variants)</Typography>
//               <TextField
//                 hiddenLabel
//                 size="small"
//                 fullWidth
//                 type="number"
//                 value={position}
//                 onChange={(e: any) => {
//                   setPosition(e.target.value);
//                 }}
//                 placeholder="position your variant"
//               />
//             </Box>
//             <Box mt={2}>
//               <Typography mb={1}>Title</Typography>
//               <TextField
//                 hiddenLabel
//                 size="small"
//                 fullWidth
//                 value={title}
//                 onChange={(e) => {
//                   setTitle(e.target.value);
//                 }}
//                 placeholder="title your variant"
//               />
//             </Box>
//             <Box mt={2}>
//               <Typography mb={1}>Price</Typography>
//               <TextField
//                 slotProps={{
//                   input: {
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         {CURRENCYS.find((item) => item.name === currency)?.code}
//                       </InputAdornment>
//                     ),
//                   },
//                 }}
//                 hiddenLabel
//                 size="small"
//                 fullWidth
//                 type="number"
//                 value={price}
//                 onChange={(e: any) => {
//                   setPrice(e.target.value);
//                 }}
//                 placeholder="price your variant"
//               />
//             </Box>
//             <Box mt={2}>
//               <Typography mb={1}>
//                 Compare at price(the original price of the item before an adjustment or a sale)
//               </Typography>
//               <TextField
//                 slotProps={{
//                   input: {
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         {CURRENCYS.find((item) => item.name === currency)?.code}
//                       </InputAdornment>
//                     ),
//                   },
//                 }}
//                 hiddenLabel
//                 size="small"
//                 fullWidth
//                 type="number"
//                 value={compareAtPrice}
//                 onChange={(e: any) => {
//                   setCompareAtPrice(e.target.value);
//                 }}
//                 placeholder="compare at price your variant"
//               />
//             </Box>
//             <Box mt={2}>
//               <Typography mb={1}>Tip</Typography>
//               <TextField
//                 slotProps={{
//                   input: {
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         {CURRENCYS.find((item) => item.name === currency)?.code}
//                       </InputAdornment>
//                     ),
//                   },
//                 }}
//                 hiddenLabel
//                 size="small"
//                 fullWidth
//                 type="number"
//                 value={tip}
//                 onChange={(e: any) => {
//                   setTip(e.target.value);
//                 }}
//                 placeholder="tip at price your variant"
//               />
//             </Box>
//             <Box mt={2}>
//               <Typography mb={1}>Discounts</Typography>
//               <TextField
//                 slotProps={{
//                   input: {
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         {CURRENCYS.find((item) => item.name === currency)?.code}
//                       </InputAdornment>
//                     ),
//                   },
//                 }}
//                 hiddenLabel
//                 size="small"
//                 fullWidth
//                 type="number"
//                 value={discounts}
//                 onChange={(e: any) => {
//                   setDiscounts(e.target.value);
//                 }}
//                 placeholder="discounts at price your variant"
//               />
//             </Box>
//             <Box mt={2}>
//               <Typography mb={1}>Barcode(the barcode, UPC, or ISBN number for the product)</Typography>
//               <TextField
//                 hiddenLabel
//                 size="small"
//                 fullWidth
//                 value={barcode}
//                 onChange={(e) => {
//                   setBarcode(e.target.value);
//                 }}
//                 placeholder="barcode your variant"
//               />
//             </Box>
//             <Box mt={2}>
//               <Typography mb={1}>Inventory quantity</Typography>
//               <TextField
//                 hiddenLabel
//                 size="small"
//                 fullWidth
//                 type="number"
//                 value={inventoryQuantity}
//                 onChange={(e: any) => {
//                   setInventoryQuantity(e.target.value);
//                 }}
//                 placeholder="quantity your variant"
//               />
//             </Box>
//             <Box mt={2}>
//               <Typography mb={1}>Sku</Typography>
//               <TextField
//                 hiddenLabel
//                 size="small"
//                 fullWidth
//                 value={sku}
//                 onChange={(e: any) => {
//                   setSku(e.target.value);
//                 }}
//                 placeholder="sku your variant"
//               />
//             </Box>
//             {/* <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={1} mt={2}>
//               <Box width={'100%'}>
//                 <Typography mb={1}>Weight</Typography>
//                 <TextField
//                   hiddenLabel
//                   size="small"
//                   fullWidth
//                   type="number"
//                   value={weight}
//                   onChange={(e: any) => {
//                     setWeight(e.target.value);
//                   }}
//                   placeholder="weight your variant"
//                 />
//               </Box>
//               <Box width={'100%'}>
//                 <Typography mb={1}>Weight unit</Typography>
//                 <FormControl hiddenLabel fullWidth>
//                   <Select
//                     displayEmpty
//                     value={weightUnit}
//                     onChange={(e: any) => {
//                       setWeightUnit(e.target.value);
//                     }}
//                     size={'small'}
//                     inputProps={{ 'aria-label': 'Without label' }}
//                     renderValue={(selected: any) => {
//                       if (selected.length === 0) {
//                         return <em>Choose weight</em>;
//                       }

//                       return selected;
//                     }}
//                   >
//                     {WEIGHT_UNIT_TYPE &&
//                       Object.entries(WEIGHT_UNIT_TYPE).map((item, index) => (
//                         <MenuItem value={item[1]} key={index}>
//                           {item[1]}
//                         </MenuItem>
//                       ))}
//                   </Select>
//                 </FormControl>
//               </Box>
//             </Stack> */}
//             <Stack direction={'row'} alignItems={'center'} mt={2}>
//               <Switch
//                 checked={taxable}
//                 onChange={() => {
//                   setTaxable(!taxable);
//                 }}
//               />
//               <Typography>Taxable(whether a tax is charged when the product variant is sold)</Typography>
//             </Stack>
//             {taxable && (
//               <Box py={1}>
//                 <Typography mb={1}>Tax</Typography>
//                 <TextField
//                   slotProps={{
//                     input: {
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           {CURRENCYS.find((item) => item.name === currency)?.code}
//                         </InputAdornment>
//                       ),
//                     },
//                   }}
//                   hiddenLabel
//                   size="small"
//                   fullWidth
//                   type="number"
//                   value={tax}
//                   onChange={(e: any) => {
//                     setTax(e.target.value);
//                   }}
//                   placeholder="tax your variant"
//                 />
//               </Box>
//             )}
//             {/* <Stack direction={'row'} alignItems={'center'}>
//               <Switch
//                 checked={shippable}
//                 onChange={() => {
//                   setShippable(!shippable);
//                 }}
//               />
//               <Typography>Shippable</Typography>
//             </Stack>
//             {shippable && (
//               <Box py={1}>
//                 <Typography mb={1}>Shipping</Typography>
//                 <TextField
//                   slotProps={{
//                     input: {
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           {CURRENCYS.find((item) => item.name === currency)?.code}
//                         </InputAdornment>
//                       ),
//                     },
//                   }}
//                   hiddenLabel
//                   size="small"
//                   fullWidth
//                   type="number"
//                   value={shipping}
//                   onChange={(e: any) => {
//                     setShipping(e.target.value);
//                   }}
//                   placeholder="shipping your variant"
//                 />
//               </Box>
//             )} */}
//             <Stack direction={'row'} alignItems={'center'}>
//               <Switch
//                 checked={inventoryPolicy}
//                 onChange={() => {
//                   setInventoryPolicy(!inventoryPolicy);
//                 }}
//               />
//               <Typography>
//                 Inventory policy(whether buyers are allowed to place an order for the product variant when it's out of
//                 stock)
//               </Typography>
//             </Stack>
//           </CardContent>
//         </Card>
//       </Box>
//     </Box>
//   );
// };

// export default ProductVariant;

import { useSnackPresistStore } from 'lib';
import { FILE_TYPE } from 'packages/constants';
import { CURRENCYS } from 'packages/constants/currency';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { ProductOptionType } from 'utils/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ImagePlus, Trash2, Save, Package, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  product_id: number;
  options?: ProductOptionType[];
  currency: string;
};

// 带货币前缀的输入框
const CurrencyInput = ({
  label,
  desc,
  value,
  onChange,
  placeholder,
  currencyCode,
}: {
  label: string;
  desc?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  currencyCode: string;
}) => (
  <div className="flex flex-col gap-1.5">
    <Label>{label}</Label>
    {desc && <p className="text-xs text-muted-foreground">{desc}</p>}
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
        {currencyCode}
      </span>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10"
      />
    </div>
  </div>
);

// Switch 行组件
const SwitchRow = ({
  label,
  desc,
  checked,
  onCheckedChange,
}: {
  label: string;
  desc?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) => (
  <div className="flex items-start justify-between gap-4 py-3 border-b border-dashed last:border-0">
    <div>
      <p className="text-sm font-medium">{label}</p>
      {desc && <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>}
    </div>
    <Switch checked={checked} onCheckedChange={onCheckedChange} />
  </div>
);

const ProductVariant = (props: Props) => {
  const [currency, setCurrency] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [barcode, setBarcode] = useState('');
  const [compareAtPrice, setCompareAtPrice] = useState('');
  const [inventoryPolicy, setInventoryPolicy] = useState(false);
  const [inventoryQuantity, setInventoryQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [position, setPosition] = useState('');
  const [sku, setSku] = useState('');
  const [tax, setTax] = useState('');
  const [taxable, setTaxable] = useState(false);
  const [discounts, setDiscounts] = useState('');
  const [tip, setTip] = useState('');
  const [options, setOptions] = useState<ProductOptionType[]>([]);
  const [optionOneValue, setOptionOneValue] = useState('');
  const [optionTwoValue, setOptionTwoValue] = useState('');
  const [optionThreeValue, setOptionThreeValue] = useState('');
  const [uploading, setUploading] = useState(false);

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

  const showError = (msg: string) => {
    setSnackSeverity('error');
    setSnackMessage(msg);
    setSnackOpen(true);
  };
  const showSuccess = (msg: string) => {
    setSnackSeverity('success');
    setSnackMessage(msg);
    setSnackOpen(true);
  };
  const currencyCode = CURRENCYS.find((c) => c.name === currency)?.code ?? '';

  useEffect(() => {
    if (props.options) {
      setOptions(props.options);
      setOptionOneValue(props.options[0]?.value.split(',')[0] || '');
      setOptionTwoValue(props.options[1]?.value.split(',')[0] || '');
      setOptionThreeValue(props.options[2]?.value.split(',')[0] || '');
      setCurrency(props.currency);
    }
  }, [props]);

  const buildOption = () => {
    switch (options.length) {
      case 3:
        return optionOneValue && optionTwoValue && optionThreeValue
          ? `${optionOneValue},${optionTwoValue},${optionThreeValue}`
          : '';
      case 2:
        return optionOneValue && optionTwoValue ? `${optionOneValue},${optionTwoValue}` : '';
      case 1:
        return optionOneValue || '';
      default:
        return '';
    }
  };

  const resetForm = () => {
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
    setTip('');
  };

  const init = async (one: string, two: string, three: string) => {
    const option = (() => {
      switch (options.length) {
        case 3:
          return one && two && three ? `${one},${two},${three}` : '';
        case 2:
          return one && two ? `${one},${two}` : '';
        case 1:
          return one || '';
        default:
          return '';
      }
    })();
    if (!option) return;
    try {
      const response: any = await axios.get(Http.product_variant, {
        params: { product_id: props.product_id, option },
      });
      if (response.result) {
        const d = response.data;
        setTitle(d.title);
        setImage(d.image);
        setBarcode(d.barcode);
        setCompareAtPrice(d.compare_at_price);
        setInventoryPolicy(d.inventory_policy === 1);
        setInventoryQuantity(d.inventory_quantity);
        setPrice(d.price);
        setPosition(d.position);
        setSku(d.sku);
        setTax(d.tax);
        setTaxable(d.taxable === 1);
        setDiscounts(d.discounts);
        setTip(d.tip);
      } else {
        resetForm();
      }
    } catch {
      showError('Network error. Please try again later.');
    }
  };

  useEffect(() => {
    init(optionOneValue, optionTwoValue, optionThreeValue);
  }, [optionOneValue, optionTwoValue, optionThreeValue]);

  const uploadFile = async (files: FileList) => {
    if (!files.length) return showError('No file selected');
    setUploading(true);
    try {
      const formData = new FormData();
      Array.from(files).forEach((f) => formData.append('files', f));
      const response: any = await axios.post(Http.upload_file, formData, {
        params: { file_type: FILE_TYPE.Image },
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.result && response.data.urls.length > 0) {
        setImage(response.data.urls[0]);
      } else {
        showError('Upload failed');
      }
    } catch {
      showError('Network error. Please try again later.');
    } finally {
      setUploading(false);
    }
  };

  const onClickUpdateProductVariant = async () => {
    if (!image) return showError('Please upload a variant image');
    if (!position || parseInt(position) <= 0) return showError('Incorrect position input');
    if (!title) return showError('Incorrect title input');
    if (!price || Number(price) <= 0) return showError('Incorrect price input');
    if (compareAtPrice && Number(compareAtPrice) <= 0) return showError('Incorrect compare at price');
    if (compareAtPrice && Number(price) < Number(compareAtPrice))
      return showError('Price cannot be less than compare at price');
    if (tip && Number(tip) <= 0) return showError('Incorrect tip input');
    if (discounts && Number(discounts) <= 0) return showError('Incorrect discounts input');
    if (discounts && Number(discounts) > Number(price)) return showError('Discounts cannot exceed price');
    if (!inventoryQuantity || parseInt(inventoryQuantity) <= 0) return showError('Incorrect inventory quantity');
    if (taxable && (!tax || Number(tax) <= 0)) return showError('Incorrect tax input');

    const option = buildOption();
    if (!option) return showError('Incorrect option parameter');

    try {
      const response: any = await axios.post(Http.product_variant, {
        product_id: props.product_id,
        image,
        position: parseInt(position),
        title,
        price,
        compare_at_price: compareAtPrice,
        tip,
        discounts,
        barcode,
        inventory_quantity: parseInt(inventoryQuantity),
        sku,
        inventory_policy: inventoryPolicy ? 1 : 2,
        taxable: taxable ? 1 : 2,
        tax: taxable ? tax : undefined,
        option,
      });
      if (response.result) {
        await init(optionOneValue, optionTwoValue, optionThreeValue);
        showSuccess('Updated successfully');
      } else {
        showError(response.message);
      }
    } catch {
      showError('Network error. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      {/* 选项选择器 */}
      {options.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center">
                <SlidersHorizontal className="h-4 w-4 text-purple-500" />
              </div>
              <h3 className="font-semibold">Select Variant</h3>
            </div>

            {options.map((item, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Label className="text-sm">{item.name}</Label>
                <div className="flex flex-wrap gap-2">
                  {item.value.split(',').map((val, vi) => {
                    const isSelected =
                      (index === 0 && val === optionOneValue) ||
                      (index === 1 && val === optionTwoValue) ||
                      (index === 2 && val === optionThreeValue);
                    return (
                      <button
                        key={vi}
                        onClick={() => {
                          if (index === 0) setOptionOneValue(val);
                          else if (index === 1) setOptionTwoValue(val);
                          else setOptionThreeValue(val);
                        }}
                        className={cn(
                          'px-4 py-1.5 rounded-full text-sm border transition-all duration-150',
                          isSelected
                            ? 'bg-sky-500 text-white border-sky-500'
                            : 'border-gray-200 text-gray-600 hover:border-sky-300 hover:text-sky-500',
                        )}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* 变体详情 */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-5">
          {/* 标题 + 保存 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-sky-50 flex items-center justify-center">
                <Package className="h-4 w-4 text-sky-500" />
              </div>
              <h3 className="font-semibold">Variant Details</h3>
            </div>
            <Button
              className="h-9 bg-sky-500 hover:bg-sky-600 text-white gap-1.5"
              onClick={onClickUpdateProductVariant}
            >
              <Save className="h-4 w-4" /> Save
            </Button>
          </div>

          {/* 图片上传 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label>Variant Image</Label>
              {image && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-red-500 hover:bg-red-50 gap-1"
                  onClick={() => setImage('')}
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove
                </Button>
              )}
            </div>
            {image ? (
              <div className="relative w-32 h-32 rounded-xl overflow-hidden border">
                <img src={image} alt="variant" className="w-full h-full object-cover" />
              </div>
            ) : (
              <label
                className={cn(
                  'flex flex-col items-center justify-center gap-2 py-8 rounded-xl border-2 border-dashed cursor-pointer transition-colors',
                  uploading ? 'border-sky-300 bg-sky-50' : 'border-gray-200 hover:border-sky-300 hover:bg-sky-50',
                )}
              >
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <ImagePlus className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">{uploading ? 'Uploading...' : 'Click to upload image'}</p>
                <input type="file" className="sr-only" onChange={(e: any) => uploadFile(e.target.files)} />
              </label>
            )}
          </div>

          <div className="border-t border-dashed" />

          {/* 基本字段 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>
                Title <span className="text-red-500">*</span>
              </Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Variant title" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Position</Label>
              <Input
                type="number"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Display order"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>SKU</Label>
              <Input value={sku} onChange={(e) => setSku(e.target.value)} placeholder="Stock keeping unit" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Barcode</Label>
              <Input value={barcode} onChange={(e) => setBarcode(e.target.value)} placeholder="UPC, ISBN, etc." />
            </div>
          </div>

          <div className="border-t border-dashed" />

          {/* 价格字段 */}
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Pricing</h4>
          <div className="grid grid-cols-2 gap-4">
            <CurrencyInput
              label="Price *"
              value={price}
              onChange={setPrice}
              placeholder="0.00"
              currencyCode={currencyCode}
            />
            <CurrencyInput
              label="Compare at Price"
              desc="Original price before sale"
              value={compareAtPrice}
              onChange={setCompareAtPrice}
              placeholder="0.00"
              currencyCode={currencyCode}
            />
            <CurrencyInput label="Tip" value={tip} onChange={setTip} placeholder="0.00" currencyCode={currencyCode} />
            <CurrencyInput
              label="Discounts"
              value={discounts}
              onChange={setDiscounts}
              placeholder="0.00"
              currencyCode={currencyCode}
            />
          </div>

          <div className="border-t border-dashed" />

          {/* 库存 */}
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Inventory</h4>
          <div className="flex flex-col gap-1.5">
            <Label>
              Inventory Quantity <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              value={inventoryQuantity}
              onChange={(e) => setInventoryQuantity(e.target.value)}
              placeholder="Available stock"
            />
          </div>

          <div className="border-t border-dashed" />

          {/* 开关 */}
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Settings</h4>
          <div className="flex flex-col">
            <SwitchRow
              label="Taxable"
              desc="Charge tax when this variant is sold"
              checked={taxable}
              onCheckedChange={setTaxable}
            />
            {taxable && (
              <div className="py-3">
                <CurrencyInput
                  label="Tax Amount"
                  value={tax}
                  onChange={setTax}
                  placeholder="0.00"
                  currencyCode={currencyCode}
                />
              </div>
            )}
            <SwitchRow
              label="Allow Overselling"
              desc="Let buyers order even when out of stock"
              checked={inventoryPolicy}
              onCheckedChange={setInventoryPolicy}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductVariant;
