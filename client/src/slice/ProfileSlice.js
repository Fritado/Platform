
import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    userProfile:null
    //userProfile: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUserProfile(state, value) {
            state.userProfile = value.payload;
        },
        
    },
});

export const {setUserProfile} = profileSlice.actions;
export default profileSlice.reducer;
