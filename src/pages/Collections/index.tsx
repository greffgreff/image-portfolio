import './style.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Collection, fetchCollections } from '../../api/collections'
import { Image, getImageInfo } from '../../helpers/images'
import Sidebar from '../../components/Sidebar'
import Columns from '../../components/Columns'

export default () => {
  const [collections, setCollections] = useState<Collection[]>([])
  const [images, setImages] = useState<Image[]>([])

  useEffect(() => {
    fetchCollections().then(async collections => {
      setCollections(collections)
      const thumbs = collections.map(c => c.thumbnail)
      const images = await Promise.all(thumbs.map(async url => await getImageInfo(url)))
      setImages(images)
    })
  }, [])

  return (
    <div className='collections-container'>
      <Sidebar title='Collections'>
        {collections.length ? (
          collections.map(collection => (
            <Link to={'/collections/' + collection.name}>{collection.name}</Link>
          ))
        ) : (
          <div>Loading...</div>
        )}
        <br />
        <Link to='/'>Back to home</Link>
      </Sidebar>

      <Columns images={images} count={3} />
    </div>
  )
}
