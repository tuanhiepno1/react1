import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
    name: 'cart',
    initialState: {listTour: [], },
     reducers: {
        addTour: (state, param) => {
            let tour = param.payload;
            let index = state.listTour.findIndex( s => s.id === tour.id);
            if (index === -1){
                tour['soLuong'] = 1;
                state.listTour.push(tour);
            }
            else state.listTour[index]['soLuong']++;
            console.log('Đã thêm tour. Số tour: ', state.listTour.length);
        },

        updateSL: (state, param) => {
            let id = param.payload[0];
            let soLuong = param.payload[1];
            let index = state.listTour.findIndex( s => s.id === id);
            if (index !== -1) state.listTour[index].soLuong = Number(soLuong);
            console.log('Đã sửa tour', param)
        },

        xoaTour: (state, param) => {
            let id = param.payload;
            const index = state.listTour.findIndex( s => s.id === id);
            if (index !== -1) state.listTour.splice(index, 1);
        },

        xoaGH: state => {state.listTour = [];}
     }, 
});
export const { addTour, updateSL, xoaTour, xoaGH } = cartSlice.actions
export default cartSlice.reducer;