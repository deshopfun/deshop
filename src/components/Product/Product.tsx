import { Collections } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
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
import { FILE_TYPE, PRODUCT_TYPE } from 'packages/constants';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

type Props = {
  product_id: number;
  title?: string;
  vendor?: string;
  productType?: string;
  tags?: string;
  description?: string;
  options?: ProductOption[];
  images?: ProductImage[];
  productStatus?: number;
};

type ProductImage = {
  src: string;
  width: number;
  height: number;
};

type ProductOption = {
  name: string;
  value: string;
};

const Product = (props: Props) => {
  const [title, setTitle] = useState<string>('');
  const [vendor, setVendor] = useState<string>('');
  const [productType, setProductType] = useState<string>(PRODUCT_TYPE.WOMEN);
  const [tags, setTags] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [optionOne, setOptionOne] = useState<string>('');
  const [optionOneValue, setOptionOneValue] = useState<string>('');
  const [optionTwo, setOptionTwo] = useState<string>('');
  const [optionTwoValue, setOptionTwoValue] = useState<string>('');
  const [optionThree, setOptionThree] = useState<string>('');
  const [optionThreeValue, setOptionThreeValue] = useState<string>('');
  const [imageList, setImageList] = useState<string[]>([]);

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

  useEffect(() => {
    setTitle(props.title || '');
    setVendor(props.vendor || '');
    setProductType(props.productType || '');
    setTags(props.tags || '');
    setDescription(props.description || '');
    if (props.options) {
      props.options[0] && setOptionOne(props.options[0].name || '');
      props.options[0] && setOptionOneValue(props.options[0].value || '');
      props.options[1] && setOptionTwo(props.options[1].name || '');
      props.options[1] && setOptionTwoValue(props.options[1].value || '');
      props.options[2] && setOptionThree(props.options[2].name || '');
      props.options[2] && setOptionThreeValue(props.options[2].value || '');
    }
    if (props.images) {
      let lists: string[] = [];
      props.images.forEach((item) => {
        if (item.src && item.src !== '') {
          lists.push(item.src);
        }
      });
      setImageList(lists);
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
        setImageList(response.data.urls);
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

  const onClickUpdateProduct = async () => {
  }

  const onClickUpdateStatus = async () => {
    
  }

  return (
    <Box>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="h6">Update product</Typography>
        <Button variant={'contained'} color={'success'}>
          Update Product
        </Button>
      </Stack>
      <Box mt={2}>
        <Card>
          <CardContent>
            <Typography mb={1} variant="h6">
              Base info
            </Typography>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Stack direction={'row'} alignItems={'center'} gap={2}>
                <Typography variant="h6">Product status:</Typography>
                <Chip
                  label={props.productStatus === 1 ? 'Active' : props.productStatus === 2 ? 'Archived' : 'Draft'}
                  color={props.productStatus === 1 ? 'success' : props.productStatus === 2 ? 'info' : 'warning'}
                />
              </Stack>
              <Stack direction={'row'} alignItems={'center'} gap={2}>
                {props.productStatus !== 1 && (
                  <Button variant={'contained'} color="success" onClick={() => {}}>
                    Active
                  </Button>
                )}
                {props.productStatus !== 2 && (
                  <Button variant={'contained'} color="info" onClick={() => {}}>
                    Archived
                  </Button>
                )}
                {props.productStatus !== 3 && (
                  <Button variant={'contained'} color="warning" onClick={() => {}}>
                    Draft
                  </Button>
                )}
              </Stack>
            </Stack>
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
                placeholder="title your product"
              />
            </Box>
            <Box mt={2}>
              <Typography mb={1}>Vendor</Typography>
              <TextField
                hiddenLabel
                size="small"
                fullWidth
                value={vendor}
                onChange={(e) => {
                  setVendor(e.target.value);
                }}
                placeholder="name of the product vendor"
              />
            </Box>
            <Box mt={2}>
              <Typography>Type</Typography>
              <FormControl>
                <RadioGroup
                  row
                  value={productType}
                  onChange={(e) => {
                    setProductType(e.target.value);
                  }}
                >
                  {PRODUCT_TYPE &&
                    Object.entries(PRODUCT_TYPE).map((item, index) => (
                      <FormControlLabel control={<Radio />} value={item[1]} label={item[1]} key={index} />
                    ))}
                </RadioGroup>
              </FormControl>
            </Box>
            <Box mt={2}>
              <Typography mb={1}>Tags(Use commas to separate)</Typography>
              <TextField
                hiddenLabel
                size="small"
                fullWidth
                value={tags}
                onChange={(e) => {
                  setTags(e.target.value);
                }}
                placeholder="used for filtering and search (e.g. apple,nike,ai)"
              />
            </Box>
            <Box mt={2}>
              <Typography mb={1}>Description(support html)</Typography>
              <TextField
                hiddenLabel
                size="small"
                fullWidth
                multiline
                minRows={4}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="write a long description"
              />
            </Box>
            <Box mt={2}>
              <Typography mb={1} variant="h6">
                Option(product option)
              </Typography>
              <Box>
                <Typography mb={1}>Name</Typography>
                <TextField
                  hiddenLabel
                  size="small"
                  fullWidth
                  value={optionOne}
                  onChange={(e) => {
                    setOptionOne(e.target.value);
                  }}
                />
              </Box>
              <Box mt={2}>
                <Typography mb={1}>Values(Use commas to separate)</Typography>
                <TextField
                  hiddenLabel
                  size="small"
                  fullWidth
                  value={optionOneValue}
                  onChange={(e) => {
                    setOptionOneValue(e.target.value);
                  }}
                />
              </Box>
              <Box mt={2}>
                <Typography mb={1}>Name</Typography>
                <TextField
                  hiddenLabel
                  size="small"
                  fullWidth
                  value={optionTwo}
                  onChange={(e) => {
                    setOptionTwo(e.target.value);
                  }}
                />
              </Box>
              <Box mt={2}>
                <Typography mb={1}>Values(Use commas to separate)</Typography>
                <TextField
                  hiddenLabel
                  size="small"
                  fullWidth
                  value={optionTwoValue}
                  onChange={(e) => {
                    setOptionTwoValue(e.target.value);
                  }}
                />
              </Box>
              <Box mt={2}>
                <Typography mb={1}>Name</Typography>
                <TextField
                  hiddenLabel
                  size="small"
                  fullWidth
                  value={optionThree}
                  onChange={(e) => {
                    setOptionThree(e.target.value);
                  }}
                />
              </Box>
              <Box mt={2}>
                <Typography mb={1}>Values(Use commas to separate)</Typography>
                <TextField
                  hiddenLabel
                  size="small"
                  fullWidth
                  value={optionThreeValue}
                  onChange={(e) => {
                    setOptionThreeValue(e.target.value);
                  }}
                />
              </Box>
            </Box>
            <Box mt={2}>
              <Stack direction={'row'} alignItems={'center'} gap={2}>
                <Typography variant="h6">Image</Typography>
                {imageList && imageList.length > 0 && (
                  <Button
                    variant={'contained'}
                    color="error"
                    onClick={() => {
                      setImageList([]);
                    }}
                  >
                    Delete
                  </Button>
                )}
              </Stack>
              <Box mt={2} style={{ border: '1px dashed #000' }}>
                {imageList && imageList.length > 0 ? (
                  <ImageList cols={3}>
                    {imageList.map((item, index) => (
                      <ImageListItem key={index}>
                        <img srcSet={item} src={item} alt={'image'} loading="lazy" />
                      </ImageListItem>
                    ))}
                  </ImageList>
                ) : (
                  <Button component="label" role={undefined} tabIndex={-1} fullWidth>
                    <Box py={12} textAlign={'center'}>
                      <VisuallyHiddenInput
                        type="file"
                        multiple
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
              <Stack direction={'row'} mt={2} gap={2} justifyContent={'space-between'}>
                <Box>
                  <Typography variant="h6">file size and type</Typography>
                  <Typography>- image - max 15mb. ".jpg", ".gif" or ".png" recommended</Typography>
                  <Typography>- video - max 30mb. ".mp4" recommended</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">resolution and aspect ratio</Typography>
                  <Typography>- image - min. 1000x1000px, 1:1 square recommended</Typography>
                  <Typography>- video - 16:9 or 9:16, 1080p+ recommended</Typography>
                </Box>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Product;
