// const RecentViewCard = () => {
//   return (
//     <Grid container spacing={2}>
//       <Grid size={{ xs: 12, md: 3 }}>
//         <Card>
//           <CardActionArea>
//             <CardMedia component="img" height="140" image="/images/test.png" alt="green iguana" />
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div">
//                 Lizard
//               </Typography>
//               <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                 Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
//                 continents except Antarctica
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// };

// export default RecentViewCard;

import { Card, CardContent } from '@/components/ui/card'
import { Clock } from 'lucide-react'

const items = [
  {
    image: '/images/test.png',
    title: 'Lizard',
    description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    href: '#',
  },
]

const RecentViewCard = () => {
  return (
    <div className="flex flex-col gap-4">

      {/* 标题 */}
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-muted-foreground">Recently Viewed</h3>
      </div>

      {/* 卡片网格 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item, i) => (
          <Card
            key={i}
            className="cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden group"
            onClick={() => { window.location.href = item.href }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <CardContent className="p-3 flex flex-col gap-1">
              <p className="text-sm font-semibold line-clamp-1">{item.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  )
}

export default RecentViewCard