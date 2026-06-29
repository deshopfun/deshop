// import { useSnackPresistStore, useUserPresistStore } from 'lib';
// import { FILE_TYPE, PRODUCT_TYPE } from 'packages/constants';
// import { useState } from 'react';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';
// import { ProductImageType, ProductOptionType } from 'utils/types';

// const Create = () => {
//   const [title, setTitle] = useState<string>('');
//   const [vendor, setVendor] = useState<string>('');
//   const [productType, setProductType] = useState<string>(PRODUCT_TYPE.GAMING);
//   const [tags, setTags] = useState<string>('');
//   const [currency, setCurrency] = useState<string>('');
//   const [description, setDescription] = useState<string>('');
//   const [optionOne, setOptionOne] = useState<string>('');
//   const [optionOneValue, setOptionOneValue] = useState<string>('');
//   const [optionTwo, setOptionTwo] = useState<string>('');
//   const [optionTwoValue, setOptionTwoValue] = useState<string>('');
//   const [optionThree, setOptionThree] = useState<string>('');
//   const [optionThreeValue, setOptionThreeValue] = useState<string>('');
//   const [imageList, setImageList] = useState<string[]>([]);

//   const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);
//   const { getIsLogin } = useUserPresistStore((state) => state);

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

//   const onClickCreateProduct = async () => {
//     try {
//       if (!getIsLogin()) {
//         setSnackSeverity('error');
//         setSnackMessage('Need login');
//         setSnackOpen(true);
//         return;
//       }

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

//       const response: any = await axios.post(Http.product, {
//         title: title,
//         body_html: description,
//         product_type: productType,
//         tags: tags,
//         vendor: vendor,
//         images: productImages,
//         options: productOption,
//       });

//       if (response.result) {
//         setSnackSeverity('success');
//         setSnackMessage('Create successfully');
//         setSnackOpen(true);

//         window.location.href = `/products/${response.data.product_id}`;
//       } else {
//         setSnackSeverity('error');
//         setSnackMessage(response.message);
//         setSnackOpen(true);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   return (
//     <Container>
//       <Grid container spacing={8}>
//         <Grid size={{ xs: 12, md: 8 }}>
//           <Typography variant="h6">Create new product</Typography>

//           <Box mt={2}>
//             <Typography variant="h6">Product details</Typography>
//             <Typography>Don't worry, you can also modify it after the product is created</Typography>
//           </Box>

//           <Box mt={2}>
//             <Card>
//               <CardContent>
//                 <Stack direction={'row'} alignItems={'baseline'} gap={2}>
//                   <Box width={'100%'}>
//                     <Typography mb={1}>Title</Typography>
//                     <TextField
//                       hiddenLabel
//                       size="small"
//                       fullWidth
//                       value={title}
//                       onChange={(e) => {
//                         setTitle(e.target.value);
//                       }}
//                       placeholder="title your product"
//                     />
//                   </Box>
//                   <Box width={'100%'}>
//                     <Typography mb={1}>Vendor</Typography>
//                     <TextField
//                       hiddenLabel
//                       size="small"
//                       fullWidth
//                       value={vendor}
//                       onChange={(e) => {
//                         setVendor(e.target.value);
//                       }}
//                       placeholder="name of the product vendor"
//                     />
//                   </Box>
//                 </Stack>
//                 <Box mt={2}>
//                   <Typography>Type</Typography>
//                   <FormControl>
//                     <RadioGroup
//                       row
//                       value={productType}
//                       onChange={(e) => {
//                         setProductType(e.target.value);
//                       }}
//                     >
//                       {PRODUCT_TYPE &&
//                         Object.entries(PRODUCT_TYPE).map((item, index) => (
//                           <FormControlLabel control={<Radio />} value={item[1]} label={item[1]} key={index} />
//                         ))}
//                     </RadioGroup>
//                   </FormControl>
//                 </Box>
//                 <Box mt={2}>
//                   <Typography mb={1}>Tags(Use commas to separate)</Typography>
//                   <TextField
//                     hiddenLabel
//                     size="small"
//                     fullWidth
//                     value={tags}
//                     onChange={(e) => {
//                       setTags(e.target.value);
//                     }}
//                     placeholder="used for filtering and search (e.g. apple,nike,ai)"
//                   />
//                 </Box>
//                 <Box mt={2}>
//                   <Typography mb={1}>Description(support html)</Typography>
//                   <TextField
//                     hiddenLabel
//                     size="small"
//                     fullWidth
//                     multiline
//                     minRows={4}
//                     value={description}
//                     onChange={(e) => {
//                       setDescription(e.target.value);
//                     }}
//                     placeholder="write a long description"
//                   />
//                 </Box>
//               </CardContent>
//             </Card>
//           </Box>
//           <Box mt={2}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">Option(product option)</Typography>
//                 <Box mt={2}>
//                   <Typography mb={1}>Name</Typography>
//                   <TextField
//                     hiddenLabel
//                     size="small"
//                     fullWidth
//                     value={optionOne}
//                     onChange={(e) => {
//                       setOptionOne(e.target.value);
//                     }}
//                   />
//                 </Box>
//                 <Box mt={2}>
//                   <Typography mb={1}>Values(Use commas to separate)</Typography>
//                   <TextField
//                     hiddenLabel
//                     size="small"
//                     fullWidth
//                     value={optionOneValue}
//                     onChange={(e) => {
//                       setOptionOneValue(e.target.value);
//                     }}
//                   />
//                 </Box>
//                 <Box mt={2}>
//                   <Typography mb={1}>Name</Typography>
//                   <TextField
//                     hiddenLabel
//                     size="small"
//                     fullWidth
//                     value={optionTwo}
//                     onChange={(e) => {
//                       setOptionTwo(e.target.value);
//                     }}
//                   />
//                 </Box>
//                 <Box mt={2}>
//                   <Typography mb={1}>Values(Use commas to separate)</Typography>
//                   <TextField
//                     hiddenLabel
//                     size="small"
//                     fullWidth
//                     value={optionTwoValue}
//                     onChange={(e) => {
//                       setOptionTwoValue(e.target.value);
//                     }}
//                   />
//                 </Box>
//                 <Box mt={2}>
//                   <Typography mb={1}>Name</Typography>
//                   <TextField
//                     hiddenLabel
//                     size="small"
//                     fullWidth
//                     value={optionThree}
//                     onChange={(e) => {
//                       setOptionThree(e.target.value);
//                     }}
//                   />
//                 </Box>
//                 <Box mt={2}>
//                   <Typography mb={1}>Values(Use commas to separate)</Typography>
//                   <TextField
//                     hiddenLabel
//                     size="small"
//                     fullWidth
//                     value={optionThreeValue}
//                     onChange={(e) => {
//                       setOptionThreeValue(e.target.value);
//                     }}
//                   />
//                 </Box>
//               </CardContent>
//             </Card>
//           </Box>

//           <Box mt={2}>
//             <Card>
//               <CardContent>
//                 <Stack direction={'row'} alignItems={'center'} gap={2}>
//                   <Typography variant="h6">Image</Typography>
//                   {imageList && imageList.length > 0 && (
//                     <Button
//                       variant={'contained'}
//                       color="error"
//                       onClick={() => {
//                         setImageList([]);
//                       }}
//                     >
//                       Delete
//                     </Button>
//                   )}
//                 </Stack>
//                 <Box mt={2} style={{ border: '1px dashed #000' }}>
//                   {imageList && imageList.length > 0 ? (
//                     <ImageList cols={3}>
//                       {imageList.map((item, index) => (
//                         <ImageListItem key={index}>
//                           <img srcSet={item} src={item} alt={'image'} loading="lazy" />
//                         </ImageListItem>
//                       ))}
//                     </ImageList>
//                   ) : (
//                     <Button component="label" role={undefined} tabIndex={-1} fullWidth>
//                       <Box py={12} textAlign={'center'}>
//                         <VisuallyHiddenInput
//                           type="file"
//                           multiple
//                           onChange={async (event: any) => {
//                             await uploadFile(event.target.files);
//                           }}
//                         />
//                         <Collections fontSize={'large'} />
//                         <Typography mt={1}>Select image to upload</Typography>
//                         {/* <Typography>or drag or drop it here</Typography> */}
//                       </Box>
//                     </Button>
//                   )}
//                 </Box>
//                 <Box mt={2}>
//                   <Typography variant="h6">File size and type</Typography>
//                   <Typography>- image - max 1mb. ".jpg", ".gif" or ".png" recommended</Typography>
//                   <Typography variant="h6">Resolution and aspect ratio</Typography>
//                   <Typography>- image - min 100x100px. 1:1 square recommended</Typography>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Box>

//           <Box my={2}>
//             <Button variant={'contained'} color={'success'} onClick={onClickCreateProduct}>
//               Create Product
//             </Button>
//           </Box>
//         </Grid>
//         <Grid size={{ xs: 12, md: 4 }}>
//           <Typography variant="h6">Preview</Typography>
//           <Box mt={1}>
//             <Card>
//               <CardContent>
//                 {imageList && imageList.length > 0 ? (
//                   <Box>
//                     <img
//                       srcSet={imageList[0]}
//                       src={imageList[0]}
//                       alt={'image'}
//                       loading="lazy"
//                       width={100}
//                       height={100}
//                     />
//                     <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1} gap={1}>
//                       <Stack direction={'row'} alignItems={'center'} gap={1}>
//                         <Typography variant="h6">{title}</Typography>
//                         <Chip label={productType} color="primary" size="small" />
//                       </Stack>
//                       <Typography>{vendor}</Typography>
//                     </Stack>
//                     <Stack direction={'row'} alignItems={'center'} gap={1} mt={1}>
//                       {tags && tags.split(',').map((item, index) => <Chip size="small" label={item} key={index} />)}
//                     </Stack>
//                     <Box mt={2} dangerouslySetInnerHTML={{ __html: description }}></Box>
//                   </Box>
//                 ) : (
//                   <Typography py={20}>A preview of how the product will look like</Typography>
//                 )}
//               </CardContent>
//             </Card>
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default Create;
import { useSnackPresistStore, useUserPresistStore } from '@/lib'
import { FILE_TYPE, PRODUCT_TYPE } from '@/packages/constants'
import { useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { ProductImageType, ProductOptionType } from '@/utils/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ImagePlus, Trash2, Plus, PackagePlus } from 'lucide-react'

// 选项行组件
const OptionRow = ({
  index,
  name,
  value,
  onNameChange,
  onValueChange,
}: {
  index: number
  name: string
  value: string
  onNameChange: (v: string) => void
  onValueChange: (v: string) => void
}) => (
  <div className="grid grid-cols-2 gap-3">
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs text-muted-foreground">
        Option {index} Name {index === 1 && <span className="text-red-500">*</span>}
      </Label>
      <Input
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder={`e.g. ${['Color', 'Size', 'Material'][index - 1]}`}
      />
    </div>
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs text-muted-foreground">
        Values (comma separated) {index === 1 && <span className="text-red-500">*</span>}
      </Label>
      <Input
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder="e.g. Red,Blue,Green"
      />
    </div>
  </div>
)

const Create = () => {
  const [title, setTitle] = useState('')
  const [vendor, setVendor] = useState('')
  const [productType, setProductType] = useState<string>(PRODUCT_TYPE.OPENSOURCE)
  const [tags, setTags] = useState('')
  const [description, setDescription] = useState('')
  const [optionOne, setOptionOne] = useState('')
  const [optionOneValue, setOptionOneValue] = useState('')
  const [optionTwo, setOptionTwo] = useState('')
  const [optionTwoValue, setOptionTwoValue] = useState('')
  const [optionThree, setOptionThree] = useState('')
  const [optionThreeValue, setOptionThreeValue] = useState('')
  const [imageList, setImageList] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state)
  const { getIsLogin } = useUserPresistStore((state) => state)

  const showError = (msg: string) => {
    setSnackSeverity('error')
    setSnackMessage(msg)
    setSnackOpen(true)
  }

  const uploadFile = async (files: FileList) => {
    if (!files.length) return showError('Not found the file')
    setUploading(true)
    try {
      const formData = new FormData()
      Array.from(files).forEach((file) => formData.append('files', file))
      const response: any = await axios.post(Http.upload_file, formData, {
        params: { file_type: FILE_TYPE.Image },
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (response.result && response.data.urls.length > 0) {
        setImageList(response.data.urls)
      } else {
        showError('Upload Failed')
      }
    } catch (e) {
      showError('Network error. Please try again later.')
    } finally {
      setUploading(false)
    }
  }

  const onClickCreateProduct = async () => {
    if (!getIsLogin()) return showError('Need login')
    if (!title) return showError('Incorrect title input')
    if (!productType) return showError('Incorrect product type')
    if (!tags) return showError('Incorrect tags input')
    if (!description) return showError('Incorrect description input')

    const productOption: ProductOptionType[] = []
    for (const [name, value] of [
      [optionOne, optionOneValue],
      [optionTwo, optionTwoValue],
      [optionThree, optionThreeValue],
    ]) {
      if (name && value) {
        const arr = value.split(',')
        if (new Set(arr).size !== arr.length)
          return showError('Product option has duplicate values')
        productOption.push({ name, value })
      }
    }
    if (productOption.length === 0) return showError('At least one product option is needed')
    if (imageList.length === 0) return showError('At least one image is needed')

    try {
      const productImages: ProductImageType[] = imageList.map((src) => ({
        src,
        width: 100,
        height: 100,
      }))
      const response: any = await axios.post(Http.product, {
        title,
        body_html: description,
        product_type: productType,
        tags,
        vendor,
        images: productImages,
        options: productOption,
      })
      if (response.result) {
        setSnackSeverity('success')
        setSnackMessage('Create successfully')
        setSnackOpen(true)
        window.location.href = `/products/${response.data.product_id}`
      } else {
        showError(response.message)
      }
    } catch (e) {
      showError('Network error. Please try again later.')
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 rounded-xl bg-sky-50 flex items-center justify-center">
          <PackagePlus className="h-5 w-5 text-sky-500" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Create New Product</h1>
          <p className="text-sm text-muted-foreground">
            You can modify it after the product is created
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧表单 */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* 基本信息 */}
          <Card>
            <CardContent className="p-6 flex flex-col gap-4">
              <h2 className="font-semibold text-base">Product Details</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label>
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title your product"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Vendor</Label>
                  <Input
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    placeholder="Product vendor name"
                  />
                </div>
              </div>

              {/* 产品类型 */}
              <div className="flex flex-col gap-1.5">
                <Label>
                  Type <span className="text-red-500">*</span>
                </Label>
                <div className="flex flex-wrap gap-2">
                  {PRODUCT_TYPE &&
                    Object.entries(PRODUCT_TYPE).map(([key, val]) => (
                      <button
                        key={key}
                        onClick={() => setProductType(val as string)}
                        className={cn(
                          'px-3 py-1.5 rounded-full text-sm border transition-all duration-150',
                          productType === val
                            ? 'bg-sky-500 text-white border-sky-500'
                            : 'border-gray-200 text-gray-600 hover:border-sky-300 hover:text-sky-500'
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
                <Input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Separate with commas: apple,nike,ai"
                />
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
          <Card>
            <CardContent className="p-6 flex flex-col gap-4">
              <div>
                <h2 className="font-semibold text-base">Product Options</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Add up to 3 options like Color, Size, Material
                </p>
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

          {/* 图片上传 */}
          <Card>
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-base">
                    Product Images <span className="text-red-500">*</span>
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Max 1MB · JPG / PNG / GIF · Min 100×100px
                  </p>
                </div>
                {imageList.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 gap-1"
                    onClick={() => setImageList([])}
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear
                  </Button>
                )}
              </div>

              {imageList.length > 0 ? (
                <div className="grid grid-cols-3 gap-3">
                  {imageList.map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-xl overflow-hidden border"
                    >
                      <img src={src} alt="product" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {/* 继续添加 */}
                  <label className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-sky-300 hover:bg-sky-50 transition-colors">
                    <Plus className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-400 mt-1">Add more</span>
                    <input
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={(e: any) => uploadFile(e.target.files)}
                    />
                  </label>
                </div>
              ) : (
                <label
                  className={cn(
                    'flex flex-col items-center justify-center gap-3 py-16 rounded-xl border-2 border-dashed cursor-pointer transition-colors',
                    uploading
                      ? 'border-sky-300 bg-sky-50'
                      : 'border-gray-200 hover:border-sky-300 hover:bg-sky-50'
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
                  <input
                    type="file"
                    className="sr-only"
                    multiple
                    onChange={(e: any) => uploadFile(e.target.files)}
                  />
                </label>
              )}
            </CardContent>
          </Card>

          {/* 提交按钮 */}
          <Button
            className="h-12 text-base bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2"
            onClick={onClickCreateProduct}
          >
            <PackagePlus className="h-5 w-5" />
            Create Product
          </Button>
        </div>

        {/* 右侧预览 */}
        <div className="flex flex-col gap-4">
          <div className="sticky top-24">
            <h2 className="font-semibold text-base mb-3">Preview</h2>
            <Card className="overflow-hidden">
              {imageList.length > 0 ? (
                <>
                  <img src={imageList[0]} alt="preview" className="w-full h-56 object-cover" />
                  <CardContent className="p-4 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-base line-clamp-2">{title || 'Product Title'}</p>
                      <Badge className="bg-sky-500 shrink-0">{productType}</Badge>
                    </div>
                    {vendor && <p className="text-sm text-muted-foreground">{vendor}</p>}
                    {tags && (
                      <div className="flex flex-wrap gap-1">
                        {tags
                          .split(',')
                          .filter(Boolean)
                          .map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tag.trim()}
                            </Badge>
                          ))}
                      </div>
                    )}
                    {description && (
                      <div
                        className="text-sm text-muted-foreground line-clamp-4 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: description }}
                      />
                    )}
                  </CardContent>
                </>
              ) : (
                <CardContent className="p-8 flex flex-col items-center justify-center gap-3 text-center min-h-64">
                  <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <ImagePlus className="h-8 w-8 text-gray-300" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    A preview of how your product will look
                  </p>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create
