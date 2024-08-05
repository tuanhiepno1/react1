import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { Provider} from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import DangNhap from './DangNhap';
import DangKy from './DangKy';
import ChiTiet from './ChiTiet';
import TourTrongLoai from './TourTrongLoai';
import ShowCart from './ShowCart'
import Admin from './ADMIN/Admin';
import ThongKe from './ADMIN/ThongKe';
import TourList from './ADMIN/TourList';
import TourAdd from './ADMIN/TourAdd';
import TourUpdate from './ADMIN/TourUpdate';
import UserList from './ADMIN/UserList';
import UserAdd from './ADMIN/UserAdd';
import UserUpdate from './ADMIN/UserUpdate';
import LoaiList from './ADMIN/LoaiList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <BrowserRouter>
      <Routes>
        <Route  path="/" element= {<App />} >
            <Route path="/" element={<Home/>} />
            <Route path='/dangnhap' element={<DangNhap/>}/>
            <Route path='/dangky' element={<DangKy/>}/>
            <Route path="/tour/:id" element={<ChiTiet/>} />
            <Route path="/loai/:idLoai" element={<TourTrongLoai/>} />
            <Route path='/giohang/' element={<ShowCart/>} />
        </Route>
        <Route  path="/admin" element= {<Admin />}>
            <Route path="/admin" element={<ThongKe/>}  />
            <Route path="tourlist" element={<TourList/>} />
            <Route path="touradd" element={<TourAdd/>} />
            <Route path="tourupdate/:id" element={<TourUpdate/>} />
            <Route path="userlist/" element={<UserList/>} />
            <Route path="useradd" element={<UserAdd/>} />
            <Route path="userupdate/:id" element={<UserUpdate/>} />
            <Route path='loailist' element={<LoaiList/>} />
        </Route>
      </Routes>
      <input/>
</BrowserRouter>
</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
