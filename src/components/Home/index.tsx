import RecentView from '@/components/Home/RecentView'
import AllMarket from '@/components/Home/AllMarket'
import Intro from '@/components/Home/Intro'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

const Home = () => {
  return (
    <div className="container mx-auto">
      <div>
        <Intro />
      </div>

      {/* <div>
        <div className="flex items-center">
          <Button variant="ghost">
            <p className="text-lg">Recently viewed</p>
            <ChevronRight />
          </Button>
        </div>

        <div className="mt-4">
          <RecentView />
        </div>
      </div> */}

      <div className="mt-8">
        <div className="flex items-center">
          <p className="text-2xl font-bold" color={'textPrimary'}>
            All markets
          </p>
        </div>

        <div className="mt-4">
          <AllMarket />
        </div>
      </div>

      {/* <div className="mt-8">
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
          <ExploreProduct />
        </div>
      </div> */}
    </div>
  )
}

export default Home
