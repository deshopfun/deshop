import { useSnackPresistStore } from 'lib';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Radio,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { useEffect, useState } from 'react';
import { REPORT, REPORT_TYPE, REPORTS } from 'packages/constants';
import { ProductType } from 'utils/types';

const ReportProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<ProductType>();
  const [selectReport, setSelectReport] = useState<number>(0);
  const [details, setDetails] = useState<string>('');

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

  const init = async (id: any) => {
    try {
      if (!id) {
        setSnackSeverity('error');
        setSnackMessage('Incorrect product id');
        setSnackOpen(true);
        return;
      }

      const response: any = await axios.get(Http.product_by_id, {
        params: {
          product_id: id,
        },
      });

      if (response.result) {
        setProduct(response.data);
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

  useEffect(() => {
    if (id) {
      init(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const sendReport = async () => {
    try {
      if (!id) {
        return;
      }

      if (!selectReport) {
        setSnackSeverity('error');
        setSnackMessage('Please select one');
        setSnackOpen(true);
        return;
      }

      const response: any = await axios.post(Http.report, {
        report_type: REPORT_TYPE.PRODUCT,
        bind_id: Number(id),
        select: selectReport,
        detail: details,
      });
      if (response.result) {
        setSnackSeverity('success');
        setSnackMessage('Send successfully');
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
    <Container>
      {product ? (
        <Card>
          <CardContent>
            <Typography variant="h6">Select the reporting reason</Typography>
            <Typography variant="h6">Product: {product?.title}</Typography>
            <Box py={1}>
              <div
                onClick={() => {
                  window.location.href = `/products/${product.product_id}`;
                }}
              >
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      width={product.images[0].width}
                      height={product.images[0].height}
                      image={product.images[0].src}
                      alt="image"
                    />
                    <CardContent>
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={1}>
                        <Stack direction={'row'} alignItems={'center'} gap={1}>
                          <Typography variant="h6">{product.title}</Typography>
                          <Chip label={product.product_type} color="primary" size="small" />
                        </Stack>
                        <Typography>{product.product_type}</Typography>
                      </Stack>
                      <Stack direction={'row'} alignItems={'center'} gap={1} mt={1}>
                        {product.tags &&
                          product.tags.split(',').map((item, index) => <Chip size="small" label={item} key={index} />)}
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </Box>
            <Box>
              {REPORTS &&
                REPORTS.map((item: REPORT, index) => (
                  <Box key={index} mt={2}>
                    <Stack direction={'row'} alignItems={'center'}>
                      <Radio
                        checked={selectReport === item.id ? true : false}
                        onClick={() => {
                          setSelectReport(item.id);
                        }}
                      />
                      <Typography fontWeight={'bold'}>{item.title}</Typography>
                    </Stack>
                    <Typography>{item.content}</Typography>
                  </Box>
                ))}
            </Box>

            <Box mt={4}>
              <Typography mb={1}>More details</Typography>
              <TextField
                hiddenLabel
                size="small"
                fullWidth
                multiline
                minRows={4}
                value={details}
                onChange={(e) => {
                  setDetails(e.target.value);
                }}
              />
              <Box mt={1}>
                <Button
                  fullWidth
                  color={'error'}
                  variant={'contained'}
                  onClick={() => {
                    sendReport();
                  }}
                >
                  Send Report
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <Box py={2} textAlign={'center'}>
              <Typography variant="h6">something wrong</Typography>
              <Typography mt={2}>No information was found about this page.</Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ReportProductDetails;
