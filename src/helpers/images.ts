export function getDimensions(url: string): Promise<{
  width: number
  height: number
}> {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = () => {
      const dimensions = {
        width: image.width,
        height: image.height
      }
      resolve(dimensions)
    }

    image.onerror = () => {
      reject(new Error('Failed to load image: ' + url))
    }

    image.src = url
  })
}
