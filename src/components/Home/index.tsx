import RecentViewCard from '@/components/Card/RecentViewCard';
import NowTrendingCard from '@/components/Card/NowTrendingCard';
import ExploreCard from '@/components/Card/ExploreCard';
import IntroCard from '@/components/Card/IntroCard';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="container mx-auto">
      <div>
        <IntroCard />
      </div>

      {/* <div>
        <div className="flex items-center">
          <Button variant="ghost">
            <p className="text-lg">Recently viewed</p>
            <ChevronRight />
          </Button>
        </div>

        <div className="mt-4">
          <RecentViewCard />
        </div>
      </div> */}

      <div className="mt-8">
        <div className="flex items-center">
          <p className="text-lg" color={'textPrimary'}>
            Now trending
          </p>
        </div>

        <div className="mt-4">
          <NowTrendingCard />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => {
              window.location.href = '/explore';
            }}
          >
            <p className="text-lg">Explore</p>
            <ChevronRight />
          </Button>
        </div>

        <div className="mt-4">
          <ExploreCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
