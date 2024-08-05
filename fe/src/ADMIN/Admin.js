import './Admin.css';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { thoat } from '../authSlice';
import { useNavigate } from 'react-router-dom';

function Admin() {

  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(thoat());
    navigate('/dangnhap');
};
  return (
    <div className="d-flex">
      <div className="bg-dark text-white" style={{ width: '250px', height: '100vh', position: 'fixed' }}>
        <div className="p-3">
         <Link to="/admin"><h4>TuanHiep Travel</h4></Link>
          <ul className="nav flex-column">
            <li className="nav-item dropdown">
              <a className="nav-link text-white dropdown-toggle" href="#/" id="tourTypeDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Quản lý loại tour
              </a>
              <ul className="dropdown-menu" aria-labelledby="tourTypeDropdown">
                <li> <Link className="dropdown-item" to="/admin/loailist">Danh sách loại</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link text-white dropdown-toggle" href="#/" id="tourDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Quản lý tour
              </a>
              <ul className="dropdown-menu" aria-labelledby="tourDropdown">
                <li><Link className="dropdown-item" to="/admin/tourlist">Danh sách tour</Link></li>
                <li><Link className="dropdown-item" to="/admin/touradd">Thêm tour</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link text-white dropdown-toggle" href="#/" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Quản lý người dùng
              </a>
              <ul className="dropdown-menu" aria-labelledby="userDropdown">
                <li><Link className="dropdown-item" to="/admin/userlist">Danh sách người dùng</Link></li>
                <li><Link className="dropdown-item" to="/admin/useradd">Thêm người dùng</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-grow-1" style={{ marginLeft: '250px' }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Trở lại cửa hàng</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                <span className="nav-link">{user?.ten}</span>
                </li>
                <li className="nav-item">
                <li><button onClick={handleLogout} className="logout-button btn btn-warning fw-bolder">Đăng xuất</button></li>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-5">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default Admin;
