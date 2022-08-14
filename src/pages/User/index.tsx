import type { ReactNode } from 'react'
import React from 'react'
import { useLocation } from 'react-router-dom'

import { ModalForm, useGetUserQuery } from '@/features/authentication'

function User() {
  const { state } = useLocation()
  const { modal, id } = state as { id?: string; modal: boolean }
  const { data, isLoading, isSuccess, isError, error } = useGetUserQuery(id, {
    skip: !id,
  })

  let Form: any

  Form = <ModalForm modal={modal} data={data} />

  if (isLoading) {
    Form = (
      <div className="absolute top-1/2 left-1/2 z-20 h-[36%] w-[34%] -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-gray-400 p-4"></div>
    )
  } else if (isSuccess) {
    Form = <ModalForm modal={modal} data={data} />
  } else if (isError) {
    Form = (
      <div className="absolute top-1/2 left-1/2 z-20 h-[36%] w-[34%] -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4">
        <div className="flex items-center justify-center">
          {error as ReactNode}
        </div>
      </div>
    )
  }

  return (
    <div
      className="absolute top-0 left-0 z-10 h-screen w-screen overflow-hidden"
      style={{ background: 'rgba(0, 0, 0, 0.7)' }}
    >
      {Form}
    </div>
  )
}

export default User
