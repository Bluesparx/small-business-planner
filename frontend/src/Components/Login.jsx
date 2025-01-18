import React from 'react'
import { LoginForm } from '../../components/ui/LoginForm'

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh] ">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login;
