//

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { Video, Play, Users, Plus } from 'lucide-react';

const Live = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-red-500/10 rounded-full flex items-center justify-center">
            <Video className="w-6 h-6 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Live Streams</h1>
        </div>

        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Go Live
        </Button>
      </div>

      <Card className="min-h-[70vh] flex flex-col">
        <CardContent className="flex-1 flex items-center justify-center p-12">
          <div className="text-center max-w-md">
            <div className="mx-auto mb-8 flex justify-center">
              <div className="relative">
                <div className="w-28 h-28 bg-muted rounded-full flex items-center justify-center">
                  <Play className="w-14 h-14 text-muted-foreground" />
                </div>
                <Badge className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-500 text-white px-3 py-1 text-xs font-medium">
                  LIVE
                </Badge>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-3">No live streams right now</h3>
            <p className="text-muted-foreground mb-8">
              Be the first to go live or check back later when creators start streaming.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Users className="w-5 h-5" />
                Browse Creators
              </Button>
              <Button variant="outline" size="lg">
                Upcoming Streams
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground mt-6">
        Live streaming feature is coming soon. Creators will be able to broadcast products, tutorials, and events in
        real-time.
      </p>
    </div>
  );
};

export default Live;
