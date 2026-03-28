import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Meal from './component/Meal'

import { Routes, Route } from 'react-router-dom'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Meal />} />
      </Routes>

    </>
  )
}

export default App
