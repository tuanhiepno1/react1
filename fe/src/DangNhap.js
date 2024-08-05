import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { dalogin } from './authSlice';
import { useNavigate } from 'react-router-dom';

function DangNhap() {
    const emailRef = useRef();
    const passRef = useRef();
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateForm = () => {
        const email = emailRef.current.value.trim();
        const pass = passRef.current.value.trim();
        let errors = {};
        let isValid = true;

        if (!email) {
            errors.email = "Email không được để trống!";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email không hợp lệ!";
            isValid = false;
        }

        if (!pass) {
            errors.pass = "Mật khẩu không được để trống!";
            isValid = false;
        } else if (pass.length < 6) {
            errors.pass = "Mật khẩu phải có ít nhất 6 ký tự!";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const submit = () => {
        if (validateForm()) {
            let url = 'http://localhost:3006/login';
            let credentials = { email: emailRef.current.value, pass: passRef.current.value };

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    dispatch(dalogin(data));
                        navigate('/');
                } else {
                    alert(data.thongbao);
                }
            })
            .catch(error => {
                console.error('Lỗi khi gửi yêu cầu:', error);
            });
        }
    };

    return (
        <div className="login-container">
        <form id='frmlogin' className='login-form'>
            <h2 className='text-center text-info mb-4'>Đăng nhập</h2>
            <div className='form-group mb-3'>
                <label htmlFor='email' className='form-label'>Email</label>
                <input id='email' className='form-control' type='text' placeholder='Nhập email' ref={emailRef} />
                {errors.email && <div className='text-danger mt-2'>{errors.email}</div>}
            </div>
            <div className='form-group mb-4'>
                <label htmlFor='password' className='form-label'>Mật khẩu</label>
                <input id='password' className='form-control' type='password' placeholder='Nhập mật khẩu' ref={passRef} />
                {errors.pass && <div className='text-danger mt-2'>{errors.pass}</div>}
            </div>
            <div className='text-center'>
                <button className='btn btn-primary w-100' type='button' onClick={submit}>Đăng nhập</button>
            </div>
        </form>
    </div>
    );
}

export default DangNhap;
