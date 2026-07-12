import { useSnackPresistStore } from '@/lib'
import { COUNTRYPROVINCES } from '@/packages/constants/countryState'
import { useEffect, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { IsValidEmail } from '@/utils/verify'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MapPin, Loader2, User, Mail, Building2, Phone } from 'lucide-react'

type DialogType = {
  openDialog: boolean
  handleCloseDialog: () => Promise<void>
  handle: number
  addressId?: number
  firstName?: string
  lastName?: string
  company?: string
  addressOne?: string
  addressTwo?: string
  email?: string
  phone?: string
  country?: string
  city?: string
  province?: string
  zip?: string
  kind: number
}

const FormField = ({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) => (
  <div className="flex flex-col gap-1.5">
    <Label className="text-sm">
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    {children}
  </div>
)

export default function UserAddressDialog(props: DialogType) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [company, setCompany] = useState('')
  const [addressOne, setAddressOne] = useState('')
  const [addressTwo, setAddressTwo] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [zip, setZip] = useState('')
  const [loading, setLoading] = useState(false)

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state)

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

  useEffect(() => {
    setFirstName(props.firstName || '')
    setLastName(props.lastName || '')
    setCompany(props.company || '')
    setAddressOne(props.addressOne || '')
    setAddressTwo(props.addressTwo || '')
    setEmail(props.email || '')
    setPhone(props.phone || '')
    setCountry(props.country || '')
    setCity(props.city || '')
    setProvince(props.province || '')
    setZip(props.zip || '')
  }, [props])

  const provinces = country
    ? (COUNTRYPROVINCES.find((c) => c.name === country)?.provinces ?? [])
    : []

  const onClickSaveAddress = async () => {
    if (!firstName) return showError('Incorrect first name input')
    if (!lastName) return showError('Incorrect last name input')
    if (!email || !IsValidEmail(email)) return showError('Incorrect email input')
    if (!company) return showError('Incorrect company input')
    if (!phone) return showError('Incorrect phone input')
    if (!addressOne) return showError('Incorrect address input')
    if (!country) return showError('Please select a country')
    if (!city) return showError('Incorrect city input')
    if (!province) return showError('Please select a state/province')
    if (!zip) return showError('Incorrect ZIP input')
    if (props.kind !== 1 && props.kind !== 2) return

    const countryCode = COUNTRYPROVINCES.find((c) => c.name === country)?.code
    if (!countryCode) return showError('Incorrect country code')

    const provinceCode = COUNTRYPROVINCES.find((c) => c.name === country)?.provinces.find(
      (p) => p.name === province
    )?.code
    if (!provinceCode) return showError('Incorrect province code')

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email,
      company,
      phone,
      country,
      country_code: countryCode,
      city,
      province,
      province_code: provinceCode,
      zip,
      address_one: addressOne,
      address_two: addressTwo,
    }

    setLoading(true)
    try {
      let response: any
      if (props.handle === 1) {
        response = await axios.post(Http.address, { ...payload, kind: props.kind })
      } else if (props.handle === 2) {
        response = await axios.put(Http.address, { ...payload, address_id: props.addressId })
      } else {
        return showError('Not supported')
      }

      if (response.result) {
        await props.handleCloseDialog()
        showSuccess('Address saved successfully')
      } else {
        showError(response.message || 'Save failed')
      }
    } catch {
      showError('Network error. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const isEdit = props.handle === 2

  return (
    <Dialog open={props.openDialog} onOpenChange={props.handleCloseDialog}>
      <DialogContent className="max-w-lg rounded-2xl p-0 gap-0 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="bg-gradient-to-br from-blue-600 to-sky-400 px-6 py-6 flex flex-col items-center gap-2 text-white text-center shrink-0">
          <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center">
            <MapPin className="h-7 w-7 text-white" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold">
              {isEdit ? 'Edit Shipping Address' : 'Add New Address'}
            </DialogTitle>
          </DialogHeader>
          <p className="text-white/80 text-sm">
            {isEdit ? 'Update your shipping details' : 'Add a new shipping address to your account'}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
          <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            <User className="h-3.5 w-3.5" /> Personal Info
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="First Name" required>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
              />
            </FormField>
            <FormField label="Last Name" required>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
              />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Email" required>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
              />
            </FormField>
            <FormField label="Company" required>
              <Input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company name"
              />
            </FormField>
          </div>
          <FormField label="Phone" required>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 234 567 890"
            />
          </FormField>

          <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide mt-1">
            <MapPin className="h-3.5 w-3.5" /> Address
          </div>
          <FormField label="Address Line 1" required>
            <Input
              value={addressOne}
              onChange={(e) => setAddressOne(e.target.value)}
              placeholder="Street address"
            />
          </FormField>
          <FormField label="Address Line 2">
            <Input
              value={addressTwo}
              onChange={(e) => setAddressTwo(e.target.value)}
              placeholder="Apt, suite, etc. (optional)"
            />
          </FormField>

          <FormField label="Country / Region" required>
            <Select
              value={country}
              onValueChange={(v) => {
                setProvince('')
                setCountry(v)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRYPROVINCES.map((c, i) => (
                  <SelectItem key={i} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <div className="grid grid-cols-3 gap-3">
            <FormField label="City" required>
              <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
            </FormField>
            <FormField label="State / Province" required>
              <Select value={province} onValueChange={setProvince} disabled={!country}>
                <SelectTrigger>
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((p, i) => (
                    <SelectItem key={i} value={p.name}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="ZIP / Postal" required>
              <Input value={zip} onChange={(e) => setZip(e.target.value)} placeholder="12345" />
            </FormField>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t shrink-0 flex flex-col gap-2">
          <Button
            className="w-full h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2"
            onClick={onClickSaveAddress}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <MapPin className="h-4 w-4" /> {isEdit ? 'Save Changes' : 'Save Address'}
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            className="w-full h-10 text-muted-foreground"
            onClick={props.handleCloseDialog}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
