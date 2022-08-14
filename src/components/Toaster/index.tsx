import { XIcon } from '@heroicons/react/solid'
import React from 'react'
import { ToastContainer } from 'react-toastify'

const contextClass = {
  default: 'bg-indigo-600',
  error: 'bg-red-600',
  info: 'bg-gray-600',
  success: 'bg-green-600',
  warning: 'bg-orange-400',
}

const CloseButton = ({ closeToast }: { closeToast: any }) => (
  <XIcon className="h-4 w-4 text-white" onClick={closeToast} />
)

function Toaster() {
  return (
    <ToastContainer
      theme="colored"
      hideProgressBar={true}
      closeButton={CloseButton}
      bodyClassName={() => 'text-sm flex font-white font-med block p-3'}
      toastClassName={(toast) =>
        contextClass[toast?.type || 'default'] +
        ' h-[40px] justify-between flex items-center rounded-sm mb-2 pr-4 cursor-pointer'
      }
    />
  )
}

export default Toaster
