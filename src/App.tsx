import './App.css'
import { useEffect, useState } from 'react'
import { fetchRandomImages } from './api/images'
import { getDimensions } from './helpers/images'

interface Image {
  url: string
  width: number
  height: number
}

export default () => {
  const [images, setImages] = useState<Image[]>([])
  const [columnCount, setColumnCount] = useState(4)

  useEffect(() => {
    fetchRandomImages().then(async urls => {
      const imageObjects = await Promise.all(
        urls.map(async url => {
          const { width, height } = await getDimensions(url)
          return { url, width, height }
        })
      )
      setImages(imageObjects)
    })
  }, [])

  const columns: Image[][] = Array.from({ length: columnCount }, () => [])

  images.forEach(image => {
    const columnHeights = columns.map(column =>
      column.reduce((accumulator, img) => accumulator + img.height, 0)
    )

    const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))

    columns[shortestColumnIndex].push(image)
  })

  return (
    <main>
      <div className='controls'>
        <input
          type='range'
          id='columnCount'
          min='1'
          max='10'
          value={columnCount}
          onChange={e => setColumnCount(parseInt(e.target.value))}
        />
      </div>
      <div className='columns'>
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className='column'>
            {column.map((image, imageIndex) => (
              <div className='image'>
                <img key={imageIndex} src={image.url} alt={`Image ${imageIndex}`} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}
