import { useSnackPresistStore } from '@/lib'
import { useRouter } from 'next/router'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { useEffect, useState } from 'react'

import { REPORTS, REPORT_TYPE } from '@/packages/constants'
import { ProductType } from '@/utils/types'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

import { AlertTriangle, Send } from 'lucide-react'
import { GetAbosolutePathByRelative } from '@/utils/image'

const ReportProductDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const [product, setProduct] = useState<ProductType>()
  const [selectReport, setSelectReport] = useState<number>(0)
  const [details, setDetails] = useState<string>('')

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)

  const init = async (productId: any) => {
    try {
      if (!productId) {
        setSnackSeverity('error')
        setSnackMessage('Incorrect product id')
        setSnackOpen(true)
        return
      }

      const isNumericId = typeof productId === 'number' || /^\d+$/.test(String(id))
      const response: any = await axios.get(Http.product_by_id, {
        params: isNumericId ? { product_id: productId } : { slug: productId },
      })

      if (response.result) {
        setProduct(response.data)
      } else {
        setSnackSeverity('error')
        setSnackMessage(response.message)
        setSnackOpen(true)
      }
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage('Network error occurred. Please try again later.')
      setSnackOpen(true)
      console.error(e)
    }
  }

  useEffect(() => {
    if (id) init(id)
  }, [id])

  const sendReport = async () => {
    try {
      if (!id) return
      if (!selectReport) {
        setSnackSeverity('error')
        setSnackMessage('Please select a reason')
        setSnackOpen(true)
        return
      }

      const response: any = await axios.post(Http.report, {
        report_type: REPORT_TYPE.PRODUCT,
        bind_id: Number(id),
        select: selectReport,
        detail: details,
      })

      if (response.result) {
        setSnackSeverity('success')
        setSnackMessage('Report submitted successfully')
        setSnackOpen(true)
        setTimeout(() => router.back(), 1500)
      } else {
        setSnackSeverity('error')
        setSnackMessage(response.message || 'Failed to submit report')
        setSnackOpen(true)
      }
    } catch (e) {
      setSnackSeverity('error')
      setSnackMessage('Network error occurred')
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
            onClick={() => router.push(`/products/${product.product_id}`)}
          >
            <img
              src={GetAbosolutePathByRelative(product.images?.[0]?.src)}
              alt={product.title}
              className="w-24 h-24 object-cover rounded-lg border"
            />
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
          <RadioGroup
            value={String(selectReport)}
            onValueChange={(value) => setSelectReport(Number(value))}
          >
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
          disabled={!selectReport}
        >
          <Send className="mr-2 w-5 h-5" />
          Submit Report
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-4">
          All reports are reviewed by our team. Thank you for helping keep our platform safe.
        </p>
      </div>
    </div>
  )
}

export default ReportProductDetails
