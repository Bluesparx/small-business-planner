import React from 'react'
import SignUpForm from '../../components/ui/signUpForm'

const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh] ">
         <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
           <SignUpForm/>
         </div>
       </div>
  )
}

export default SignUp
