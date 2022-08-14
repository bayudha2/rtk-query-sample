const handleClickOutside = ({
  filterElement,
  setShowElement,
}: {
  filterElement: React.MutableRefObject<any>
  setShowElement: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (e: MouseEvent): void => {
    const target = e.target as HTMLElement

    if (
      target.parentElement?.getAttribute('class')?.includes('sort__wrapper') ||
      target.parentElement
        ?.getAttribute('class')
        ?.includes('button__ignore__outside')
    )
      return

    if (!filterElement.current?.contains(target)) {
      setShowElement(false)
    }
  }
}

export default function addOutSideListener({
  filterElement,
  setShowElement,
}: {
  filterElement: React.MutableRefObject<any>
  setShowElement: React.Dispatch<React.SetStateAction<boolean>>
}) {
  document.addEventListener(
    'mousedown',
    handleClickOutside({ filterElement, setShowElement }),
    { once: true }
  )
  return () =>
    document.removeEventListener(
      'mousedown',
      handleClickOutside({ filterElement, setShowElement })
    )
}
