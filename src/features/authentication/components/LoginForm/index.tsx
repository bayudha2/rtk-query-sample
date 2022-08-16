import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { useLoginReqresMutation } from '@/features/authentication'
import useCookie from '@/utils/useCookies'

interface InitialValue {
  email: string
  password: string
}

const initialValue: InitialValue = {
  email: '',
  password: '',
}

function LoginForm({
  autoFill,
}: {
  autoFill: { email: string; password: string }
}) {
  const [login, { isLoading }] = useLoginReqresMutation()
  const navigate = useNavigate()

  const { setUserCookie } = useCookie()

  useEffect(() => {
    setFieldValue('email', autoFill.email)
    setFieldValue('password', autoFill.password)
    setValues({ email: autoFill.email, password: autoFill.password })
  }, [autoFill])

  const {
    isValid,
    dirty,
    setValues,
    setFieldValue,
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    errors,
    values,
  } = useFormik({
    initialValues: initialValue,
    onSubmit: async (values: InitialValue) => {
      const userData = await login(values).unwrap()

      setUserCookie({ Token: userData.token })
      navigate('/search')
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    }),
  })

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="mt-8 mb-1 text-sm font-semibold text-gray-600"
        >
          Email
        </label>
        <input
          className={`h-[45px] w-full rounded-md border border-solid ${
            touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
          }  text-sm placeholder-gray-400 outline-none focus:border-emerald-500 focus:outline-none focus:ring-0`}
          placeholder="Enter your email"
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        {touched.email && errors.email ? (
          <small className="mt-1 text-red-500">{errors.email}</small>
        ) : null}
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="password"
          className="mt-4 mb-1 text-sm font-semibold text-gray-600"
        >
          Password
        </label>
        <input
          className={`h-[45px] w-full rounded-md border border-solid ${
            touched.password && errors.password
              ? 'border-red-500'
              : 'border-gray-300'
          }  text-sm placeholder-gray-400 outline-none focus:border-emerald-500 focus:outline-none focus:ring-0`}
          placeholder="Enter your password"
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        {touched.password && errors.password ? (
          <small className="mt-1 text-red-500">{errors.password}</small>
        ) : null}
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-emerald-500 py-3 font-semibold text-white disabled:bg-gray-400"
        disabled={!(isValid && dirty)}
      >
        {isLoading ? 'Logging...' : 'Sign in'}
      </button>
    </form>
  )
}

export default LoginForm
