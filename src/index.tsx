import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Collections from './pages/Collections'
import Media from './pages/Media'

const root = createRoot(document.getElementById('root')!)

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/collections' element={<Collections />} />
      <Route path='/collections/:id' element={<Collection />} />
      <Route path='/media/:id' element={<Media />} />
    </Routes>
  </BrowserRouter>
)
