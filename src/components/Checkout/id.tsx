// import { CartType, useCartPresistStore, useSnackPresistStore, useUserPresistStore } from '@/lib'
// import { useRouter } from 'next/router'
// import axios from '@/utils/http/axios'
// import { Http } from '@/utils/http/http'
// import { useEffect, useState } from 'react'
// import { COUNTRYPROVINCES } from '@/packages/constants/countryState'
// import { SHIPPING_TYPE } from '@/packages/constants'
// import { CURRENCYS } from '@/packages/constants/currency'
// import { IsValidEmail } from '@/utils/verify'
// import { AddressType } from '@/utils/types'
// import { Card, CardContent } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { Checkbox } from '@/components/ui/checkbox'
// import {
//   Truck,
//   Store,
//   CreditCard,
//   Lock,
//   MapPin,
//   Plus,
//   ShoppingBag,
//   CheckCircle2,
//   Loader2,
// } from 'lucide-react'
// import { cn } from '@/lib/utils'
// import Decimal from 'decimal.js'

// const FormField = ({
//   label,
//   required,
//   children,
// }: {
//   label: string
//   required?: boolean
//   children: React.ReactNode
// }) => (
//   <div className="flex flex-col gap-1.5">
//     <Label>
//       {label}
//       {required && <span className="text-red-500 ml-0.5">*</span>}
//     </Label>
//     {children}
//   </div>
// )

// const PriceRow = ({
//   label,
//   value,
//   highlight,
//   negative,
// }: {
//   label: string
//   value: string
//   highlight?: boolean
//   negative?: boolean
// }) => (
//   <div className={cn('flex justify-between text-sm', highlight && 'text-base font-bold pt-1')}>
//     <span className={highlight ? 'font-bold' : 'text-muted-foreground'}>{label}</span>
//     <span className={cn(highlight ? 'font-bold' : 'font-medium', negative && 'text-green-600')}>
//       {negative ? '-' : ''}
//       {value}
//     </span>
//   </div>
// )

// const CheckoutDetails = () => {
//   const router = useRouter()
//   const { id } = router.query

//   const [cartList, setCartList] = useState<CartType>()
//   const [addresses, setAddresses] = useState<AddressType[]>([])
//   const [sellerAddresses, setSellerAddresses] = useState<AddressType[]>([])
//   const [ship, setShip] = useState(true)
//   const [selectDeliveryAddress, setSelectDeliveryAddress] = useState<number>(0)
//   const [selectPickupAddress, setSelectPickupAddress] = useState<number>(0)
//   const [showNewAddressForm, setShowNewAddressForm] = useState(false)
//   const [payLoading, setPayLoading] = useState(false)
//   const [saveLoading, setSaveLoading] = useState(false)

//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [company, setCompany] = useState('')
//   const [addressOne, setAddressOne] = useState('')
//   const [addressTwo, setAddressTwo] = useState('')
//   const [email, setEmail] = useState('')
//   const [phone, setPhone] = useState('')
//   const [country, setCountry] = useState('')
//   const [city, setCity] = useState('')
//   const [province, setProvince] = useState('')
//   const [zip, setZip] = useState('')
//   const [isCheckTerms, setIsCheckTerms] = useState(false)

//   const [subTotal, setSubTotal] = useState('0')
//   const [tax, setTax] = useState('0')
//   const [tip, setTip] = useState('0')
//   const [discount, setDiscount] = useState('0')
//   const [total, setTotal] = useState('0')

//   const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)
//   const { getUuid, getIsLogin } = useUserPresistStore((state) => state)
//   const { getCart, setCart } = useCartPresistStore((state) => state)

//   const showError = (msg: string) => {
//     setSnackSeverity('error')
//     setSnackMessage(msg)
//     setSnackOpen(true)
//   }
//   const showSuccess = (msg: string) => {
//     setSnackSeverity('success')
//     setSnackMessage(msg)
//     setSnackOpen(true)
//   }
//   const currencyCode = CURRENCYS.find((c) => c.name === cartList?.currency)?.code ?? ''
//   const fmt = (val: string | number) => `${currencyCode}${val}`

//   const getAddress = async () => {
//     if (!getUuid()) return
//     try {
//       const res: any = await axios.get(Http.address, { params: { kind: 1 } })
//       setAddresses(res.result ? res.data : [])
//     } catch {
//       showError('Network error. Please try again later.')
//     }
//   }

//   const getSellerAddress = async (uuid: string) => {
//     if (!uuid) return
//     try {
//       const res: any = await axios.get(Http.address_by_uuid, { params: { uuid, kind: 2 } })
//       setSellerAddresses(res.result ? res.data : [])
//     } catch {
//       showError('Network error. Please try again later.')
//     }
//   }

//   useEffect(() => {
//     if (!id) return
//     const cart = getCart()
//     const currentCart = cart.find((item) => item.uuid === id)
//     if (!currentCart?.variant.length) return

//     setCartList(currentCart)
//     getSellerAddress(id as string)
//     getAddress()

//     let price = new Decimal(0)
//     let taxCost = new Decimal(0)
//     let tipCost = new Decimal(0)
//     let disc = new Decimal(0)

//     currentCart.variant.forEach((item) => {
//       const quantity = new Decimal(item.quantity || 0)

//       price = price.plus(new Decimal(item.price || '0').times(quantity))

//       if (item.taxable) {
//         taxCost = taxCost.plus(new Decimal(item.tax || '0').times(quantity))
//       }

//       tipCost = tipCost.plus(new Decimal(item.tip || '0').times(quantity))
//       disc = disc.plus(new Decimal(item.discounts || '0').times(quantity))
//     })

//     setSubTotal(price.toString())
//     setTax(taxCost.toString())
//     setTip(tipCost.toString())
//     setDiscount(disc.toString())
//     setTotal(price.plus(taxCost).plus(tipCost).minus(disc).toString())
//   }, [id])

//   const clearAddressForm = () => {
//     setFirstName('')
//     setLastName('')
//     setCompany('')
//     setAddressOne('')
//     setAddressTwo('')
//     setEmail('')
//     setPhone('')
//     setCountry('')
//     setCity('')
//     setProvince('')
//     setZip('')
//     setIsCheckTerms(false)
//   }

//   const onClickSaveAddress = async () => {
//     if (!firstName) return showError('Incorrect first name input')
//     if (!lastName) return showError('Incorrect last name input')
//     if (!email || !IsValidEmail(email)) return showError('Incorrect email input')
//     if (!company) return showError('Incorrect company input')
//     if (!phone) return showError('Incorrect phone input')
//     if (!addressOne) return showError('Incorrect address input')
//     if (!country) return showError('Please select a country')
//     if (!city) return showError('Incorrect city input')
//     if (!province) return showError('Please select a state/province')
//     if (!zip) return showError('Incorrect ZIP input')
//     if (!isCheckTerms) return showError('Please agree to the Terms and Conditions')

//     const countryCode = COUNTRYPROVINCES.find((c) => c.name === country)?.code
//     if (!countryCode) return showError('Incorrect country code')

//     const provinceCode = COUNTRYPROVINCES.find((c) => c.name === country)?.provinces.find(
//       (p) => p.name === province
//     )?.code
//     if (!provinceCode) return showError('Incorrect province code')

//     setSaveLoading(true)
//     try {
//       const response: any = await axios.post(Http.address, {
//         first_name: firstName,
//         last_name: lastName,
//         email,
//         company,
//         phone,
//         country,
//         country_code: countryCode,
//         city,
//         province,
//         province_code: provinceCode,
//         zip,
//         address_one: addressOne,
//         address_two: addressTwo,
//         kind: 1,
//       })
//       if (response.result) {
//         clearAddressForm()
//         await getAddress()
//         setSelectDeliveryAddress(response.data.address_id)
//         setShowNewAddressForm(false)
//         showSuccess('Address saved successfully')
//       } else {
//         showError(response.message || 'Save failed')
//       }
//     } catch {
//       showError('Network error. Please try again later.')
//     } finally {
//       setSaveLoading(false)
//     }
//   }

//   const onClickPayNow = async () => {
//     if (!getIsLogin()) return showError('Please login first')
//     if (!cartList) return

//     const items = cartList.variant.map((item) => ({
//       product_id: item.productId,
//       slug: item.slug,
//       option: item.option,
//       quantity: item.quantity,
//     }))
//     if (!items.length) return showError('Cart is empty')
//     const isVirtual = cartList.variant.every((item) => item.isVirtual)

//     setPayLoading(true)
//     try {
//       const response: any = await axios.post(Http.order, {
//         seller_uuid: id,
//         items,
//         landing_site: window.location.origin,
//         shipping_type: isVirtual ? (ship ? SHIPPING_TYPE.DELIVERY : SHIPPING_TYPE.PICKUP) : 0,
//         shipping_address_id: isVirtual ? (ship ? selectDeliveryAddress : selectPickupAddress) : 0,
//       })
//       if (response.result && response.data.order_id) {
//         setCart(getCart().filter((item) => item.uuid !== id))
//         window.location.href = `/payment/${response.data.order_id}`
//       } else {
//         showError(response.message || 'Payment failed')
//       }
//     } catch {
//       showError('Network error. Please try again later.')
//     } finally {
//       setPayLoading(false)
//     }
//   }

//   const provinces = COUNTRYPROVINCES.find((c) => c.name === country)?.provinces ?? []

//   if (!cartList)
//     return (
//       <div className="container mx-auto py-20 flex flex-col items-center gap-4 text-center">
//         <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
//           <ShoppingBag className="h-8 w-8 text-gray-300" />
//         </div>
//         <p className="font-semibold text-gray-700">No order found</p>
//         <p className="text-sm text-muted-foreground">
//           No information was found about this checkout.
//         </p>
//         <Button
//           variant="outline"
//           onClick={() => {
//             window.location.href = '/'
//           }}
//         >
//           Back to Home
//         </Button>
//       </div>
//     )

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div className="flex items-center gap-3 mb-8">
//         <div className="h-10 w-10 rounded-xl bg-sky-50 flex items-center justify-center">
//           <CreditCard className="h-5 w-5 text-sky-500" />
//         </div>
//         <h1 className="text-2xl font-bold">Checkout</h1>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
//         {cartList.variant.every((item) => item.isVirtual) ? (
//           <div className="lg:col-span-2 flex flex-col gap-5">
//             <Card className="border-0 shadow-sm">
//               <CardContent className="p-6 flex flex-col gap-4">
//                 <div className="flex items-center gap-3">
//                   <CheckCircle2 className="h-4 w-4 shrink-0" />
//                   All items are digital — no shipping required.
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         ) : (
//           <div className="lg:col-span-3 flex flex-col gap-5">
//             <Card className="border-0 shadow-sm">
//               <CardContent className="p-6 flex flex-col gap-4">
//                 <h2 className="font-semibold">Shipping Method</h2>
//                 <div className="grid grid-cols-2 gap-3">
//                   {[
//                     { value: true, icon: Truck, label: 'Delivery' },
//                     { value: false, icon: Store, label: 'Pickup' },
//                   ].map(({ value, icon: Icon, label }) => (
//                     <button
//                       key={label}
//                       onClick={() => setShip(value)}
//                       className={cn(
//                         'flex flex-col items-center justify-center gap-2 h-20 rounded-xl border-2 transition-all duration-150',
//                         ship === value
//                           ? 'border-sky-400 bg-sky-50 text-sky-600'
//                           : 'border-gray-100 text-gray-400 hover:border-gray-200'
//                       )}
//                     >
//                       <Icon className="h-5 w-5" />
//                       <span className="text-sm font-medium">{label}</span>
//                     </button>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {ship ? (
//               <Card className="border-0 shadow-sm">
//                 <CardContent className="p-6 flex flex-col gap-4">
//                   <h2 className="font-semibold">Delivery Address</h2>

//                   {addresses?.length > 0 && (
//                     <div className="flex flex-col gap-2">
//                       {addresses.map((addr) => (
//                         <button
//                           key={addr.address_id}
//                           onClick={() => {
//                             setSelectDeliveryAddress(addr.address_id)
//                             setShowNewAddressForm(false)
//                           }}
//                           className={cn(
//                             'flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all',
//                             selectDeliveryAddress === addr.address_id
//                               ? 'border-sky-400 bg-sky-50'
//                               : 'border-gray-100 hover:border-gray-200'
//                           )}
//                         >
//                           <div
//                             className={cn(
//                               'h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors',
//                               selectDeliveryAddress === addr.address_id
//                                 ? 'border-sky-500 bg-sky-500'
//                                 : 'border-gray-300'
//                             )}
//                           >
//                             {selectDeliveryAddress === addr.address_id && (
//                               <CheckCircle2 className="h-3.5 w-3.5 text-white" />
//                             )}
//                           </div>
//                           <div>
//                             <p className="text-sm font-semibold">
//                               {addr.first_name} {addr.last_name}
//                             </p>
//                             <p className="text-xs text-muted-foreground mt-0.5">{addr.phone}</p>
//                             <p className="text-xs text-muted-foreground mt-0.5">
//                               {[addr.address_one, addr.city, addr.province, addr.zip, addr.country]
//                                 .filter(Boolean)
//                                 .join(', ')}
//                             </p>
//                           </div>
//                         </button>
//                       ))}
//                     </div>
//                   )}

//                   <button
//                     onClick={() => {
//                       setShowNewAddressForm(true)
//                       setSelectDeliveryAddress(-1)
//                     }}
//                     className={cn(
//                       'flex items-center gap-2 p-4 rounded-xl border-2 border-dashed text-sm transition-all',
//                       showNewAddressForm
//                         ? 'border-sky-400 bg-sky-50 text-sky-600'
//                         : 'border-gray-200 text-gray-400 hover:border-sky-300 hover:text-sky-500'
//                     )}
//                   >
//                     <Plus className="h-4 w-4" />
//                     Add new delivery address
//                   </button>

//                   {showNewAddressForm && (
//                     <div className="flex flex-col gap-4 pt-4 border-t border-dashed">
//                       <div className="grid grid-cols-2 gap-3">
//                         <FormField label="First Name" required>
//                           <Input
//                             value={firstName}
//                             onChange={(e) => setFirstName(e.target.value)}
//                             placeholder="John"
//                           />
//                         </FormField>
//                         <FormField label="Last Name" required>
//                           <Input
//                             value={lastName}
//                             onChange={(e) => setLastName(e.target.value)}
//                             placeholder="Doe"
//                           />
//                         </FormField>
//                       </div>
//                       <div className="grid grid-cols-2 gap-3">
//                         <FormField label="Email" required>
//                           <Input
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="you@example.com"
//                           />
//                         </FormField>
//                         <FormField label="Company" required>
//                           <Input
//                             value={company}
//                             onChange={(e) => setCompany(e.target.value)}
//                             placeholder="Company"
//                           />
//                         </FormField>
//                       </div>
//                       <FormField label="Phone" required>
//                         <Input
//                           value={phone}
//                           onChange={(e) => setPhone(e.target.value)}
//                           placeholder="+1 234 567 890"
//                         />
//                       </FormField>
//                       <FormField label="Address Line 1" required>
//                         <Input
//                           value={addressOne}
//                           onChange={(e) => setAddressOne(e.target.value)}
//                           placeholder="Street address"
//                         />
//                       </FormField>
//                       <FormField label="Address Line 2">
//                         <Input
//                           value={addressTwo}
//                           onChange={(e) => setAddressTwo(e.target.value)}
//                           placeholder="Apt, suite (optional)"
//                         />
//                       </FormField>
//                       <FormField label="Country / Region" required>
//                         <Select
//                           value={country}
//                           onValueChange={(v) => {
//                             setProvince('')
//                             setCountry(v)
//                           }}
//                         >
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select country" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {COUNTRYPROVINCES.map((c, i) => (
//                               <SelectItem key={i} value={c.name}>
//                                 {c.name}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </FormField>
//                       <div className="grid grid-cols-3 gap-3">
//                         <FormField label="City" required>
//                           <Input
//                             value={city}
//                             onChange={(e) => setCity(e.target.value)}
//                             placeholder="City"
//                           />
//                         </FormField>
//                         <FormField label="State / Province" required>
//                           <Select value={province} onValueChange={setProvince} disabled={!country}>
//                             <SelectTrigger>
//                               <SelectValue placeholder="State" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               {provinces.map((p, i) => (
//                                 <SelectItem key={i} value={p.name}>
//                                   {p.name}
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         </FormField>
//                         <FormField label="ZIP" required>
//                           <Input
//                             value={zip}
//                             onChange={(e) => setZip(e.target.value)}
//                             placeholder="12345"
//                           />
//                         </FormField>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <Checkbox
//                           id="terms"
//                           checked={isCheckTerms}
//                           onCheckedChange={(v) => setIsCheckTerms(!!v)}
//                         />
//                         <label
//                           htmlFor="terms"
//                           className="text-xs text-muted-foreground cursor-pointer"
//                         >
//                           I agree to the{' '}
//                           <a
//                             href="/docs/terms-and-conditions"
//                             className="text-sky-500 hover:underline"
//                           >
//                             Terms and Conditions
//                           </a>
//                         </label>
//                       </div>

//                       <Button
//                         className="h-10 bg-sky-500 hover:bg-sky-600 text-white gap-2"
//                         onClick={onClickSaveAddress}
//                         disabled={saveLoading}
//                       >
//                         {saveLoading ? (
//                           <Loader2 className="h-4 w-4 animate-spin" />
//                         ) : (
//                           'Save Address'
//                         )}
//                       </Button>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             ) : (
//               <Card className="border-0 shadow-sm">
//                 <CardContent className="p-6 flex flex-col gap-3">
//                   <h2 className="font-semibold">Pickup Location</h2>
//                   {sellerAddresses?.length > 0 ? (
//                     sellerAddresses.map((addr) => (
//                       <button
//                         key={addr.address_id}
//                         onClick={() => setSelectPickupAddress(addr.address_id)}
//                         className={cn(
//                           'flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all',
//                           selectPickupAddress === addr.address_id
//                             ? 'border-sky-400 bg-sky-50'
//                             : 'border-gray-100 hover:border-gray-200'
//                         )}
//                       >
//                         <MapPin className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
//                         <div className="flex-1">
//                           <p className="text-sm font-semibold">
//                             {addr.first_name} {addr.last_name}
//                           </p>
//                           <p className="text-xs text-muted-foreground mt-0.5">
//                             {[addr.address_one, addr.city, addr.province, addr.country]
//                               .filter(Boolean)
//                               .join(', ')}
//                           </p>
//                         </div>
//                         <span className="text-sm font-bold text-green-600">FREE</span>
//                       </button>
//                     ))
//                   ) : (
//                     <div className="flex flex-col items-center py-8 gap-2 text-center">
//                       <MapPin className="h-8 w-8 text-gray-200" />
//                       <p className="text-sm font-medium">No pickup locations available</p>
//                       <p className="text-xs text-muted-foreground">
//                         Contact the seller for pickup address.
//                       </p>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             )}
//           </div>
//         )}

//         <div className="lg:col-span-2">
//           <div className="sticky top-24 flex flex-col gap-4">
//             <Card className="border-0 shadow-sm">
//               <CardContent className="p-6 flex flex-col gap-5">
//                 <h2 className="font-semibold">Order Summary</h2>

//                 <div className="flex flex-col gap-4">
//                   {cartList.variant.map((item, i) => (
//                     <div key={i} className="flex gap-3">
//                       <div className="relative shrink-0">
//                         <img
//                           src={item.image}
//                           alt={item.title}
//                           className="h-16 w-16 object-cover rounded-xl border"
//                         />
//                         <span className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-sky-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
//                           {item.quantity}
//                         </span>
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium line-clamp-2">{item.title}</p>
//                         <p className="text-xs text-muted-foreground mt-0.5">
//                           {item.option.split(',').join(' / ')}
//                         </p>
//                         <p className="text-xs text-muted-foreground mt-0.5 font-bold">
//                           {item.isVirtual ? 'Virtual' : 'Physical'}
//                         </p>
//                       </div>
//                       <p className="text-sm font-semibold shrink-0">
//                         {new Decimal(item.price).times(item.quantity).toString()}
//                       </p>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex flex-col gap-2 border-t pt-4">
//                   <PriceRow label="Subtotal" value={fmt(subTotal)} />
//                   {Number(tax) > 0 && <PriceRow label="Tax" value={fmt(tax)} />}
//                   {Number(tip) > 0 && <PriceRow label="Tip" value={fmt(tip)} />}
//                   {Number(discount) > 0 && (
//                     <PriceRow label="Discount" value={fmt(discount)} negative />
//                   )}
//                   <div className="border-t mt-1 pt-2">
//                     <PriceRow label="Total" value={fmt(total)} highlight />
//                   </div>
//                 </div>

//                 <Button
//                   className="h-12 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2"
//                   onClick={onClickPayNow}
//                   disabled={payLoading}
//                 >
//                   {payLoading ? (
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                   ) : (
//                     <>
//                       <CreditCard className="h-5 w-5" /> Pay Now
//                     </>
//                   )}
//                 </Button>

//                 <div className="flex flex-col items-center gap-1 text-center">
//                   <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
//                     <Lock className="h-3.5 w-3.5" />
//                     <span>Secure Checkout · SSL Encrypted</span>
//                   </div>
//                   <p className="text-xs text-muted-foreground">
//                     Your financial details are protected during every transaction.
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CheckoutDetails

// components/CheckoutDetails.tsx (仅展示与购物车/校验相关的核心改动,地址表单部分与原来一致,省略重复 JSX)

import { CartLineType, useCartPresistStore, useSnackPresistStore, useUserPresistStore } from '@/lib'
import { useRouter } from 'next/router'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { useEffect, useState } from 'react'
import { CURRENCYS } from '@/packages/constants/currency'
import Decimal from 'decimal.js'
import { AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { GetAbosolutePathByRelative } from '@/utils/image'

type SkuInfo = {
  product_id: number
  option: string
  user_uuid: string
  username: string
  avatar_url: string
  currency: string
  slug: string
  title: string
  image: string
  price: string
  discounts: string
  taxable: number
  tax: string
  tip: string
  weight: string
  weight_unit: string
  is_virtual: number
  inventory_quantity: number
  product_status: number
}

type MergedLine = CartLineType & {
  sku?: SkuInfo
  isUnavailable: boolean
  exceedsStock: boolean
}

const CheckoutDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const [lines, setLines] = useState<MergedLine[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [payLoading, setPayLoading] = useState(false)

  // ... 地址相关的 state 与原来一致,省略

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((s) => s)
  const { getIsLogin } = useUserPresistStore((s) => s)
  const { getCart, setCart } = useCartPresistStore((s) => s)

  const showError = (msg: string) => {
    setSnackSeverity('error')
    setSnackMessage(msg)
    setSnackOpen(true)
  }

  // 拉取当前卖家这一组购物车行的最新事实数据,并与本地意图合并
  const fetchAndMerge = async (): Promise<MergedLine[]> => {
    const cart = getCart()
    const group = cart.find((c) => c.uuid === id)
    if (!group || group.variant.length === 0) return []

    const items = group.variant.map((v) => ({ product_id: v.productId, option: v.option }))
    const res: any = await axios.post(Http.product_variant_by_option_list, { items })
    if (!res.result) throw new Error(res.message || 'Failed to load cart data')

    const map: Record<string, SkuInfo> = {}
    res.data.forEach((sku: SkuInfo) => {
      map[`${sku.product_id}|${sku.option}`] = sku
    })

    return group.variant.map((v) => {
      const sku = map[`${v.productId}|${v.option}`]
      const isUnavailable = !sku || sku.product_status !== 1
      const exceedsStock = !!sku && v.quantity > sku.inventory_quantity
      return { ...v, sku, isUnavailable, exceedsStock }
    })
  }

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(false)
    fetchAndMerge()
      .then(setLines)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  const currency = lines.find((l) => l.sku)?.sku?.currency ?? ''
  const currencyCode = CURRENCYS.find((c) => c.name === currency)?.code ?? ''
  const fmt = (val: string | number) => `${currencyCode}${val}`

  const subTotal = lines.reduce((sum, l) => {
    if (!l.sku || l.isUnavailable) return sum
    return sum.plus(new Decimal(l.sku.price).times(l.quantity))
  }, new Decimal(0))

  const tax = lines.reduce((sum, l) => {
    if (!l.sku || l.isUnavailable || !l.sku.taxable) return sum
    return sum.plus(new Decimal(l.sku.tax).times(l.quantity))
  }, new Decimal(0))

  const tip = lines.reduce((sum, l) => {
    if (!l.sku || l.isUnavailable) return sum
    return sum.plus(new Decimal(l.sku.tip || '0').times(l.quantity))
  }, new Decimal(0))

  const discount = lines.reduce((sum, l) => {
    if (!l.sku || l.isUnavailable) return sum
    return sum.plus(new Decimal(l.sku.discounts || '0').times(l.quantity))
  }, new Decimal(0))

  const total = subTotal.plus(tax).plus(tip).minus(discount)

  const hasBlockingIssues = lines.some((l) => l.isUnavailable || l.exceedsStock)
  const isVirtualOrder = lines.every((l) => l.sku?.is_virtual)

  const onClickPayNow = async () => {
    if (!getIsLogin()) return showError('Please login first')
    if (lines.length === 0) return showError('Cart is empty')

    // 下单前最后一次校验,防止用户在结算页停留期间库存/上下架状态发生变化
    setPayLoading(true)
    try {
      const fresh = await fetchAndMerge()
      setLines(fresh)
      if (fresh.some((l) => l.isUnavailable || l.exceedsStock)) {
        showError('Some items changed. Please review your order before paying.')
        return
      }

      const items = fresh.map((l) => ({
        product_id: l.productId,
        slug: l.sku!.slug,
        option: l.option,
        quantity: l.quantity,
      }))

      const response: any = await axios.post(Http.order, {
        seller_uuid: id,
        items,
        landing_site: window.location.origin,
        // shipping_type / shipping_address_id 沿用原有的地址表单逻辑
      })

      if (response.result && response.data.order_id) {
        setCart(getCart().filter((c) => c.uuid !== id))
        window.location.href = `/payment/${response.data.order_id}`
      } else {
        showError(response.message || 'Payment failed')
      }
    } catch {
      showError('Network error. Please try again later.')
    } finally {
      setPayLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || lines.length === 0) {
    return (
      <div className="container mx-auto py-20 flex flex-col items-center gap-4 text-center">
        <p className="font-semibold text-gray-700">No order found</p>
        <Button variant="outline" onClick={() => (window.location.href = '/cart')}>
          Back to Cart
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* ...顶部标题、地址表单区域与原来一致... */}

      {hasBlockingIssues && (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl mb-6 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Some items are out of stock or no longer available. Please
          <a href="/cart" className="underline ml-1">
            update your cart
          </a>
          .
        </div>
      )}

      {/* Order Summary 部分 */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            {lines.map((line) => (
              <div key={`${line.productId}-${line.option}`} className="flex gap-3">
                <img
                  src={
                    GetAbosolutePathByRelative(line.sku?.image) ??
                    GetAbosolutePathByRelative(line.snapshotImage)
                  }
                  className="h-16 w-16 object-cover rounded-xl border"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-2">
                    {line.sku?.title ?? line.snapshotTitle}
                  </p>
                  <p className="text-xs text-muted-foreground">{line.option}</p>
                  {line.isUnavailable && (
                    <p className="text-xs text-red-500 font-medium">No longer available</p>
                  )}
                  {!line.isUnavailable && line.exceedsStock && (
                    <p className="text-xs text-red-500 font-medium">
                      Only {line.sku?.inventory_quantity} left
                    </p>
                  )}
                </div>
                <p className="text-sm font-semibold shrink-0">
                  {line.sku && new Decimal(line.sku.price).times(line.quantity).toString()}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 border-t pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{fmt(subTotal.toString())}</span>
            </div>
            {tax.gt(0) && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>{fmt(tax.toString())}</span>
              </div>
            )}
            {tip.gt(0) && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tip</span>
                <span>{fmt(tip.toString())}</span>
              </div>
            )}
            {discount.gt(0) && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-{fmt(discount.toString())}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-base border-t mt-1 pt-2">
              <span>Total</span>
              <span>{fmt(total.toString())}</span>
            </div>
          </div>

          <Button
            className="h-12 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2"
            onClick={onClickPayNow}
            disabled={payLoading || hasBlockingIssues}
          >
            {payLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Pay Now'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default CheckoutDetails
