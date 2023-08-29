import { Link, useLocation } from 'react-router-dom'
import './style.css'

export default () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const origin = queryParams.get('origin')

  return (
    <div style={{ display: 'grid' }}>
      <Link to={'/collections/' + origin}>Back to collection</Link>
    </div>
  )
}
