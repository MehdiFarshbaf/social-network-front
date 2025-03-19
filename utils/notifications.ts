import { toast } from "react-toastify"

export const showSuccessMessage = (message: string) => {
    toast.success(message)
}