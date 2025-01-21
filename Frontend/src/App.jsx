import React from 'react'
import {Routes,Route} from 'react-router-dom'
import UserRegisterPage from './Pages/UserRegisterPage/UserRegisterPage'
import UserLoginPage from './Pages/UserLoginPage/UserLoginPage'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/user-register" element={<UserRegisterPage/>} />
        <Route path="/user-login" element={<UserLoginPage/>} />
      </Routes>
    </>
  )
}

export default App
