import React from 'react'
import { Link } from 'react-router-dom'

import { SignupForm } from '@/features/authentication'

function Signup() {
  return (
    <section className="h-screen w-screen bg-white">
      <div className="flex">
        <div className="flex h-screen flex-1 items-center justify-center ">
          <div className="w-[318.5px]">
            <h1 className="text-4xl font-bold">Welcome to Movea</h1>
            <p className="mt-4 text-sm text-gray-600">
              Go sign up and enjoy our film and tv series.
            </p>
            <SignupForm />
            <p className="mt-4 text-center text-xs text-gray-400">
              Already have an account?{' '}
              <Link className="text-emerald-500" to="/">
                Log in
              </Link>
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

export default Signup
