import './style.css'
import Sidebar from '../../components/Sidebar'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <Sidebar title='Collections'>
      <Link to='/'>Back to home</Link>
      <Link to='/collections/my-collection'>My collection</Link>
    </Sidebar>
  )
}
