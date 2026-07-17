import { RatingType } from '@/utils/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Calendar } from 'lucide-react'
import { Http } from '@/utils/http/http'
import { GetAbosolutePathByRelative } from '@/utils/image'

type DialogType = {
  ratings: RatingType[]
  openDialog: boolean
  handleCloseDialog: () => Promise<void>
}

export default function OrderRatingDialog({ ratings, openDialog, handleCloseDialog }: DialogType) {
  const handleClose = async () => {
    await handleCloseDialog()
  }

  return (
    <Dialog open={openDialog} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Product Ratings
            <Badge variant="secondary">{ratings?.length || 0}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto space-y-6 p-2">
          {ratings && ratings.length > 0 ? (
            ratings.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < (item.number || 0)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <Badge variant="outline">{item.number}/5</Badge>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(item.create_time).toLocaleDateString()}
                    </div>
                  </div>

                  {item.product_option && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.product_option.split(',').map((option, i) => (
                        <Badge key={i} variant="secondary">
                          {option.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <p className="text-sm leading-relaxed text-foreground">{item.body}</p>

                  {item.image && (
                    <img
                      src={GetAbosolutePathByRelative(item.image)}
                      alt="Review photo"
                      className="max-w-[180px] rounded-lg border mt-2"
                      loading="lazy"
                    />
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-16 text-center">
                <p className="text-muted-foreground">No ratings yet</p>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button onClick={handleClose} variant="outline" className="w-full">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
