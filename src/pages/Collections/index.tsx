import Controls from '../../components/Controls'
import './style.css'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <Controls title='Collections'>
      <Link to='/'>Back to home</Link>
      <Link to='/collections/my-collection'>My collection</Link>
    </Controls>
  )
}
