import { IProfile, IUser } from "@/interfaces/userInterfaces";
import { createSlice } from "@reduxjs/toolkit";


interface UserProps {
    profile: IUser | null,
    login: boolean,
}

const initialState: UserProps = {
    profile: null,
    login: false
}

export const userData = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setProfile: (state, action: { payload: IUser }) => {
            return { ...state, ...{ profile: action.payload, login: true } };
        },
    }
})

export const {
    setProfile
} = userData.actions

export default userData.reducer