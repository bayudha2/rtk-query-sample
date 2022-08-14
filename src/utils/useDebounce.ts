let timer: any
function debounce(callbackFunction: any): void {
  clearTimeout(timer)
  timer = setTimeout(() => {
    callbackFunction()
  }, 1000)
}

export default debounce
