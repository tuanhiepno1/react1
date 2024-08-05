import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DangKy = () => {
    const [user, setUser] = useState({
        ten: '',
        email: '',
        pass: '',
        phone: '',
        role: 1
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: type === 'radio' ? (checked ? parseInt(value) : prevUser[name]) : value
        }));
    };

    const submit = (evt) => {
        evt.preventDefault();
        const url = 'http://localhost:3006/dangky';
        const opt = {
            method: "POST",
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(url, opt)
            .then(res => res.json())
            .then(data => {
                if (data.thongbao === 'Đã thêm user') {
                    navigate("/dangnhap");
                } 
                reset();
            })
            .catch(err => console.error('Lỗi:', err));
    };  

    const reset = () => {
        setUser({
            ten: '',
            email: '',
            pass: '',
            phone: '',
            role: 1
        });
        document.querySelector('form').reset();
    };

    return (
        <form className="col-md-8 col-lg-6 border border-success border-2 rounded p-4 m-auto mt-4 shadow-sm" onSubmit={submit}>
            <h3 className="text-center mb-4">Đăng Ký Tài Khoản</h3>
            
            <div className="mb-3">
                <label className="form-label">Tên người dùng</label>
                <input 
                    type="text" 
                    name="ten" 
                    onChange={handleChange} 
                    value={user.ten} 
                    className="form-control shadow-none border-success"
                    placeholder="Nhập tên của bạn"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    onChange={handleChange} 
                    value={user.email} 
                    className="form-control shadow-none border-success"
                    placeholder="Nhập email của bạn"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Password</label>
                <input 
                    type="password" 
                    name="pass" 
                    onChange={handleChange} 
                    value={user.pass} 
                    className="form-control shadow-none border-success"
                    placeholder="Nhập mật khẩu của bạn"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Số điện thoại</label>
                <textarea 
                    name="phone" 
                    onChange={handleChange} 
                    value={user.phone} 
                    className="form-control shadow-none border-success"
                    placeholder="Nhập số điện thoại của bạn"
                    required
                />
            </div>

            <div className="text-center">
                <button type="submit" className="btn btn-success fw-bolder">Đăng Ký</button>
            </div>
        </form>
    );
};

export default DangKy;
