import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { FILE_TYPE } from '@/packages/constants'
import type { ApiResponse } from '@/utils/http/types'

type UploadResult = {
  urls: string[]
}

export async function uploadFiles(
  files: File[],
  fileType: string = FILE_TYPE.Image
): Promise<string[]> {
  if (!files.length) return []

  const formData = new FormData()
  files.forEach((file) => formData.append('files', file))

  const response = (await axios.post(Http.upload_file, formData, {
    params: { file_type: fileType },
    headers: { 'Content-Type': 'multipart/form-data' },
  })) as ApiResponse<UploadResult>

  if (!response.result || !response.data?.urls?.length) {
    throw new Error(response.message || 'Upload Failed')
  }

  return response.data.urls
}
