import {toast} from 'react-toastify'
import moment from "jalali-moment"

export const changeToFormData = (body: any) => {
    const keys = Object.keys(body)
    let formData: FormData = new FormData()
    keys.forEach(item => {
        formData.append(item, body[item])
    })
    return formData
}

export const showPersianDate = (date: string,format?:string) => {
    return moment(date).locale("fa").format(format ? format : "YYYY/MMM/DD")
}
