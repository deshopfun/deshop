import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Video, Play } from 'lucide-react'

const Live = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-red-500/10 rounded-full flex items-center justify-center">
            <Video className="w-6 h-6 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Live Streams</h1>
          <Badge variant="secondary">Coming soon</Badge>
        </div>
      </div>

      <Card className="min-h-[70vh] flex flex-col">
        <CardContent className="flex-1 flex items-center justify-center p-12">
          <div className="text-center max-w-md">
            <div className="mx-auto mb-8 flex justify-center">
              <div className="relative">
                <div className="w-28 h-28 bg-muted rounded-full flex items-center justify-center">
                  <Play className="w-14 h-14 text-muted-foreground" />
                </div>
                <Badge className="absolute -top-1 -right-1 bg-amber-500 hover:bg-amber-500 text-white px-3 py-1 text-xs font-medium">
                  SOON
                </Badge>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-3">Live streaming is coming soon</h3>
            <p className="text-muted-foreground mb-2">
              This page is a placeholder. Creator live commerce is not available yet.
            </p>
            <p className="text-sm text-muted-foreground">
              Check back later, or explore products on the home and explore pages.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Live
