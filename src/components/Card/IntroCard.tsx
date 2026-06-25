import { useSnackPresistStore } from '@/lib';
import { CURRENCYS } from '@/packages/constants/currency';
import { useEffect, useState } from 'react';
import axios from '@/utils/http/axios';
import { Http } from '@/utils/http/http';
import { StatType } from '@/utils/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SiteLogo } from '@/components/Logo/SiteLogo';
import { ArrowRight, ShoppingBag, BarChart3, RefreshCw, Package, Layers } from 'lucide-react';

const IntroCard = () => {
  const [stats, setStats] = useState<StatType>();

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

  const init = async () => {
    try {
      const response: any = await axios.get(Http.home_stat);

      if (response.result) {
        setStats(response.data);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later');
      setSnackOpen(true);
      console.error(e);
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statItems = [
    { icon: ShoppingBag, label: 'Order Number', value: stats?.order_number },
    {
      icon: BarChart3,
      label: 'Trading Volume',
      value: `${CURRENCYS.find((c) => c.name === stats?.currency)?.code}${stats?.trading_volume}`,
    },
    { icon: RefreshCw, label: 'Transaction Number', value: stats?.transaction_number },
    { icon: Package, label: 'Product Number', value: stats?.product_number },
    { icon: Layers, label: 'Product Variants', value: stats?.variant_number },
  ];

  return (
    <div className="container mx-auto py-8 flex flex-col gap-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-sky-400 text-white p-10 text-center shadow-lg">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/4 translate-y-1/4" />

        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div
              className="
          w-9 h-9 rounded-lg flex items-center justify-center
          bg-gradient-to-br from-blue-600 to-sky-400
          shadow-md shadow-sky-200
          text-white text-xl font-bold
          select-none
        "
            >
              D
            </div>
            <span className="text-white/80 text-sm">Decentralized Digital Exchange Platform</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight max-w-xl">List, Sell & Earn with Crypto</h1>

          <p className="text-white/80 max-w-lg text-sm leading-relaxed">
            Deshop allows anyone to list their products and conduct online transactions using cryptocurrency. Trading is
            completely free — keep 100% of your profits.
          </p>

          <Button
            onClick={() => {
              window.location.href = '/create';
            }}
            className="mt-2 bg-white text-blue-600 hover:bg-white/90 font-semibold px-8 h-11 gap-2"
          >
            Go to Create Product
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statItems.map((item, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 flex flex-col items-center gap-2 text-center">
              <div className="h-10 w-10 rounded-full bg-sky-50 flex items-center justify-center">
                <item.icon className="h-5 w-5 text-sky-500" />
              </div>
              <p className="text-2xl font-bold text-sky-500">{item.value ?? '—'}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IntroCard;
