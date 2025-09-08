import { Collections } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
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
import { useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { ProductImageType, ProductOptionType } from 'utils/types';

const Create = () => {
  const [title, setTitle] = useState<string>('');
  const [vendor, setVendor] = useState<string>('');
  const [productType, setProductType] = useState<string>(PRODUCT_TYPE.WOMEN);
  const [tags, setTags] = useState<string>('');
  const [currency, setCurrency] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [optionOne, setOptionOne] = useState<string>('');
  const [optionOneValue, setOptionOneValue] = useState<string>('');
  const [optionTwo, setOptionTwo] = useState<string>('');
  const [optionTwoValue, setOptionTwoValue] = useState<string>('');
  const [optionThree, setOptionThree] = useState<string>('');
  const [optionThreeValue, setOptionThreeValue] = useState<string>('');
  const [imageList, setImageList] = useState<string[]>([]);

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

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

  const onClickCreateProduct = async () => {
    try {
      if (!title || title === '') {
        setSnackSeverity('error');
        setSnackMessage('Incorrect title input');
        setSnackOpen(true);
        return;
      }

      if (!productType || productType === '') {
        setSnackSeverity('error');
        setSnackMessage('Incorrect product type');
        setSnackOpen(true);
        return;
      }

      if (!tags || tags === '') {
        setSnackSeverity('error');
        setSnackMessage('Incorrect tags input');
        setSnackOpen(true);
        return;
      }

      if (!description || description === '') {
        setSnackSeverity('error');
        setSnackMessage('Incorrect description input');
        setSnackOpen(true);
        return;
      }

      const productOption: ProductOptionType[] = [];
      if (optionOne && optionOneValue && optionOne != '' && optionOneValue != '') {
        productOption.push({
          name: optionOne,
          value: optionOneValue,
        });
      }
      if (optionTwo && optionTwoValue && optionTwo != '' && optionTwoValue != '') {
        productOption.push({
          name: optionTwo,
          value: optionTwoValue,
        });
      }
      if (optionThree && optionThreeValue && optionThree != '' && optionThreeValue != '') {
        productOption.push({
          name: optionThree,
          value: optionThreeValue,
        });
      }

      if (productOption.length <= 0) {
        setSnackSeverity('error');
        setSnackMessage('At least one product option is needed');
        setSnackOpen(true);
        return;
      }

      const productImages: ProductImageType[] = [];
      if (imageList && imageList.length > 0) {
        imageList.forEach((item) => {
          productImages.push({
            src: item,
            width: 100,
            height: 100,
          });
        });
      }

      if (productImages.length <= 0) {
        setSnackSeverity('error');
        setSnackMessage('At least one image is needed');
        setSnackOpen(true);
        return;
      }

      const response: any = await axios.post(Http.product, {
        title: title,
        body_html: description,
        product_type: productType,
        tags: tags,
        vendor: vendor,
        images: productImages,
        options: productOption,
      });

      if (response.result) {
        setSnackSeverity('success');
        setSnackMessage('Create successfully');
        setSnackOpen(true);

        window.location.href = `/products/${response.data.product_id}`;
      } else {
        setSnackSeverity('error');
        setSnackMessage(response.message);
        setSnackOpen(true);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later');
      setSnackOpen(true);
      console.error(e);
    }
  };

  return (
    <Container>
      <Grid container spacing={8}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h6">Create new product</Typography>

          <Box mt={2}>
            <Typography variant="h6">Product details</Typography>
            <Typography>Don't worry, you can also modify it after the product is created</Typography>
          </Box>

          <Box mt={2}>
            <Card>
              <CardContent>
                <Stack direction={'row'} alignItems={'baseline'} gap={2}>
                  <Box width={'100%'}>
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
                  <Box width={'100%'}>
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
                </Stack>
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
              </CardContent>
            </Card>
          </Box>
          <Box mt={2}>
            <Card>
              <CardContent>
                <Typography variant="h6">Option(product option)</Typography>
                <Box mt={2}>
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
              </CardContent>
            </Card>
          </Box>

          <Box mt={2}>
            <Card>
              <CardContent>
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
                        <Typography mt={1}>Select image to upload</Typography>
                        {/* <Typography>or drag or drop it here</Typography> */}
                      </Box>
                    </Button>
                  )}
                </Box>
                <Box mt={2}>
                  <Typography variant="h6">File size and type</Typography>
                  <Typography>- image - max 15mb. ".jpg", ".gif" or ".png" recommended</Typography>
                  <Typography variant="h6">Resolution and aspect ratio</Typography>
                  <Typography>- image - min 100x100px. 1:1 square recommended</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box my={2}>
            <Button variant={'contained'} color={'success'} onClick={onClickCreateProduct}>
              Create Product
            </Button>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6">Preview</Typography>
          <Box mt={1}>
            <Card>
              <CardContent>
                {imageList && imageList.length > 0 ? (
                  <Box>
                    <img
                      srcSet={imageList[0]}
                      src={imageList[0]}
                      alt={'image'}
                      loading="lazy"
                      width={100}
                      height={100}
                    />
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1} gap={1}>
                      <Stack direction={'row'} alignItems={'center'} gap={1}>
                        <Typography variant="h6">{title}</Typography>
                        <Chip label={productType} color="primary" size="small" />
                      </Stack>
                      <Typography>{vendor}</Typography>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} gap={1} mt={1}>
                      {tags && tags.split(',').map((item, index) => <Chip size="small" label={item} key={index} />)}
                    </Stack>
                    <Box mt={2} dangerouslySetInnerHTML={{ __html: description }}></Box>
                  </Box>
                ) : (
                  <Typography py={20}>a preview of how the product will look like</Typography>
                )}
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Create;
