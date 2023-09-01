import './style.css'
import { useEffect, useRef, useState } from 'react'
import { fetchRandomImages } from '../../api/images'
import { getImageInfo, Image } from '../../helpers/images'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import Sidebar from '../../components/Sidebar'

export default () => {
  const { id } = useParams()
  const [images, setImages] = useState<Image[]>([])
  const [columnCount, setColumnCount] = useState(3)
  const bottom = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    loadImages()
  }, [])

  const columns: Image[][] = Array.from({ length: columnCount }, () => [])

  images.forEach(image => {
    const columnHeights = columns.map(column =>
      column.reduce((accumulator, img) => accumulator + img.height, 0)
    )
    const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
    columns[shortestColumnIndex].push(image)
  })

  async function loadImages() {
    fetchRandomImages(id!).then(async urls => {
      const newImages = await Promise.all(urls.map(async url => await getImageInfo(url)))
      setImages([...images, ...newImages])
    })
  }

  function handleScroll(event: React.UIEvent<HTMLDivElement, UIEvent>) {
    const target = event.target as HTMLDivElement
    if (target.scrollTop >= target.scrollHeight - target.clientHeight) {
      loadImages()
    }
  }

  return (
    <div className='collection-container'>
      <Sidebar title={id}>
        <div>An album of random images of {id}.</div>
        <div>{images.length} images</div>
        <div style={{ display: 'flex', gap: 15 }}>
          <div>{columnCount} columns</div>
          <input
            type='range'
            min='1'
            max='10'
            value={columnCount}
            onChange={e => setColumnCount(parseInt(e.target.value))}
          />
        </div>
        <br />
        <Link to='/collections'>Back to collections</Link>
      </Sidebar>

      <div className='collection-columns' onScroll={handleScroll}>
        {columns.map((column, j) => (
          <div key={j} className='collection-column'>
            {column.map((image, i) => (
              <div key={image.id} className='collection-image-container' id={image.id}>
                <Link
                  to={`/content/My Image?origin=${id}&url=${image.url}&prev=${
                    column[i - 1]!?.url
                  }&next=${column[i + 1]!?.url}`}
                >
                  <img src={image.url} />
                </Link>
              </div>
            ))}
          </div>
        ))}

        <div ref={bottom} style={{ display: 'none' }} />
      </div>
    </div>
  )
}
