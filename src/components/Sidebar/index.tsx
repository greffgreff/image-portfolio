import './style.css'
import { PropsWithChildren } from 'react'

interface SliderbarProps extends PropsWithChildren {
  title?: string
}

export default ({ title, children }: SliderbarProps) => {
  return (
    <div className='sidebar-container'>
      {title && <h1>{title}</h1>}
      {children}
    </div>
  )
}
