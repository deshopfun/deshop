import MetaTags from 'components/Common/MetaTags';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SiteLogo } from 'components/Logo/SiteLogo';

const Custom500 = () => {
  return (
    <>
      <MetaTags title="Something wrong" />
      <div className="container mx-auto mt-20">
        <SiteLogo />

        <div className="mt-8 flex flex-row items-center">
          <p className="font-bold">500.</p>
          <p className="ml-1">That&apos;s an error.</p>
        </div>

        <div className="mt-4">
          <p>There was an error. Please try again later. That&apos;s all we know.</p>
        </div>

        <Button className="mt-8 bg-sky-500" size="lg">
          <Link href="/" className="text-lg">
            Go Home
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Custom500;
