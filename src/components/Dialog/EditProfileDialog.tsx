import { useSnackPresistStore } from '@/lib'
import { FILE_TYPE } from '@/packages/constants'
import { useEffect, useMemo, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Camera, User } from 'lucide-react'
import { GetAbosolutePathByRelative } from '@/utils/image'
import { useShallow } from 'zustand/react/shallow'
import { cn } from '@/lib/utils'
import { EMPTY_SOCIALS, SOCIALS, SocialKey, SocialValues, normalizeSocial } from '@/utils/social'

type DialogType = {
  avatarUrl?: string
  username?: string
  bio?: string
  socials?: Partial<SocialValues>
  openDialog: boolean
  setOpenDialog: (value: boolean) => void
}

export default function EditProfileDialog(props: DialogType) {
  const [avatarUrl, setAvatarUrl] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [bio, setBio] = useState<string>('')
  const [socials, setSocials] = useState<SocialValues>(EMPTY_SOCIALS)
  const [touched, setTouched] = useState<Partial<Record<SocialKey, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      setSnackSeverity: state.setSnackSeverity,
      setSnackMessage: state.setSnackMessage,
      setSnackOpen: state.setSnackOpen,
    }))
  )

  const toast = (severity: 'error' | 'success', msg: string) => {
    setSnackSeverity(severity)
    setSnackMessage(msg)
    setSnackOpen(true)
  }

  const handleClose = () => {
    props.setOpenDialog(false)
  }

  // 每次打开弹窗都用最新的 props 重置表单（取消后再打开不会残留上次未保存的内容）
  // socials 用内容做依赖：父组件每次渲染都会生成新对象，直接依赖引用会不断重置
  const socialsKey = JSON.stringify(props.socials ?? {})
  useEffect(() => {
    if (!props.openDialog) return
    setAvatarUrl(props.avatarUrl || '')
    setUsername(props.username || '')
    setBio(props.bio || '')
    setSocials({ ...EMPTY_SOCIALS, ...props.socials })
    setTouched({})
    setSubmitted(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.openDialog, props.avatarUrl, props.username, props.bio, socialsKey])

  // 规范化结果：value 是将要保存的值，error 是校验信息
  const normalized = useMemo(
    () => SOCIALS.map((cfg) => ({ cfg, ...normalizeSocial(cfg, socials[cfg.key]) })),
    [socials]
  )

  const uploadFile = async (files: FileList | null) => {
    if (!files || files.length !== 1) return toast('error', 'Only support uploading one file')

    try {
      const formData = new FormData()
      formData.append('files', files[0])

      const response: any = await axios.post(Http.upload_file, formData, {
        params: { file_type: FILE_TYPE.Image },
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (response.result && response.data.urls?.[0]) {
        setAvatarUrl(response.data.urls[0])
      } else {
        toast('error', 'Upload Failed')
      }
    } catch (e) {
      toast('error', 'The network error occurred. Please try again later.')
      console.error(e)
    }
  }

  const onClickEditProfile = async () => {
    setSubmitted(true)

    const firstInvalid = normalized.find((n) => n.error)
    if (firstInvalid) {
      toast('error', `Please check your ${firstInvalid.cfg.label} link`)
      document.getElementById(`social-${firstInvalid.cfg.key}`)?.focus()
      return
    }

    // 保存规范化后的值：去掉 @、补全 website 的协议，库里保持干净
    const socialPayload = Object.fromEntries(normalized.map((n) => [n.cfg.key, n.value]))

    setSaving(true)
    try {
      const response: any = await axios.put(Http.user_setting, {
        username,
        avatar_url: avatarUrl,
        bio,
        ...socialPayload,
      })

      if (response.result) {
        toast('success', 'Update successfully')
        handleClose()
        window.location.href = `/profile/${username}`
      } else {
        toast('error', response.message || 'Update failed')
      }
    } catch (e) {
      toast('error', 'The network error occurred. Please try again later.')
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={props.openDialog} onOpenChange={(open) => props.setOpenDialog(open)}>
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Update your profile information, avatar and social links.
          </DialogDescription>
        </DialogHeader>

        {/* 内容较多：只让中间区域滚动，标题和按钮始终可见 */}
        <div className="-mx-6 px-6 max-h-[55vh] sm:max-h-[60vh] overflow-y-auto">
          <div className="flex flex-col items-center gap-6 py-4">
            <div className="relative">
              <label htmlFor="avatar-upload" className="cursor-pointer group">
                <Avatar className="w-24 h-24 border-4 border-background shadow-md">
                  <AvatarImage src={GetAbosolutePathByRelative(avatarUrl, 'avatar')} alt="Avatar" />
                  <AvatarFallback>
                    <User className="w-12 h-12 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>

                <Badge className="absolute bottom-0 right-0 h-8 w-8 rounded-full flex items-center justify-center border-2 border-background hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  <Camera className="w-4 h-4" />
                </Badge>
              </label>

              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  uploadFile(e.target.files)
                  e.target.value = '' // 允许重复选择同一文件
                }}
              />
            </div>

            <div className="w-full space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username"
              />
            </div>

            <div className="w-full space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Describe your profile"
              />
            </div>

            {/* ===== Social links ===== */}
            <div className="w-full space-y-3 border-t pt-5">
              <div>
                <h4 className="text-sm font-semibold">Social links</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Enter a username or a full link. Leave blank to hide.
                </p>
              </div>

              {normalized.map(({ cfg, error }) => {
                const Icon = cfg.icon
                const showError = !!error && (submitted || touched[cfg.key])
                return (
                  <div key={cfg.key} className="space-y-1">
                    <div className="relative">
                      <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={`social-${cfg.key}`}
                        aria-label={cfg.label}
                        aria-invalid={showError}
                        className={cn(
                          'pl-9',
                          showError && 'border-red-500 focus-visible:ring-red-500'
                        )}
                        maxLength={200}
                        value={socials[cfg.key]}
                        placeholder={cfg.placeholder}
                        onChange={(e) =>
                          setSocials((prev) => ({ ...prev, [cfg.key]: e.target.value }))
                        }
                        onBlur={() => setTouched((prev) => ({ ...prev, [cfg.key]: true }))}
                      />
                    </div>
                    {showError && <p className="text-xs text-red-500 pl-1">{error}</p>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={handleClose} disabled={saving}>
            Cancel
          </Button>
          <Button type="button" onClick={onClickEditProfile} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
