import AllMarket from '@/components/Home/AllMarket'
import Intro from '@/components/Home/Intro'

const Home = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto">
      <Intro />

      <div className="mt-4 px-0 sm:px-0">
        <div className="flex items-center">
          <p className="text-xl sm:text-2xl font-bold">All markets</p>
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
              void router.push('/explore');
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
