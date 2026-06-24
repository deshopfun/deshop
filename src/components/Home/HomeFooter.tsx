import Link from 'next/link';
import { useRouter } from 'next/router';

const HomeFooter = () => {
  const router = useRouter();

  return (
    <div className="flex flex-row items-center p-4">
      <div className="flex-1">
        <p>© deshop.fun 2026</p>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <Link color={'textPrimary'} href="/docs/privacy-policy">
          Privacy policy
        </Link>
        <p>|</p>
        <Link color={'textPrimary'} href="/docs/terms-and-conditions">
          Terms of service
        </Link>
        <p>|</p>
        <Link color={'textPrimary'} href="/docs/fees">
          Fees
        </Link>
        <p>|</p>
        <Link color={'textPrimary'} href="#">
          Revenue
        </Link>
        <p>|</p>
        <Link color={'textPrimary'} href="https://t.me/deshop_tech_updates" target="_blank">
          Tech updates
        </Link>
      </div>
      <div className="flex-1 flex justify-end">
        {router.pathname === '/products/[id]' && router.query.id && (
          <Link className="no-underline text-right" color={'textPrimary'} href={`/report/products/${router.query.id}`}>
            Report
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomeFooter;
