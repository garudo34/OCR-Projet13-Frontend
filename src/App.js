import './App.css'
import { Route, Routes } from 'react-router'
import { Home } from './pages/home/home'
import { Login } from './pages/login/login'
import { User } from './pages/user/user'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<User />} />
    </Routes>
  )
}

export default App
