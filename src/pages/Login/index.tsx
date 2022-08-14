import React, { useState } from 'react'

import { LoginForm } from '@/features/authentication'

function Login() {
  const [toggle, setToggle] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  })

  const handleFill = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setToggle({
      email: 'Developer1998@gmail.com',
      password: '123456',
    })
  }

  return (
    <section className="h-screen w-screen bg-white">
      <div className="flex">
        <div className="flex h-screen flex-1 items-center justify-center ">
          <div className="w-[318.5px]">
            <h1 className="text-4xl font-bold">Welcome back</h1>
            <p className="mt-4 text-sm text-gray-600">
              Welcome back! Please enter your details.
            </p>
            <LoginForm autoFill={toggle} />
            <p className="mt-4 text-center text-xs text-gray-400">
              Don't have an account?{' '}
              {/* <Link className="text-emerald-500" to="/signup">
                Sign up
              </Link> */}
              <button
                type="button"
                onClick={handleFill}
                className="text-emerald-500"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
        <div className="flex h-screen flex-1 items-center justify-center bg-teal-50">
          <h2>
            <figure>
              <img src="/icons/favicon.svg" alt="fav_icon" />
            </figure>
          </h2>
        </div>
      </div>
    </section>
  )
}

export default Login
