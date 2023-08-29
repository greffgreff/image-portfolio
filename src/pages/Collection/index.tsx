import './style.css'
import { useEffect, useState } from 'react'
import { fetchRandomImages } from '../../api/images'
import { getDimensions } from '../../helpers/images'
import { Link, useParams } from 'react-router-dom'
import Controls from '../../components/Controls'

interface Image {
  url: string
  width: number
  height: number
}

export default () => {
  const { id } = useParams()
  const [images, setImages] = useState<Image[]>([])
  const [columnCount, setColumnCount] = useState(4)

  useEffect(() => {
    fetchRandomImages().then(async urls => {
      const imageObjects = await Promise.all(
        urls.map(async (url: string) => {
          const { width, height } = await getDimensions(url)
          return { url, width, height }
        })
      )
      setImages([...images, ...imageObjects])
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
        <Link to='/collections'>Back to collections</Link>
        <input
          type='range'
          id='columnCount'
          min='1'
          max='10'
          value={columnCount}
          onChange={e => setColumnCount(parseInt(e.target.value))}
        />
      </Controls>
      <div className='columns'>
        {columns.map((column, i) => (
          <div key={i} className='column'>
            {column.map((image, j) => (
              <Link to={buildUrl(`${j + 1}`)}>
                <div className='image'>
                  <img key={j} src={image.url} alt={`Image ${j}`} />
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}
