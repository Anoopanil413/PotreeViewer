import { useState } from 'react'

import './App.css'
import Potreeviewer from './pages/Potreeviewer'
import Landing from './pages/Landing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Landing/>
    {/* <Potreeviewer/> */}

    </>
  )
}

export default App
