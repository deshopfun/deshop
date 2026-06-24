import { PRODUCT_TYPE } from 'packages/constants';
import { GetImgSrcByProductType } from 'utils/image';
import { Card, CardContent } from '@/components/ui/card';

const ExploreCard = () => {
  return (
    <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {PRODUCT_TYPE &&
        Object.entries(PRODUCT_TYPE).map((item, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden"
            onClick={() => {
              window.location.href = `/explore?type=${item[0]}`;
            }}
          >
            <img src={GetImgSrcByProductType(item[1])} alt={item[1]} className="w-full h-32 object-cover" />
            <CardContent className="p-2">
              <p className="text-center text-sm font-medium truncate">{item[1]}</p>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default ExploreCard;
