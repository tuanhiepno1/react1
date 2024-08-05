import { createSlice } from '@reduxjs/toolkit';
export const authSlice = createSlice({
    name: 'Auth', 
    initialState: {daDangNhap: false, user:null, token:null, expiresIn:0, role: null},
    reducers: {
      thoat: (state) => {
        state.daDangNhap = false;
        state.user = null;
        state.token = null;
        state.expiresIn = 0;
        state.role = null;
    },
      dalogin: (state, action) => {    
        state.token = action.payload.token ;
        state.expiresIn = action.payload.expiresIn ;
        state.user = action.payload.userInfo ;
        state.role = action.payload.userInfo.role;
        state.daDangNhap = true;
        console.log("Đã ghi nhận state đăng nhập", state.user) 
      },
    }, 
})
export const { dalogin, thoat } = authSlice.actions;
export default authSlice.reducer;
