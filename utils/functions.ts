import { toast } from 'react-toastify'

export const changeToFormData = (body: any) => {
  const keys = Object.keys(body)
  let formData: FormData = new FormData()
  keys.forEach(item => {
    formData.append(item, body[item])
  })
  return formData
}

export const handleShowError = (data: any) => {
  if (data.errors) {
    const keys = Object.keys(data.errors)
    toast.error(data.errors[keys[0]][0])
  } else {
    toast.error(data.message)
  }
}
