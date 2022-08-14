import { useFormik } from 'formik'
import React from 'react'
// import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

// import { useSignupMutation } from '@/features/authentication'

interface InitialValue {
  name: string
  email: string
  password: string
}

const initialValue: InitialValue = {
  email: '',
  name: '',
  password: '',
}

function SignupForm() {
  // const [signup, { isLoading }] = useSignupMutation()

  const {
    isValid,
    dirty,
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    errors,
    values,
  } = useFormik({
    initialValues: initialValue,
    onSubmit: async () => {
      try {
        // const userData = await signup(values).unwrap()
        // navigate('/')
      } catch (err) {
        // eslint-disable-next-line no-alert
        alert('err')
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      name: Yup.string().required('Required'),
      password: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    }),
  })

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label
          htmlFor="name"
          className="mt-8 mb-1 text-sm font-semibold text-gray-600"
        >
          Name
        </label>
        <input
          className="h-[45px] w-full rounded-md border border-solid border-gray-300 px-3 py-2 text-sm placeholder-gray-400 outline-none focus:border-emerald-500 focus:outline-none focus:ring-0"
          placeholder="Enter your name"
          id="name"
          name="name"
          type="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
        />
        {touched.name && errors.name ? (
          <small className="mt-1 text-red-500">{errors.name}</small>
        ) : null}
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="mt-4 mb-1 text-sm font-semibold text-gray-600"
        >
          Email
        </label>
        <input
          className="h-[45px] w-full rounded-md border border-solid border-gray-300 text-sm placeholder-gray-400 outline-none focus:border-emerald-500 focus:outline-none focus:ring-0"
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
          className="h-[45px] w-full rounded-md border border-solid border-gray-300 text-sm placeholder-gray-400 outline-none focus:border-emerald-500 focus:outline-none focus:ring-0"
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
        {'Sign up'}
      </button>
    </form>
  )
}

export default SignupForm
