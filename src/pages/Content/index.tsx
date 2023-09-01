import './style.css'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Image, getImageInfo } from '../../helpers/images'
import Sidebar from '../../components/Sidebar'

export default () => {
  const { id } = useParams()
  const [image, setImage] = useState<Image>()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const origin = queryParams.get('origin')
  const url = queryParams.get('url')

  useEffect(() => {
    getImageInfo(url!).then(setImage)
  }, [])

  return (
    <main>
      <Sidebar title={id}>
        {image ? (
          <>
            <div>
              {image?.width} x {image?.height} • {Math.floor(image?.size! * 100) / 100} MB
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
        <br />
        {origin && <Link to={'/collections/' + origin}>Back to collection</Link>}
      </Sidebar>

      <img src={image?.url} />
    </main>
  )
}