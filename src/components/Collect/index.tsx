// import { useSnackPresistStore } from 'lib';
// import { useEffect, useState } from 'react';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';
// import { CollectType } from 'utils/types';

// const Collect = () => {
//   const [collect, setCollect] = useState<CollectType[]>([]);
//   const [collectProduct, setCollectProduct] = useState<CollectType[]>([]);
//   const [collectLive, setCollectLive] = useState<CollectType[]>([]);
//   const [collectChat, setCollectChat] = useState<CollectType[]>([]);

//   const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

//   const init = async () => {
//     try {
//       const response: any = await axios.get(Http.collect);

//       if (response.result) {
//         let products: CollectType[] = [];
//         let lives: CollectType[] = [];
//         let chats: CollectType[] = [];

//         if (response.data && response.data.length > 0) {
//           response.data.forEach((item: CollectType) => {
//             switch (item.collect_type) {
//               case 1:
//                 products.push(item);
//                 break;
//               case 2:
//                 lives.push(item);
//                 break;
//               case 3:
//                 chats.push(item);
//                 break;
//             }
//           });
//         }

//         setCollect(response.data);
//         setCollectProduct(products);
//         setCollectLive(lives);
//         setCollectChat(chats);
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

//   useEffect(() => {
//     init();
//   }, []);

//   const onClickDelete = async (collectType: number, bindId: number) => {
//     try {
//       const response: any = await axios.put(Http.collect, {
//         collect_type: collectType,
//         bind_id: bindId,
//       });

//       if (response.result) {
//         await init();
//         setSnackSeverity('success');
//         setSnackMessage('Delete successfully');
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
//     <Container>
//       <Typography variant="h5">My favorite</Typography>
//       <Box mt={4}>
//         <Typography variant="h6" mb={2}>
//           PRODUCT
//         </Typography>
//         {collectProduct && collectProduct.length > 0 ? (
//           <Grid container spacing={2}>
//             {collectProduct.map((item, index) => (
//               <Grid size={{ xs: 12, md: 4 }} key={index}>
//                 <Card>
//                   <CardContent>
//                     <Stack direction={'row'} alignItems={'start'} justifyContent={'space-between'}>
//                       <img
//                         src={item.image_srcs && item.image_srcs[0] ? item.image_srcs[0] : '/images/default_avatar.png'}
//                         alt={'image'}
//                         loading="lazy"
//                         width={100}
//                         height={100}
//                       />
//                       <IconButton
//                         onClick={() => {
//                           onClickDelete(item.collect_type, item.bind_id);
//                         }}
//                       >
//                         {/* <Delete /> */}
//                       </IconButton>
//                     </Stack>
//                     <Typography mt={1} fontWeight={'bold'}>
//                       {item.title}
//                     </Typography>
//                     <Typography mt={1}>{item.description}</Typography>
//                     <Box mt={2}>
//                       <Button
//                         variant={'contained'}
//                         fullWidth
//                         onClick={() => {
//                           window.location.href = `/products/${item.bind_id}`;
//                         }}
//                       >
//                         Checkout
//                       </Button>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Card>
//             <CardContent>
//               <Box py={2} textAlign={'center'}>
//                 <Typography variant="h6">Your collect is empty</Typography>
//                 <Typography mt={2}>Add items while you shop, so they'll be ready for checkout later.</Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         )}
//       </Box>
//       {/* <Box mt={4}>
//         <Typography variant="h6" mb={2}>
//           LIVE
//         </Typography>
//         {collectLive && collectLive.length > 0 ? (
//           <Grid container spacing={2}>
//             {collectLive.map((item, index) => (
//               <Grid size={{ xs: 12, md: 4 }} key={index}>
//                 <Card>
//                   <CardContent>
//                     <Stack direction={'row'} alignItems={'start'} justifyContent={'space-between'}>
//                       <img
//                         src={item.image_srcs && item.image_srcs[0] ? item.image_srcs[0] : '/images/default_avatar.png'}
//                         alt={'image'}
//                         loading="lazy"
//                         width={100}
//                         height={100}
//                       />
//                       <IconButton
//                         onClick={() => {
//                           onClickDelete(item.collect_type, item.bind_id);
//                         }}
//                       >
//                         <Delete />
//                       </IconButton>
//                     </Stack>
//                     <Typography mt={1} fontWeight={'bold'}>
//                       {item.title}
//                     </Typography>
//                     <Typography mt={1}>{item.description}</Typography>
//                     <Box mt={2}>
//                       <Button
//                         variant={'contained'}
//                         fullWidth
//                         onClick={() => {
//                           window.location.href = `/lives/${item.bind_id}`;
//                         }}
//                       >
//                         Checkout
//                       </Button>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Card>
//             <CardContent>
//               <Box py={2} textAlign={'center'}>
//                 <Typography variant="h6">Your collect is empty</Typography>
//                 <Typography mt={2}>Add items while you shop, so they'll be ready for checkout later.</Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         )}
//       </Box>
//       <Box mt={4}>
//         <Typography variant="h6" mb={2}>
//           CHAT
//         </Typography>
//         {collectChat && collectChat.length > 0 ? (
//           <Grid container spacing={2}>
//             {collectChat.map((item, index) => (
//               <Grid size={{ xs: 12, md: 4 }} key={index}>
//                 <Card>
//                   <CardContent>
//                     <Stack direction={'row'} alignItems={'start'} justifyContent={'space-between'}>
//                       <img
//                         src={item.image_srcs && item.image_srcs[0] ? item.image_srcs[0] : '/images/default_avatar.png'}
//                         alt={'image'}
//                         loading="lazy"
//                         width={100}
//                         height={100}
//                       />
//                       <IconButton
//                         onClick={() => {
//                           onClickDelete(item.collect_type, item.bind_id);
//                         }}
//                       >
//                         <Delete />
//                       </IconButton>
//                     </Stack>
//                     <Typography mt={1} fontWeight={'bold'}>
//                       {item.title}
//                     </Typography>
//                     <Typography mt={1}>{item.description}</Typography>
//                     <Box mt={2}>
//                       <Button
//                         variant={'contained'}
//                         fullWidth
//                         onClick={() => {
//                           window.location.href = `/chats/${item.bind_id}`;
//                         }}
//                       >
//                         Checkout
//                       </Button>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Card>
//             <CardContent>
//               <Box py={2} textAlign={'center'}>
//                 <Typography variant="h6">Your collect is empty</Typography>
//                 <Typography mt={2}>Add items while you shop, so they'll be ready for checkout later.</Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         )}
//       </Box> */}
//     </Container>
//   );
// };

// export default Collect;

import { useSnackPresistStore } from '@/lib';
import { useEffect, useState } from 'react';
import axios from '@/utils/http/axios';
import { Http } from '@/utils/http/http';
import { CollectType } from '@/utils/types';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import { Trash2, Heart, ShoppingCart } from 'lucide-react';

const Collect = () => {
  const [collect, setCollect] = useState<CollectType[]>([]);
  const [collectProduct, setCollectProduct] = useState<CollectType[]>([]);
  // const [collectLive, setCollectLive] = useState<CollectType[]>([]);
  // const [collectChat, setCollectChat] = useState<CollectType[]>([]);

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

  const init = async () => {
    try {
      const response: any = await axios.get(Http.collect);

      if (response.result) {
        const products: CollectType[] = [];
        // const lives: CollectType[] = [];
        // const chats: CollectType[] = [];

        response.data?.forEach((item: CollectType) => {
          switch (item.collect_type) {
            case 1:
              products.push(item);
              break;
            // case 2: lives.push(item); break;
            // case 3: chats.push(item); break;
          }
        });

        setCollect(response.data || []);
        setCollectProduct(products);
        // setCollectLive(lives);
        // setCollectChat(chats);
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
        setSnackMessage('Deleted successfully');
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-8 h-8 text-red-500" />
        <h1 className="text-3xl font-bold tracking-tight">My Favorites</h1>
      </div>

      {/* Products Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            Products
            <Badge variant="secondary">{collectProduct.length}</Badge>
          </h2>
        </div>

        {collectProduct.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collectProduct.map((item, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img
                      src={item.image_srcs?.[0] || '/images/default_avatar.png'}
                      alt={item.title}
                      className="w-full aspect-square object-cover"
                      loading="lazy"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => onClickDelete(item.collect_type, item.bind_id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-5 space-y-3">
                  <h3 className="font-semibold text-lg line-clamp-2">{item.title}</h3>
                  {item.description && <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>}

                  <Button
                    className="w-full mt-4"
                    onClick={() => {
                      window.location.href = `/products/${item.bind_id}`;
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    View Product
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-20 text-center">
              <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
              <h3 className="text-2xl font-semibold mb-2">No favorites yet</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Add products you love to your favorites collection.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Live & Chat sections can be uncommented and optimized similarly later */}
      {/* 
      <Separator className="my-12" />
      
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Live</h2>
        ...
      </div>
      */}
    </div>
  );
};

export default Collect;
