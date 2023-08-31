import './style.css'
import Sidebar from '../../components/Sidebar'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <Sidebar title='Home'>
      <Link to='/collections'>Collections</Link>
    </Sidebar>
  )
}
