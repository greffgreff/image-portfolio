import './style.css'
import Controls from '../../components/Controls'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <Controls title='Home'>
      <Link to='/collections'>Collections</Link>
    </Controls>
  )
}
