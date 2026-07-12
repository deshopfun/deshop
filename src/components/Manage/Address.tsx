import UserAddressDialog from '@/components/Dialog/UserAddressDialog'
import { useSnackPresistStore } from '@/lib'
import { useEffect, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { AddressType } from '@/utils/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Plus, Trash2, Copy, Pencil, CheckCircle2, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const ManageAddress = () => {
  const [alignment, setAlignment] = useState<'received' | 'delivery'>('received')
  const [handle, setHandle] = useState<number>(0)
  const [addresses, setAddresses] = useState<AddressType[]>([])
  const [currentAddress, setCurrentAddress] = useState<AddressType>()
  const [openDialog, setOpenDialog] = useState(false)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)

  const showError = (msg: string) => {
    setSnackSeverity('error')
    setSnackMessage(msg)
    setSnackOpen(true)
  }
  const showSuccess = (msg: string) => {
    setSnackSeverity('success')
    setSnackMessage(msg)
    setSnackOpen(true)
  }

  const init = async (kind: string) => {
    try {
      const response: any = await axios.get(Http.address, {
        params: { kind: kind === 'received' ? 1 : 2 },
      })
      setAddresses(response.result ? response.data : [])
    } catch {
      showError('Network error. Please try again later.')
    }
  }

  useEffect(() => {
    init('received')
  }, [])

  const handleCloseDialog = async () => {
    setCurrentAddress(undefined)
    await init(alignment)
    setOpenDialog(false)
  }

  const onClickSetDefault = async (id: number, set: number) => {
    try {
      const response: any = await axios.put(Http.address, { address_id: id, is_default: set })
      if (response.result) {
        await init(alignment)
        showSuccess('Updated successfully')
      } else showError('Update failed')
    } catch {
      showError('Network error. Please try again later.')
    }
  }

  const onClickDelete = async (id: number) => {
    try {
      const response: any = await axios.delete(Http.address, { params: { address_id: id } })
      if (response.result) {
        await init(alignment)
        showSuccess('Deleted successfully')
      } else showError('Delete failed')
    } catch {
      showError('Network error. Please try again later.')
    }
  }

  const onClickCopy = async (item: AddressType) => {
    await navigator.clipboard.writeText(
      `${item.first_name} ${item.last_name} ${item.phone} ${item.country} ${item.province} ${item.address_one}`
    )
    showSuccess('Copied to clipboard')
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-sky-50 flex items-center justify-center">
            <MapPin className="h-4 w-4 text-sky-500" />
          </div>
          <div>
            <h3 className="font-semibold">All Addresses</h3>
            <p className="text-xs text-muted-foreground">
              {addresses.length} address{addresses.length !== 1 ? 'es' : ''}
            </p>
          </div>
        </div>

        <div className="flex rounded-xl overflow-hidden border border-gray-200">
          {(['received', 'delivery'] as const).map((type) => (
            <button
              key={type}
              onClick={async () => {
                setAlignment(type)
                await init(type)
              }}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors capitalize',
                alignment === type
                  ? 'bg-sky-500 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {addresses.length > 0 ? (
        <div className="flex flex-col gap-3">
          {addresses.map((item, index) => (
            <Card
              key={index}
              className={cn(
                'border-0 shadow-sm overflow-hidden transition-all',
                item.is_default === 1 && 'ring-2 ring-sky-400'
              )}
            >
              <CardContent className="p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm">
                      {item.first_name} {item.last_name}
                    </p>
                    <span className="text-xs text-muted-foreground">{item.phone}</span>
                    {item.is_default === 1 && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                        <Star className="h-3 w-3" /> Default
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onClickDelete(item.address_id)}
                    className="text-gray-300 hover:text-red-400 transition-colors shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    {[
                      item.address_one,
                      item.address_two,
                      item.city,
                      item.province,
                      item.zip,
                      item.country,
                    ]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-dashed border-gray-100">
                  <Button
                    size="sm"
                    variant={item.is_default === 1 ? 'outline' : 'ghost'}
                    className={cn(
                      'h-8 gap-1.5 text-xs',
                      item.is_default === 1
                        ? 'text-sky-600 border-sky-200 hover:bg-sky-50'
                        : 'text-gray-500 hover:text-sky-600'
                    )}
                    onClick={() =>
                      onClickSetDefault(item.address_id, item.is_default === 1 ? 2 : 1)
                    }
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {item.is_default === 1 ? 'Remove default' : 'Set as default'}
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 gap-1.5 text-xs text-gray-500"
                      onClick={() => onClickCopy(item)}
                    >
                      <Copy className="h-3.5 w-3.5" /> Copy
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1.5 text-xs"
                      onClick={() => {
                        setCurrentAddress(item)
                        setHandle(2)
                        setOpenDialog(true)
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center">
            <MapPin className="h-7 w-7 text-gray-300" />
          </div>
          <div>
            <p className="font-medium text-sm text-gray-700">No addresses yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Add a {alignment} address to get started.
            </p>
          </div>
        </div>
      )}

      <Button
        variant="outline"
        className="h-11 gap-2 border-dashed hover:border-sky-300 hover:text-sky-500 transition-colors"
        onClick={() => {
          setHandle(1)
          setOpenDialog(true)
        }}
      >
        <Plus className="h-4 w-4" /> Add New Address
      </Button>

      <UserAddressDialog
        handle={handle}
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        addressId={currentAddress?.address_id}
        firstName={currentAddress?.first_name}
        lastName={currentAddress?.last_name}
        company={currentAddress?.company}
        addressOne={currentAddress?.address_one}
        addressTwo={currentAddress?.address_two}
        email={currentAddress?.email}
        phone={currentAddress?.phone}
        country={currentAddress?.country}
        city={currentAddress?.city}
        province={currentAddress?.province}
        zip={currentAddress?.zip}
        kind={alignment === 'received' ? 1 : 2}
      />
    </div>
  )
}

export default ManageAddress
