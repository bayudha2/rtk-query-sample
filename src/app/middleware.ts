import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { Middleware } from '@reduxjs/toolkit'

import showToast from '@/utils/useToaster'

export const rtkQueryErrorHandler: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.error) showToast(action.payload.error, 'error')
    if (action.payload.status === 401) showToast('Unauthorized', 'error')
    if (action.payload.status === 400)
      showToast(action.payload.data.Message, 'error')
    if (action.payload.data.code === 1)
      showToast(action.payload.data.message, 'error')
  }

  return next(action)
}
