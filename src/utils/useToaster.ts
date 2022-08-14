import { toast } from 'react-toastify'

type ToastType = 'warning' | 'success' | 'info' | 'error' | 'default'

export default function showToast(message: string, type: ToastType): void {
  toast(message, { type: type })
}
