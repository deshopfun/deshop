import { useSnackPresistStore } from '@/lib'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { REPORTS, REPORT_TYPE } from '@/packages/constants'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

import { AlertTriangle, Send } from 'lucide-react'
import { GetAbosolutePathByRelative } from '@/utils/image'
import RemoteImage from '@/components/Image/RemoteImage'
import { useShallow } from 'zustand/react/shallow'
import { useReportProduct, useSubmitReport } from '@/hooks/queries/useReport'

const ReportProductDetails = () => {
  const router = useRouter()
  const id = typeof router.query.id === 'string' ? router.query.id : ''

  const [selectReport, setSelectReport] = useState<string>('')
  const [details, setDetails] = useState<string>('')
  const productQuery = useReportProduct(id, router.isReady && !!id)
  const submitReport = useSubmitReport()
  const product = productQuery.data

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      setSnackSeverity: state.setSnackSeverity,
      setSnackMessage: state.setSnackMessage,
      setSnackOpen: state.setSnackOpen,
    }))
  )

  useEffect(() => {
    if (productQuery.isError) {
      setSnackSeverity('error')
      setSnackMessage(
        (productQuery.error as Error)?.message || 'Network error occurred. Please try again later.'
      )
      setSnackOpen(true)
    }
  }, [productQuery.isError, productQuery.error, setSnackSeverity, setSnackMessage, setSnackOpen])

  const sendReport = async () => {
    try {
      if (!id) return
      if (!selectReport) {
        setSnackSeverity('error')
        setSnackMessage('Please select a reason')
        setSnackOpen(true)
        return
      }

      await submitReport.mutateAsync({
        report_type: REPORT_TYPE.PRODUCT,
        bind_id: Number(id),
        select: selectReport,
        detail: details,
      })
      setSnackSeverity('success')
      setSnackMessage('Report submitted successfully')
      setSnackOpen(true)
      setTimeout(() => router.back(), 1500)
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage(e instanceof Error ? e.message : 'Network error occurred')
      setSnackOpen(true)
      console.error(e)
    }
  }

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <p className="text-muted-foreground">Loading product information...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <AlertTriangle className="w-8 h-8 text-red-500" />
        <h1 className="text-3xl font-bold tracking-tight">Report Product</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="flex gap-4 cursor-pointer hover:bg-muted/50 p-3 rounded-xl transition-colors"
            onClick={() => void router.push(`/products/${product.product_id}`)}
          >
            <div className="relative w-24 h-24 rounded-lg border overflow-hidden shrink-0 bg-muted">
              <RemoteImage
                src={GetAbosolutePathByRelative(product.images?.[0]?.src)}
                alt={product.title}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <Badge variant="secondary" className="mt-1">
                {product.product_type}
              </Badge>
              {product.tags && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {product.tags.split(',').map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Select Report Reason</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectReport} onValueChange={(value) => setSelectReport(value)}>
            {REPORTS.map((report) => (
              <div
                key={report.id}
                className="flex items-start gap-3 py-3 border-b last:border-none"
              >
                <RadioGroupItem
                  value={String(report.id)}
                  id={`report-${report.id}`}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor={`report-${report.id}`} className="font-medium cursor-pointer">
                    {report.title}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{report.content}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Additional Details (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Please provide more details about the issue..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={5}
            className="resize-y"
          />
        </CardContent>
      </Card>

      <div className="mt-8">
        <Button
          onClick={sendReport}
          size="lg"
          className="w-full text-base"
          disabled={!selectReport || submitReport.isPending}
        >
          <Send className="mr-2 w-5 h-5" />
          {submitReport.isPending ? 'Submitting…' : 'Submit Report'}
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-4">
          All reports are reviewed by our team. Thank you for helping keep our platform safe.
        </p>
      </div>
    </div>
  )
}

export default ReportProductDetails
