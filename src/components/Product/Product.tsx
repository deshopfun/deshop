// import { useSnackPresistStore } from 'lib';
// import { FILE_TYPE, PRODUCT_TYPE } from 'packages/constants';
// import { useEffect, useState } from 'react';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';
// import { ProductImageType, ProductOptionType } from 'utils/types';

// type Props = {
//   product_id: number;
//   title?: string;
//   vendor?: string;
//   productType?: string;
//   tags?: string;
//   description?: string;
//   options?: ProductOptionType[];
//   images?: ProductImageType[];
//   productStatus?: number;
//   init: (id: any) => Promise<void>;
// };

// const Product = (props: Props) => {
//   const [title, setTitle] = useState<string>('');
//   const [vendor, setVendor] = useState<string>('');
//   const [productType, setProductType] = useState<string>(PRODUCT_TYPE.GAMING);
//   const [tags, setTags] = useState<string>('');
//   const [description, setDescription] = useState<string>('');
//   const [optionOne, setOptionOne] = useState<string>('');
//   const [optionOneValue, setOptionOneValue] = useState<string>('');
//   const [optionTwo, setOptionTwo] = useState<string>('');
//   const [optionTwoValue, setOptionTwoValue] = useState<string>('');
//   const [optionThree, setOptionThree] = useState<string>('');
//   const [optionThreeValue, setOptionThreeValue] = useState<string>('');
//   const [imageList, setImageList] = useState<string[]>([]);

//   const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

//   useEffect(() => {
//     setTitle(props.title || '');
//     setVendor(props.vendor || '');
//     setProductType(props.productType || '');
//     setTags(props.tags || '');
//     setDescription(props.description || '');
//     if (props.options) {
//       props.options[0] && setOptionOne(props.options[0].name || '');
//       props.options[0] && setOptionOneValue(props.options[0].value || '');
//       props.options[1] && setOptionTwo(props.options[1].name || '');
//       props.options[1] && setOptionTwoValue(props.options[1].value || '');
//       props.options[2] && setOptionThree(props.options[2].name || '');
//       props.options[2] && setOptionThreeValue(props.options[2].value || '');
//     }
//     if (props.images) {
//       let lists: string[] = [];
//       props.images.forEach((item) => {
//         if (item.src && item.src !== '') {
//           lists.push(item.src);
//         }
//       });
//       setImageList(lists);
//     }
//   }, [props]);

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
//         setImageList(response.data.urls);
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

//   const onClickUpdateProductBase = async () => {
//     try {
//       if (!title || title === '') {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect title input');
//         setSnackOpen(true);
//         return;
//       }

//       if (!productType || productType === '') {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect product type');
//         setSnackOpen(true);
//         return;
//       }

//       if (!tags || tags === '') {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect tags input');
//         setSnackOpen(true);
//         return;
//       }

//       if (!description || description === '') {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect description input');
//         setSnackOpen(true);
//         return;
//       }

//       const response: any = await axios.put(Http.product_base, {
//         product_id: props.product_id,
//         title: title,
//         body_html: description,
//         product_type: productType,
//         tags: tags,
//         vendor: vendor,
//       });

//       if (response.result) {
//         await props.init(props.product_id);
//         setSnackSeverity('success');
//         setSnackMessage('Update successfully');
//         setSnackOpen(true);
//       } else {
//         setSnackSeverity('error');
//         setSnackMessage('Update Failed');
//         setSnackOpen(true);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later.');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   const onClickUpdateProductOption = async () => {
//     try {
//       const productOption: ProductOptionType[] = [];
//       if (optionOne && optionOneValue && optionOne != '' && optionOneValue != '') {
//         const oneValueArray = optionOneValue.split(',');
//         if (new Set(oneValueArray).size !== oneValueArray.length) {
//           setSnackSeverity('error');
//           setSnackMessage('Product option has same value');
//           setSnackOpen(true);
//           return;
//         }
//         productOption.push({
//           name: optionOne,
//           value: optionOneValue,
//         });
//       }
//       if (optionTwo && optionTwoValue && optionTwo != '' && optionTwoValue != '') {
//         const twoValueArray = optionTwoValue.split(',');
//         if (new Set(twoValueArray).size !== twoValueArray.length) {
//           setSnackSeverity('error');
//           setSnackMessage('Product option has same value');
//           setSnackOpen(true);
//           return;
//         }
//         productOption.push({
//           name: optionTwo,
//           value: optionTwoValue,
//         });
//       }
//       if (optionThree && optionThreeValue && optionThree != '' && optionThreeValue != '') {
//         const threeValueArray = optionThreeValue.split(',');
//         if (new Set(threeValueArray).size !== threeValueArray.length) {
//           setSnackSeverity('error');
//           setSnackMessage('Product option has same value');
//           setSnackOpen(true);
//           return;
//         }
//         productOption.push({
//           name: optionThree,
//           value: optionThreeValue,
//         });
//       }

//       if (productOption.length <= 0) {
//         setSnackSeverity('error');
//         setSnackMessage('At least one product option is needed');
//         setSnackOpen(true);
//         return;
//       }

//       const response: any = await axios.put(Http.product_option, {
//         product_id: props.product_id,
//         options: productOption,
//       });

//       if (response.result) {
//         await props.init(props.product_id);
//         setSnackSeverity('success');
//         setSnackMessage('Update successfully');
//         setSnackOpen(true);
//       } else {
//         setSnackSeverity('error');
//         setSnackMessage('Update Failed');
//         setSnackOpen(true);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later.');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   const onClickUpdateProductImage = async () => {
//     try {
//       const productImages: ProductImageType[] = [];
//       if (imageList && imageList.length > 0) {
//         imageList.forEach((item) => {
//           productImages.push({
//             src: item,
//             width: 100,
//             height: 100,
//           });
//         });
//       }

//       if (productImages.length <= 0) {
//         setSnackSeverity('error');
//         setSnackMessage('At least one image is needed');
//         setSnackOpen(true);
//         return;
//       }

//       const response: any = await axios.put(Http.product_image, {
//         product_id: props.product_id,
//         images: productImages,
//       });

//       if (response.result) {
//         await props.init(props.product_id);
//         setSnackSeverity('success');
//         setSnackMessage('Update successfully');
//         setSnackOpen(true);
//       } else {
//         setSnackSeverity('error');
//         setSnackMessage('Update Failed');
//         setSnackOpen(true);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later.');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   const onClickUpdateProductStatus = async (staus: number) => {
//     try {
//       if (staus === props.productStatus) {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect product status');
//         setSnackOpen(true);
//         return;
//       }

//       const response: any = await axios.put(Http.product_base, {
//         product_id: props.product_id,
//         product_status: staus,
//       });

//       if (response.result) {
//         await props.init(props.product_id);
//         setSnackSeverity('success');
//         setSnackMessage('Update successfully');
//         setSnackOpen(true);
//       } else {
//         setSnackSeverity('error');
//         setSnackMessage('Update Failed');
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
//       <Typography variant="h6">Update product</Typography>
//       <Box mt={2}>
//         <Card>
//           <CardContent>
//             <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//               <Typography mb={1} variant="h6">
//                 Base info
//               </Typography>
//               <Button
//                 variant={'contained'}
//                 color={'success'}
//                 onClick={() => {
//                   onClickUpdateProductBase();
//                 }}
//               >
//                 Update Product
//               </Button>
//             </Stack>
//             <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
//               <Stack direction={'row'} alignItems={'center'} gap={2}>
//                 <Typography variant="h6">Product status:</Typography>
//                 <Chip
//                   label={props.productStatus === 1 ? 'Active' : props.productStatus === 2 ? 'Archived' : 'Draft'}
//                   color={props.productStatus === 1 ? 'success' : props.productStatus === 2 ? 'info' : 'warning'}
//                 />
//               </Stack>
//               <Stack direction={'row'} alignItems={'center'} gap={2}>
//                 {props.productStatus !== 1 && (
//                   <Button
//                     variant={'contained'}
//                     color="success"
//                     onClick={() => {
//                       onClickUpdateProductStatus(1);
//                     }}
//                   >
//                     Active
//                   </Button>
//                 )}
//                 {props.productStatus !== 2 && (
//                   <Button
//                     variant={'contained'}
//                     color="info"
//                     onClick={() => {
//                       onClickUpdateProductStatus(2);
//                     }}
//                   >
//                     Archived
//                   </Button>
//                 )}
//                 {props.productStatus !== 3 && (
//                   <Button
//                     variant={'contained'}
//                     color="warning"
//                     onClick={() => {
//                       onClickUpdateProductStatus(3);
//                     }}
//                   >
//                     Draft
//                   </Button>
//                 )}
//               </Stack>
//             </Stack>
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
//                 placeholder="title your product"
//               />
//             </Box>
//             <Box mt={2}>
//               <Typography mb={1}>Vendor</Typography>
//               <TextField
//                 hiddenLabel
//                 size="small"
//                 fullWidth
//                 value={vendor}
//                 onChange={(e) => {
//                   setVendor(e.target.value);
//                 }}
//                 placeholder="name of the product vendor"
//               />
//             </Box>
//             <Box mt={2}>
//               <Typography>Type</Typography>
//               <FormControl>
//                 <RadioGroup
//                   row
//                   value={productType}
//                   onChange={(e) => {
//                     setProductType(e.target.value);
//                   }}
//                 >
//                   {PRODUCT_TYPE &&
//                     Object.entries(PRODUCT_TYPE).map((item, index) => (
//                       <FormControlLabel control={<Radio />} value={item[1]} label={item[1]} key={index} />
//                     ))}
//                 </RadioGroup>
//               </FormControl>
//             </Box>
//             <Box mt={2}>
//               <Typography mb={1}>Tags(Use commas to separate)</Typography>
//               <TextField
//                 hiddenLabel
//                 size="small"
//                 fullWidth
//                 value={tags}
//                 onChange={(e) => {
//                   setTags(e.target.value);
//                 }}
//                 placeholder="used for filtering and search (e.g. apple,nike,ai)"
//               />
//             </Box>
//             <Box mt={2}>
//               <Typography mb={1}>Description(support html)</Typography>
//               <TextField
//                 hiddenLabel
//                 size="small"
//                 fullWidth
//                 multiline
//                 minRows={4}
//                 value={description}
//                 onChange={(e) => {
//                   setDescription(e.target.value);
//                 }}
//                 placeholder="write a long description"
//               />
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>
//       <Box mt={2}>
//         <Card>
//           <CardContent>
//             <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//               <Typography variant="h6">Product option</Typography>
//               <Button
//                 variant={'contained'}
//                 color={'success'}
//                 onClick={() => {
//                   onClickUpdateProductOption();
//                 }}
//               >
//                 Update Product Option
//               </Button>
//             </Stack>
//             <Box mt={2}>
//               <Typography mb={1}>Name</Typography>
//               <TextField
//                 hiddenLabel
//                 size="small"
//                 fullWidth
//                 value={optionOne}
//                 onChange={(e) => {
//                   setOptionOne(e.target.value);
//                 }}
//               />
//             </Box>
//             <Box mt={2}>
//               <Typography mb={1}>Values(Use commas to separate)</Typography>
//               <TextField
//                 hiddenLabel
//                 size="small"
//                 fullWidth
//                 value={optionOneValue}
//                 onChange={(e) => {
//                   setOptionOneValue(e.target.value);
//                 }}
//               />
//             </Box>
//             <Box mt={2}>
//               <Typography mb={1}>Name</Typography>
//               <TextField
//                 hiddenLabel
//                 size="small"
//                 fullWidth
//                 value={optionTwo}
//                 onChange={(e) => {
//                   setOptionTwo(e.target.value);
//                 }}
//               />
//             </Box>
//             <Box mt={2}>
//               <Typography mb={1}>Values(Use commas to separate)</Typography>
//               <TextField
//                 hiddenLabel
//                 size="small"
//                 fullWidth
//                 value={optionTwoValue}
//                 onChange={(e) => {
//                   setOptionTwoValue(e.target.value);
//                 }}
//               />
//             </Box>
//             <Box mt={2}>
//               <Typography mb={1}>Name</Typography>
//               <TextField
//                 hiddenLabel
//                 size="small"
//                 fullWidth
//                 value={optionThree}
//                 onChange={(e) => {
//                   setOptionThree(e.target.value);
//                 }}
//               />
//             </Box>
//             <Box mt={2}>
//               <Typography mb={1}>Values(Use commas to separate)</Typography>
//               <TextField
//                 hiddenLabel
//                 size="small"
//                 fullWidth
//                 value={optionThreeValue}
//                 onChange={(e) => {
//                   setOptionThreeValue(e.target.value);
//                 }}
//               />
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>
//       <Box mt={2}>
//         <Card>
//           <CardContent>
//             <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//               <Stack direction={'row'} alignItems={'center'} gap={2}>
//                 <Typography variant="h6">Product image</Typography>
//                 {imageList && imageList.length > 0 && (
//                   <Button
//                     variant={'contained'}
//                     color="error"
//                     onClick={() => {
//                       setImageList([]);
//                     }}
//                   >
//                     Delete
//                   </Button>
//                 )}
//               </Stack>
//               <Button
//                 variant={'contained'}
//                 color={'success'}
//                 onClick={() => {
//                   onClickUpdateProductImage();
//                 }}
//               >
//                 Update Product Image
//               </Button>
//             </Stack>
//             <Box mt={2} style={{ border: '1px dashed #000' }}>
//               {imageList && imageList.length > 0 ? (
//                 <ImageList cols={3}>
//                   {imageList.map((item, index) => (
//                     <ImageListItem key={index}>
//                       <img srcSet={item} src={item} alt={'image'} loading="lazy" />
//                     </ImageListItem>
//                   ))}
//                 </ImageList>
//               ) : (
//                 <Button component="label" role={undefined} tabIndex={-1} fullWidth>
//                   <Box py={12} textAlign={'center'}>
//                     <VisuallyHiddenInput
//                       type="file"
//                       multiple
//                       onChange={async (event: any) => {
//                         await uploadFile(event.target.files);
//                       }}
//                     />
//                     {/* <Collections fontSize={'large'} /> */}
//                     <Typography mt={1}>Select image to upload</Typography>
//                   </Box>
//                 </Button>
//               )}
//             </Box>
//             <Box mt={2}>
//               <Typography variant="h6">File size and type</Typography>
//               <Typography>- image - max 1mb. ".jpg", ".gif" or ".png" recommended</Typography>
//               <Typography variant="h6">Resolution and aspect ratio</Typography>
//               <Typography>- image - min 100x100px. 1:1 square recommended</Typography>
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>
//     </Box>
//   );
// };

// export default Product;

import { useSnackPresistStore } from '@/lib';
import { FILE_TYPE, PRODUCT_TYPE } from '@/packages/constants';
import { useEffect, useState } from 'react';
import axios from '@/utils/http/axios';
import { Http } from '@/utils/http/http';
import { ProductImageType, ProductOptionType } from '@/utils/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ImagePlus, Trash2, Plus, Save, Settings, Layers, Image } from 'lucide-react';

type Props = {
  product_id: number;
  title?: string;
  vendor?: string;
  productType?: string;
  tags?: string;
  description?: string;
  options?: ProductOptionType[];
  images?: ProductImageType[];
  productStatus?: number;
  init: (id: any) => Promise<void>;
};

// 选项行组件
const OptionRow = ({
  index,
  name,
  value,
  onNameChange,
  onValueChange,
}: {
  index: number;
  name: string;
  value: string;
  onNameChange: (v: string) => void;
  onValueChange: (v: string) => void;
}) => (
  <div className="grid grid-cols-2 gap-3">
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs text-muted-foreground">Option {index} Name</Label>
      <Input
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder={`e.g. ${['Color', 'Size', 'Material'][index - 1]}`}
      />
    </div>
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs text-muted-foreground">Values (comma separated)</Label>
      <Input value={value} onChange={(e) => onValueChange(e.target.value)} placeholder="e.g. Red,Blue,Green" />
    </div>
  </div>
);

// 状态 Badge
const statusConfig: Record<number, { label: string; className: string }> = {
  1: { label: 'Active', className: 'bg-green-100 text-green-700 border-green-200' },
  2: { label: 'Archived', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  3: { label: 'Draft', className: 'bg-amber-100 text-amber-700 border-amber-200' },
};

const Product = (props: Props) => {
  const [title, setTitle] = useState('');
  const [vendor, setVendor] = useState('');
  const [productType, setProductType] = useState(PRODUCT_TYPE.GAMING);
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [optionOne, setOptionOne] = useState('');
  const [optionOneValue, setOptionOneValue] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [optionTwoValue, setOptionTwoValue] = useState('');
  const [optionThree, setOptionThree] = useState('');
  const [optionThreeValue, setOptionThreeValue] = useState('');
  const [imageList, setImageList] = useState<string[]>([]);
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

  useEffect(() => {
    setTitle(props.title || '');
    setVendor(props.vendor || '');
    setProductType(props.productType || '');
    setTags(props.tags || '');
    setDescription(props.description || '');
    if (props.options) {
      setOptionOne(props.options[0]?.name || '');
      setOptionOneValue(props.options[0]?.value || '');
      setOptionTwo(props.options[1]?.name || '');
      setOptionTwoValue(props.options[1]?.value || '');
      setOptionThree(props.options[2]?.name || '');
      setOptionThreeValue(props.options[2]?.value || '');
    }
    if (props.images) {
      setImageList(props.images.filter((i) => i.src).map((i) => i.src));
    }
  }, [props]);

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
        setImageList(response.data.urls);
      } else {
        showError('Upload failed');
      }
    } catch {
      showError('Network error. Please try again later.');
    } finally {
      setUploading(false);
    }
  };

  const onClickUpdateProductBase = async () => {
    if (!title) return showError('Incorrect title input');
    if (!productType) return showError('Incorrect product type');
    if (!tags) return showError('Incorrect tags input');
    if (!description) return showError('Incorrect description input');
    try {
      const response: any = await axios.put(Http.product_base, {
        product_id: props.product_id,
        title,
        body_html: description,
        product_type: productType,
        tags,
        vendor,
      });
      if (response.result) {
        await props.init(props.product_id);
        showSuccess('Updated successfully');
      } else showError('Update failed');
    } catch {
      showError('Network error. Please try again later.');
    }
  };

  const onClickUpdateProductOption = async () => {
    const productOption: ProductOptionType[] = [];
    for (const [name, value] of [
      [optionOne, optionOneValue],
      [optionTwo, optionTwoValue],
      [optionThree, optionThreeValue],
    ]) {
      if (name && value) {
        const arr = value.split(',');
        if (new Set(arr).size !== arr.length) return showError('Product option has duplicate values');
        productOption.push({ name, value });
      }
    }
    if (productOption.length === 0) return showError('At least one product option is needed');
    try {
      const response: any = await axios.put(Http.product_option, {
        product_id: props.product_id,
        options: productOption,
      });
      if (response.result) {
        await props.init(props.product_id);
        showSuccess('Updated successfully');
      } else showError('Update failed');
    } catch {
      showError('Network error. Please try again later.');
    }
  };

  const onClickUpdateProductImage = async () => {
    if (imageList.length === 0) return showError('At least one image is needed');
    try {
      const productImages: ProductImageType[] = imageList.map((src) => ({ src, width: 100, height: 100 }));
      const response: any = await axios.put(Http.product_image, {
        product_id: props.product_id,
        images: productImages,
      });
      if (response.result) {
        await props.init(props.product_id);
        showSuccess('Updated successfully');
      } else showError('Update failed');
    } catch {
      showError('Network error. Please try again later.');
    }
  };

  const onClickUpdateProductStatus = async (status: number) => {
    if (status === props.productStatus) return showError('Product is already in this status');
    try {
      const response: any = await axios.put(Http.product_base, {
        product_id: props.product_id,
        product_status: status,
      });
      if (response.result) {
        await props.init(props.product_id);
        showSuccess('Status updated');
      } else showError('Update failed');
    } catch {
      showError('Network error. Please try again later.');
    }
  };

  const currentStatus = statusConfig[props.productStatus ?? 3];

  return (
    <div className="flex flex-col gap-4 py-4">
      {/* 基本信息 */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-5">
          {/* 标题行 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-sky-50 flex items-center justify-center">
                <Settings className="h-4 w-4 text-sky-500" />
              </div>
              <h3 className="font-semibold">Base Info</h3>
            </div>
            <Button className="h-9 bg-sky-500 hover:bg-sky-600 text-white gap-1.5" onClick={onClickUpdateProductBase}>
              <Save className="h-4 w-4" /> Save
            </Button>
          </div>

          {/* 状态管理 */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full border', currentStatus.className)}>
                {currentStatus.label}
              </span>
            </div>
            <div className="flex gap-2">
              {props.productStatus !== 1 && (
                <Button
                  size="sm"
                  className="h-8 bg-green-500 hover:bg-green-600 text-white text-xs"
                  onClick={() => onClickUpdateProductStatus(1)}
                >
                  Active
                </Button>
              )}
              {props.productStatus !== 2 && (
                <Button
                  size="sm"
                  className="h-8 bg-blue-500 hover:bg-blue-600 text-white text-xs"
                  onClick={() => onClickUpdateProductStatus(2)}
                >
                  Archived
                </Button>
              )}
              {props.productStatus !== 3 && (
                <Button
                  size="sm"
                  className="h-8 bg-amber-500 hover:bg-amber-600 text-white text-xs"
                  onClick={() => onClickUpdateProductStatus(3)}
                >
                  Draft
                </Button>
              )}
            </div>
          </div>

          {/* 字段 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>
                Title <span className="text-red-500">*</span>
              </Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product title" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Vendor</Label>
              <Input value={vendor} onChange={(e) => setVendor(e.target.value)} placeholder="Vendor name" />
            </div>
          </div>

          {/* 产品类型 */}
          <div className="flex flex-col gap-1.5">
            <Label>
              Type <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(PRODUCT_TYPE).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setProductType(val as string)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm border transition-all duration-150',
                    productType === val
                      ? 'bg-sky-500 text-white border-sky-500'
                      : 'border-gray-200 text-gray-600 hover:border-sky-300 hover:text-sky-500',
                  )}
                >
                  {val as string}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <Label>
              Tags <span className="text-red-500">*</span>
            </Label>
            <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g. apple,nike,ai" />
            {tags && (
              <div className="flex flex-wrap gap-1 mt-1">
                {tags
                  .split(',')
                  .filter(Boolean)
                  .map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {tag.trim()}
                    </Badge>
                  ))}
              </div>
            )}
          </div>

          {/* 描述 */}
          <div className="flex flex-col gap-1.5">
            <Label>
              Description (supports HTML) <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a detailed description..."
              className="min-h-32 resize-y"
            />
          </div>
        </CardContent>
      </Card>

      {/* 选项 */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center">
                <Layers className="h-4 w-4 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold">Product Options</h3>
                <p className="text-xs text-muted-foreground">Color, Size, Material etc.</p>
              </div>
            </div>
            <Button className="h-9 bg-sky-500 hover:bg-sky-600 text-white gap-1.5" onClick={onClickUpdateProductOption}>
              <Save className="h-4 w-4" /> Save
            </Button>
          </div>

          <OptionRow
            index={1}
            name={optionOne}
            value={optionOneValue}
            onNameChange={setOptionOne}
            onValueChange={setOptionOneValue}
          />
          <div className="border-t border-dashed" />
          <OptionRow
            index={2}
            name={optionTwo}
            value={optionTwoValue}
            onNameChange={setOptionTwo}
            onValueChange={setOptionTwoValue}
          />
          <div className="border-t border-dashed" />
          <OptionRow
            index={3}
            name={optionThree}
            value={optionThreeValue}
            onNameChange={setOptionThree}
            onValueChange={setOptionThreeValue}
          />
        </CardContent>
      </Card>

      {/* 图片 */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-orange-50 flex items-center justify-center">
                <Image className="h-4 w-4 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold">Product Images</h3>
                <p className="text-xs text-muted-foreground">Max 1MB · JPG / PNG / GIF · Min 100×100px</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {imageList.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 text-red-500 hover:text-red-600 hover:bg-red-50 gap-1.5"
                  onClick={() => setImageList([])}
                >
                  <Trash2 className="h-4 w-4" /> Clear
                </Button>
              )}
              <Button
                className="h-9 bg-sky-500 hover:bg-sky-600 text-white gap-1.5"
                onClick={onClickUpdateProductImage}
              >
                <Save className="h-4 w-4" /> Save
              </Button>
            </div>
          </div>

          {imageList.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {imageList.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border">
                  <img src={src} alt="product" className="w-full h-full object-cover" />
                </div>
              ))}
              <label className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-sky-300 hover:bg-sky-50 transition-colors">
                <Plus className="h-6 w-6 text-gray-400" />
                <span className="text-xs text-gray-400 mt-1">Add more</span>
                <input type="file" className="sr-only" multiple onChange={(e: any) => uploadFile(e.target.files)} />
              </label>
            </div>
          ) : (
            <label
              className={cn(
                'flex flex-col items-center justify-center gap-3 py-12 rounded-xl border-2 border-dashed cursor-pointer transition-colors',
                uploading ? 'border-sky-300 bg-sky-50' : 'border-gray-200 hover:border-sky-300 hover:bg-sky-50',
              )}
            >
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <ImagePlus className="h-6 w-6 text-gray-400" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">
                  {uploading ? 'Uploading...' : 'Click to upload images'}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Support multiple files</p>
              </div>
              <input type="file" className="sr-only" multiple onChange={(e: any) => uploadFile(e.target.files)} />
            </label>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Product;
