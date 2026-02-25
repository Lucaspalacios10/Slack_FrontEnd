import React from 'react'
import { Route, Routes } from 'react-router'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import AuthContextProvider from './Context/authContext'
import AuthMiddleware from './Middlewares/AuthMiddleware'
import WorkspaceContextProvider from './Context/workspaceContext'
import MessageContextProvider from './Context/messageContext'
import CreateWorkspaceScreen from './Screens/WorkSpaceScreen/CreateWorkSpaceScreen'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import MessageList from './Context/MessageList.jsx'
import './App.css'

function App() {


  return (
    <AuthContextProvider>
      <WorkspaceContextProvider>
        <MessageContextProvider>
          <Routes>
          <Route path='/' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route element={<AuthMiddleware />}>
            <Route path='/home' element={<HomeScreen />} />
            <Route path='/create-workspace' element={<CreateWorkspaceScreen />} />
            <Route path='/workspace/:id' element={<MessageList />} />
          </Route>
          </Routes>
        </MessageContextProvider>
      </WorkspaceContextProvider>
    </AuthContextProvider>
  )
}

export default App