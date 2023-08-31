import './style.css'
import { PropsWithChildren } from 'react'

interface ControlProps extends PropsWithChildren {
  title?: string
}

export default ({ title, children }: ControlProps) => {
  return (
    <div className='controls-container'>
      {title && <h1>{title}</h1>}
      {children}
    </div>
  )
}
