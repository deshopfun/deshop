import { useSnackPresistStore } from '@/lib'
import { FILE_TYPE } from '@/packages/constants'
import { useCallback, useEffect, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Trash2, Save, Settings, Image as ImageIcon } from 'lucide-react'
import { GetAbosolutePathByRelative } from '@/utils/image'

type Props = {
  productId: number
}

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-green-100 text-green-700 border-green-200' },
  archived: { label: 'Archived', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  draft: { label: 'Draft', className: 'bg-amber-100 text-amber-700 border-amber-200' },
}

const MAX_FILE_SIZE_BYTES = 3 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']

const ProductStory = ({ productId }: Props) => {
  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [description, setDescription] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [coverImageCaption, setCoverImageCaption] = useState('')
  const [storyStatus, setStoryStatus] = useState('draft')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

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
  const resetForm = () => {
    setSlug('')
    setTitle('')
    setSubTitle('')
    setDescription('')
    setCoverImage('')
    setCoverImageCaption('')
    setStoryStatus('draft')
  }

  const init = useCallback(async (id: number) => {
    try {
      const response: any = await axios.get(Http.product_story, {
        params: { product_id: id },
      })
      if (response.result) {
        const d = response.data ?? {}
        setSlug(d.slug ?? '')
        setTitle(d.title ?? '')
        setSubTitle(d.sub_title ?? '')
        setDescription(d.body_html ?? '')
        setCoverImage(d.cover_image ?? '')
        setCoverImageCaption(d.cover_image_caption ?? '')
        setStoryStatus(d.story_status ?? 'draft')
      } else {
        resetForm()
      }
    } catch {
      showError('Network error. Please try again later.')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (productId) {
      init(productId)
    }
  }, [productId, init])

  const validateFile = (file: File) => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      showError('Unsupported file type. Please upload JPG / PNG / GIF / SVG.')
      return false
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      showError('File too large. Max size is 3MB.')
      return false
    }
    return true
  }

  const uploadFile = async (files: FileList | null, inputEl?: HTMLInputElement | null) => {
    if (!files || files.length !== 1) {
      showError('Only support uploading one file')
      return
    }
    const file = files[0]
    if (!validateFile(file)) {
      if (inputEl) inputEl.value = ''
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('files', file)

      const response: any = await axios.post(Http.upload_file, formData, {
        params: { file_type: FILE_TYPE.Image },
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (response.result && response.data?.urls?.[0]) {
        setCoverImage(response.data.urls[0])
        showSuccess('Image uploaded')
      } else {
        showError('Upload failed')
      }
    } catch {
      showError('Network error. Please try again later.')
    } finally {
      setUploading(false)
      // Allow re-selecting the same file again.
      if (inputEl) inputEl.value = ''
    }
  }

  const onClickRemoveCoverImage = () => {
    setCoverImage('')
  }

  const onClickUpdateProductStory = async (status?: string) => {
    if (!title.trim()) return showError('Incorrect title input')
    if (!slug.trim()) return showError('Incorrect slug input')
    if (!subTitle.trim()) return showError('Incorrect sub title input')
    if (!description.trim()) return showError('Incorrect description input')
    if (!coverImage) return showError('Incorrect cover image input')
    if (!coverImageCaption.trim()) return showError('Incorrect cover image caption input')

    const lowerSlug = slug.toLowerCase()
    setSaving(true)
    try {
      const response: any = await axios.post(Http.product_story, {
        product_id: productId,
        slug: lowerSlug,
        title,
        sub_title: subTitle,
        body_html: description,
        cover_image: coverImage,
        cover_image_caption: coverImageCaption,
        story_status: status || storyStatus,
      })
      if (response.result) {
        await init(productId)
        showSuccess('Updated successfully')
      } else {
        showError('Update failed')
      }
    } catch {
      showError('Network error. Please try again later.')
    } finally {
      setSaving(false)
    }
  }

  const currentStatus = statusConfig[storyStatus] ?? statusConfig.draft

  return (
    <div className="flex flex-col gap-4 py-4">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-sky-50 flex items-center justify-center">
                <Settings className="h-4 w-4 text-sky-500" />
              </div>
              <h3 className="font-semibold">Story Info</h3>
            </div>
            <div className="flex items-center gap-2">
              {storyStatus === 'active' && (
                <Button
                  size="sm"
                  className="h-9 bg-green-500 hover:bg-green-600 text-white gap-1.5"
                  onClick={() => (window.location.href = `/story/${slug}`)}
                >
                  See Website
                </Button>
              )}
              <Button
                className="h-9 bg-sky-500 hover:bg-sky-600 text-white gap-1.5"
                onClick={() => {
                  onClickUpdateProductStory()
                }}
                disabled={saving}
              >
                <Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status</span>
              <span
                className={cn(
                  'text-xs font-semibold px-2.5 py-1 rounded-full border',
                  currentStatus.className
                )}
              >
                {currentStatus.label}
              </span>
            </div>
            <div className="flex gap-2">
              {storyStatus !== 'active' && (
                <Button
                  size="sm"
                  className="h-8 bg-green-500 hover:bg-green-600 text-white text-xs"
                  onClick={() => onClickUpdateProductStory('active')}
                >
                  Active
                </Button>
              )}
              {storyStatus !== 'archived' && (
                <Button
                  size="sm"
                  className="h-8 bg-blue-500 hover:bg-blue-600 text-white text-xs"
                  onClick={() => onClickUpdateProductStory('archived')}
                >
                  Archived
                </Button>
              )}
              {storyStatus !== 'draft' && (
                <Button
                  size="sm"
                  className="h-8 bg-amber-500 hover:bg-amber-600 text-white text-xs"
                  onClick={() => onClickUpdateProductStory('draft')}
                >
                  Draft
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Story title"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="Story slug"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>
              Sub Title <span className="text-red-500">*</span>
            </Label>
            <Input
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              placeholder="Story Sub Title"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>
              Description (supports HTML) <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a detailed description..."
              className="min-h-32 resize-y"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-orange-50 flex items-center justify-center">
              <ImageIcon className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold">Cover Image <span className="text-red-500">*</span></h3>
              <p className="text-xs text-muted-foreground">Max 3MB · JPG / PNG / GIF / SVG</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {coverImage ? (
              <div className="relative group aspect-square rounded-xl overflow-hidden border">
                <img
                  src={GetAbosolutePathByRelative(coverImage)}
                  alt="Story cover"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  aria-label="Remove cover image"
                  onClick={onClickRemoveCoverImage}
                  className="absolute top-1.5 right-1.5 h-7 w-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <label
                className={cn(
                  'aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer transition-colors',
                  uploading ? 'border-sky-300 bg-sky-50' : 'hover:border-sky-300 hover:bg-sky-50'
                )}
              >
                <span className="text-xs text-muted-foreground">
                  {uploading ? 'Uploading...' : 'Click to upload'}
                </span>
                <input
                  type="file"
                  accept={ACCEPTED_IMAGE_TYPES.join(',')}
                  className="sr-only"
                  disabled={uploading}
                  onChange={(e) => uploadFile(e.target.files, e.target)}
                />
              </label>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>
              Cover Image Caption <span className="text-red-500">*</span>
            </Label>
            <Input
              value={coverImageCaption}
              onChange={(e) => setCoverImageCaption(e.target.value)}
              placeholder="caption of your story cover image"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductStory
