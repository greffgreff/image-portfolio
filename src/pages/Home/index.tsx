import './style.css'
import Sidebar from '../../components/Sidebar'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <div className='home-container'>
      <Sidebar title='Home'>
        <Link to='/collections'>Collections</Link>
      </Sidebar>
    </div>
  )
}
