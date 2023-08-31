import './style.css'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchRandomImages } from '../../api/images'
import { Image, getImageInfo } from '../../helpers/images'
import Sidebar from '../../components/Sidebar'

export default () => {
  const [image, setImage] = useState<Image>()
  const { id } = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const origin = queryParams.get('origin')
  const [long, setLong] = useState(false)

  useEffect(() => {
    fetchRandomImages().then(async urls => {
      const url = urls[id as unknown as number]
      const info = await getImageInfo(url)
      setImage(info)
    })
  }, [])

  return (
    <div className={'media-component'}>
      <Sidebar title={id}>
        <div>
          {image?.width} x {image?.height}
        </div>
        <div>{Math.floor(image?.size! * 100) / 100} MB</div>
        {origin && <Link to={'/collections/' + origin}>Back to collection</Link>}
      </Sidebar>

      <img src={image?.url} />
    </div>
  )
}
