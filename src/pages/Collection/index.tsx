import './style.css'
import { useEffect, useRef, useState } from 'react'
import { fetchRandomImages } from '../../api/images'
import { getImageInfo, Image } from '../../helpers/images'
import { Link, useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import Columns from '../../components/Columns'

export default () => {
  const { id } = useParams()
  const [images, setImages] = useState<Image[]>([])
  const [columnCount, setColumnCount] = useState(3)
  const bottom = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    loadImages()
  }, [])

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

      <Columns count={columnCount} images={images} onScroll={handleScroll} />
    </div>
  )
}
