import { useSnackPresistStore } from '@/lib'
import { CURRENCYS } from '@/packages/constants/currency'
import { useEffect, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { ProfileType } from '@/utils/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Settings, User, Mail, Gift, FileText, Clock, Coins, Save, Loader2 } from 'lucide-react'

const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value?: string }) => (
  <div className="flex items-center justify-between py-3 border-b border-dashed border-gray-100 last:border-0">
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </div>
    <span className="text-sm font-semibold text-gray-800">{value || '—'}</span>
  </div>
)

const ManageSetting = () => {
  const [user, setUser] = useState<ProfileType>()
  const [currency, setCurrency] = useState('')
  const [loading, setLoading] = useState(false)

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

  const init = async () => {
    try {
      const response: any = await axios.get(Http.user_setting)
      if (response.result) {
        setUser(response.data)
        setCurrency(response.data.currency)
      } else {
        setUser(undefined)
        setCurrency('')
      }
    } catch {
      showError('Network error. Please try again later.')
    }
  }

  const onSave = async () => {
    if (!currency) return showError('Please select a currency')
    setLoading(true)
    try {
      const response: any = await axios.put(Http.user_setting, { currency })
      if (response.result) {
        await init()
        showSuccess('Settings saved successfully')
      } else {
        showError(response.message)
      }
    } catch {
      showError('Network error. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    init()
  }, [])

  const currencyCode = CURRENCYS.find((c) => c.name === currency)?.code

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-sky-50 flex items-center justify-center">
          <Settings className="h-4 w-4 text-sky-500" />
        </div>
        <div>
          <h3 className="font-semibold">Account Settings</h3>
          <p className="text-xs text-muted-foreground">Manage your profile and preferences</p>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-2">
          <div className="flex items-center gap-4 pb-4 border-b mb-2">
            <Avatar className="h-16 w-16 border-2 border-gray-100">
              <AvatarImage src={user?.avatar_url || '/images/default_avatar.png'} alt="avatar" />
              <AvatarFallback className="text-lg bg-sky-100 text-sky-600 font-bold">
                {user?.username?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-lg">{user?.username || '—'}</p>
              <p className="text-sm text-muted-foreground">{user?.email || '—'}</p>
            </div>
          </div>

          <InfoRow icon={User} label="Username" value={user?.username} />
          <InfoRow icon={Mail} label="Email" value={user?.email} />
          <InfoRow icon={Gift} label="Invitation Code" value={user?.invitation_code} />
          <InfoRow icon={FileText} label="Bio" value={user?.bio} />
          <InfoRow
            icon={Clock}
            label="Member Since"
            value={
              user?.created_time
                ? new Date(Number(user.created_time)).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : undefined
            }
          />
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <Coins className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Currency Preference</h4>
              <p className="text-xs text-muted-foreground">Set your preferred display currency</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="flex-1 h-10">
                <SelectValue placeholder="Choose currency" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCYS.map((item, i) => (
                  <SelectItem key={i} value={item.name}>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground w-8">
                        {item.code}
                      </span>
                      <span>{item.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {currencyCode && (
              <div className="h-10 px-4 bg-gray-50 rounded-lg border flex items-center">
                <span className="text-sm font-bold text-gray-700">{currencyCode}</span>
              </div>
            )}
          </div>

          <Button
            className="h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2"
            onClick={onSave}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Save className="h-4 w-4" /> Save Settings
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default ManageSetting
