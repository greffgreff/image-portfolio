import './style.css'
import Sidebar from '../../components/Sidebar'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <Sidebar title='Collections'>
      <Link to='/collections/nature'>My Nature</Link>
      <Link to='/collections/mountain'>My Mountains</Link>
      <Link to='/collections/river'>My Rivers</Link>
      <Link to='/collections/trees'>My Trees</Link>
      <Link to='/collections/space'>My Space</Link>
      <br />
      <Link to='/'>Back to home</Link>
    </Sidebar>
  )
}
