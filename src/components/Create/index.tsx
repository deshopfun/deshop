import { Collections } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { PRODUCT_TYPE } from 'packages/constants';
import { useState } from 'react';

const Create = () => {
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

  const uploadFile = async (data: any) => {
    try {
      if (!data || data.length !== 1) {
        return;
      }

      const formData = new FormData();
      formData.append('file', data[0]);
    } catch (e) {}
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
                <Typography variant="h6">Image</Typography>
                <Box mt={2} style={{ border: '1px dashed #000' }}>
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
              </CardContent>
            </Card>
          </Box>

          <Box my={2}>
            <Button variant={'contained'} color={'success'}>
              Create Product
            </Button>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6">Preview</Typography>
          <Box mt={1}>
            <Card>
              <CardContent>
                <Typography py={20}>a preview of how the product will look like</Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Create;
