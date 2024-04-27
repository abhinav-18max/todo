import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface userDataType {
    name: string;
    email: string;

}

const initialState: userDataType = {
    name: "Abhinav",
    email: " ",

}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state:userDataType, action: PayloadAction<userDataType>) {
            state.name = action.payload.name;
            state.email = action.payload.email;
        }
    }

})

export const {setUser} = authSlice.actions;
export default authSlice.reducer;