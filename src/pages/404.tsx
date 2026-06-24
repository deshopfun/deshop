import MetaTags from 'components/Common/MetaTags';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SiteLogo } from 'components/Logo/SiteLogo';

const Custom404 = () => {
  return (
    <>
      <MetaTags title="Not found" />
      <div className="container mx-auto mt-20">
        <SiteLogo />

        <div className="mt-8 flex flex-row items-center">
          <p className="font-bold">404.</p>
          <p className="ml-1">That&apos;s an error.</p>
        </div>

        <div className="mt-4">
          <p>The requested URL was not found on this server. That&apos;s all we know.</p>
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

export default Custom404;
