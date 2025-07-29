import { Delete } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useSnackPresistStore } from 'lib';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

type CollectType = {
  bind_id: number;
  collect_type: number;
  title: string;
  description: string;
  image_srcs: string[];
};

const Collect = () => {
  const [collect, setCollect] = useState<CollectType[]>([]);
  const [collectProduct, setCollectProduct] = useState<CollectType[]>([]);
  const [collectLive, setCollectLive] = useState<CollectType[]>([]);
  const [collectChat, setCollectChat] = useState<CollectType[]>([]);

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

  const init = async () => {
    try {
      const response: any = await axios.get(Http.collect);

      if (response.result) {
        let products: CollectType[] = [];
        let lives: CollectType[] = [];
        let chats: CollectType[] = [];

        if (response.data && response.data.length > 0) {
          response.data.forEach((item: CollectType) => {
            switch (item.collect_type) {
              case 1:
                products.push(item);
                break;
              case 2:
                lives.push(item);
                break;
              case 3:
                chats.push(item);
                break;
            }
          });
        }

        setCollect(response.data);
        setCollectProduct(products);
        setCollectLive(lives);
        setCollectChat(chats);
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
    init();
  }, []);

  const onClickDelete = async (collectType: number, bindId: number) => {
    try {
      const response: any = await axios.put(Http.collect, {
        collect_type: collectType,
        bind_id: bindId,
      });

      if (response.result) {
        await init();
        setSnackSeverity('success');
        setSnackMessage('Delete successfully');
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
      <Typography variant="h5">My favorite</Typography>
      {collectProduct && collectProduct.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">PRODUCT</Typography>
          <Grid container spacing={2} mt={2}>
            {collectProduct.map((item, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card>
                  <CardContent>
                    <Stack direction={'row'} alignItems={'start'} justifyContent={'space-between'}>
                      <img
                        src={item.image_srcs && item.image_srcs[0] ? item.image_srcs[0] : '/images/default_avatar.png'}
                        alt={'image'}
                        loading="lazy"
                        width={100}
                        height={100}
                      />
                      <IconButton
                        onClick={() => {
                          onClickDelete(item.collect_type, item.bind_id);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Stack>
                    <Typography mt={1} fontWeight={'bold'}>
                      {item.title}
                    </Typography>
                    <Typography mt={1}>{item.description}</Typography>
                    <Box mt={2}>
                      <Button
                        variant={'contained'}
                        fullWidth
                        onClick={() => {
                          window.location.href = `/products/${item.bind_id}`;
                        }}
                      >
                        Checkout
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {collectLive && collectLive.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">LIVE</Typography>
          <Grid container spacing={2} mt={2}>
            {collectLive.map((item, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card>
                  <CardContent>
                    <Stack direction={'row'} alignItems={'start'} justifyContent={'space-between'}>
                      <img
                        src={item.image_srcs && item.image_srcs[0] ? item.image_srcs[0] : '/images/default_avatar.png'}
                        alt={'image'}
                        loading="lazy"
                        width={100}
                        height={100}
                      />
                      <IconButton
                        onClick={() => {
                          onClickDelete(item.collect_type, item.bind_id);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Stack>
                    <Typography mt={1} fontWeight={'bold'}>
                      {item.title}
                    </Typography>
                    <Typography mt={1}>{item.description}</Typography>
                    <Box mt={2}>
                      <Button
                        variant={'contained'}
                        fullWidth
                        onClick={() => {
                          window.location.href = `/lives/${item.bind_id}`;
                        }}
                      >
                        Checkout
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {collectChat && collectChat.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">CHAT</Typography>
          <Grid container spacing={2} mt={2}>
            {collectChat.map((item, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card>
                  <CardContent>
                    <Stack direction={'row'} alignItems={'start'} justifyContent={'space-between'}>
                      <img
                        src={item.image_srcs && item.image_srcs[0] ? item.image_srcs[0] : '/images/default_avatar.png'}
                        alt={'image'}
                        loading="lazy"
                        width={100}
                        height={100}
                      />
                      <IconButton
                        onClick={() => {
                          onClickDelete(item.collect_type, item.bind_id);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Stack>
                    <Typography mt={1} fontWeight={'bold'}>
                      {item.title}
                    </Typography>
                    <Typography mt={1}>{item.description}</Typography>
                    <Box mt={2}>
                      <Button
                        variant={'contained'}
                        fullWidth
                        onClick={() => {
                          window.location.href = `/chats/${item.bind_id}`;
                        }}
                      >
                        Checkout
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default Collect;
