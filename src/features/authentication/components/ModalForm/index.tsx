import { XCircleIcon, TrashIcon } from '@heroicons/react/solid'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { string, object } from 'yup'

import {
  useDeleteUserMutation,
  useUpdateUserMutation,
  useAddUserMutation,
} from '@/features/authentication'
import showToast from '@/utils/useToaster'

import './index.scss'

interface InitialValue {
  name: string
  email: string
  location: string
}

function ModalForm({
  modal,
  data,
}: {
  modal: boolean | undefined
  data?: any
}) {
  const initialValue: InitialValue = {
    email: data?.email || '',
    location: data?.location || '',
    name: data?.name || '',
  }

  const navigate = useNavigate()

  const [addUser, { isLoading: loadingAdd, isSuccess: successAdd }] =
    useAddUserMutation()
  const [deleteUser, { isLoading, isSuccess }] = useDeleteUserMutation()
  const [updateUser, { isLoading: loadingUpdate, isSuccess: successUpdate }] =
    useUpdateUserMutation()
  const handleDelete = () => {
    deleteUser(data.id)
  }

  useEffect(() => {
    if (isSuccess) {
      showToast('Success delete user!', 'success')
    }
    if (successUpdate) {
      showToast('Success update user!', 'success')
    }
    if (successAdd) {
      showToast('Success add new user!', 'success')
    }

    if (successAdd || successUpdate || isSuccess) {
      navigate('/users')
    }
  }, [isSuccess, successUpdate, successAdd])

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
    onSubmit: async (values: InitialValue) => {
      data ? updateUser({ id: data.id, ...values }) : addUser({ ...values })
    },
    validationSchema: object({
      email: string().email('Invalid email address').required('Required'),
      location: string().required('Required'),
      name: string().required('Required'),
    }),
  })

  return (
    <div className="absolute top-1/2 left-1/2 z-20 h-[36%] w-[34%] -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white">
      <div className="flex items-center justify-between p-4">
        <h1 className="px-4 text-2xl font-bold">User Profile Options</h1>
        {modal && (
          <Link to={{ pathname: '/users' }}>
            <XCircleIcon className="h-6 w-6 text-gray-500" />
          </Link>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-4 flex items-center gap-4 px-8">
          <label
            htmlFor="email"
            className="mb-1 w-20 text-sm font-semibold text-gray-600"
          >
            Email
          </label>
          <input
            className={`h-[45px] w-full rounded-xl border border-solid ${
              touched.email && errors.email
                ? 'border-red-500'
                : 'border-gray-300'
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
        <div className="mt-4 flex items-center gap-4 px-8">
          <label
            htmlFor="name"
            className="mb-1 w-20 text-sm font-semibold text-gray-600"
          >
            Name
          </label>
          <input
            className={`h-[45px] w-full rounded-xl border border-solid ${
              touched.name && errors.name ? 'border-red-500' : 'border-gray-300'
            }  px-3 py-2 text-sm placeholder-gray-400 outline-none focus:border-emerald-500 focus:outline-none focus:ring-0`}
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
        <div className="mt-4 flex items-center gap-4 px-8">
          <label
            htmlFor="location"
            className="mb-1 w-20 text-sm font-semibold text-gray-600"
          >
            Location
          </label>
          <input
            className={`h-[45px] w-full rounded-xl border border-solid ${
              touched.location && errors.location
                ? 'border-red-500'
                : 'border-gray-300'
            }  px-3 py-2 text-sm placeholder-gray-400 outline-none focus:border-emerald-500 focus:outline-none focus:ring-0`}
            placeholder="Enter your location"
            id="location"
            name="location"
            type="location"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.location}
          />
          {touched.location && errors.location ? (
            <small className="mt-1 text-red-500">{errors.location}</small>
          ) : null}
        </div>
        <div
          className={`mt-4 flex items-center ${
            data ? 'justify-between' : 'justify-end'
          } rounded-b-lg bg-gray-100 px-6 py-5`}
        >
          {data && (
            <button
              type="button"
              onClick={handleDelete}
              className="btn__delete flex items-center gap-2 rounded-md bg-gray-200 px-3 py-2 text-xs transition-all ease-in-out hover:bg-red-500  hover:text-white"
            >
              <TrashIcon className="trash-icon" />
              {isLoading ? 'Removing...' : 'Remove'}
            </button>
          )}
          <div className="flex items-center gap-4">
            <Link to={{ pathname: '/users' }} className="text-sm text-gray-500">
              Cancel
            </Link>
            <button
              disabled={!(isValid && dirty)}
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-md disabled:pointer-events-none disabled:cursor-not-allowed"
            >
              {loadingUpdate || loadingAdd
                ? 'Saving...'
                : data
                ? 'Save Changes'
                : 'Save User'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ModalForm
