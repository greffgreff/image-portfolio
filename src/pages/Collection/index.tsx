import './style.css'
import { useEffect, useState } from 'react'
import { fetchRandomImages } from '../../api/images'
import { getImageInfo, Image } from '../../helpers/images'
import { Link, useParams } from 'react-router-dom'
import Controls from '../../components/Controls'

export default () => {
  const { id } = useParams()
  const [images, setImages] = useState<Image[]>([])
  const [columnCount, setColumnCount] = useState(4)

  useEffect(() => {
    fetchRandomImages().then(async urls => {
      const imageObjects = await Promise.all(
        urls.map(async (url: string, i: number) => {
          const image = await getImageInfo(url)
          return { id: i, ...image }
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

  const buildUrl = (src: string) => '/media/' + src + '?origin=' + id

  return (
    <main>
      <Controls title='My Collection'>
        <div>An album of random images of nature.</div>
        <div>{images.length} images</div>
        <span>
          <div>{columnCount} columns</div>
          <input
            type='range'
            min='1'
            max='10'
            value={columnCount}
            onChange={e => setColumnCount(parseInt(e.target.value))}
          />
        </span>
        <Link to='/collections'>Back to collections</Link>
      </Controls>

      <div className='columns'>
        {columns.map((column, i) => (
          <div key={i} className='column'>
            {column.map(image => (
              <Link to={buildUrl(image.id)}>
                <div className='image'>
                  <img key={image.id} src={image.url} />
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}
