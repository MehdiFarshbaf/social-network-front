import { ResponseApi } from "./publlicInterfaces";
import { IProfile } from "./userInterfaces";

export interface IResultRegister extends ResponseApi {
}
export interface IResultLogin extends ResponseApi {
    data: {
        profile: IProfile,
        token: string
    }
}