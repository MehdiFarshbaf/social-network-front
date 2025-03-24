import { toast } from "react-toastify"

export const showSuccessMessage = (message: string) => {
    toast.success(message)
}

export const handleShowError = (data: any) => {
    if (data.errors) {
      const keys = Object.keys(data.errors)
      toast.error(data.errors[keys[0]][0])
    } else {
      toast.error(data.message)
    }
  }