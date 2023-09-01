import { v4 as uuid } from 'uuid'

export interface Image {
  id: any
  url: string
  width: number
  height: number
  size: number
  createdAt: Date
  updatedAt?: Date
}

export function getImageInfo(url: string): Promise<Image> {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = async () => {
      const response = await fetch(url)
      const contentLength = response.headers.get('content-length')
      const sizeInBytes = contentLength ? parseInt(contentLength, 10) : 0
      const sizeInMB = sizeInBytes / (1024 * 1024) // Convert to megabytes

      const dimensions = {
        id: uuid(),
        url,
        width: image.width,
        height: image.height,
        size: sizeInMB,
        createdAt: new Date()
      }

      resolve(dimensions)
    }

    image.onerror = () => {
      reject(new Error('Failed to load image: ' + url))
    }

    image.src = url
  })
}
