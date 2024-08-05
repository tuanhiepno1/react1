import React, { useState } from "react";

const UserAdd = () => {
    const [user, setUser] = useState({
        ten: '',
        email: '',
        pass: '',
        phone: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: type === 'radio' ? (checked ? parseInt(value) : prevUser[name]) : value
        }));
    };

    const submit = (evt) => {
        evt.preventDefault();
        const url = 'http://localhost:3006/admin/user';
        const opt = {
            method: "POST",
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(url, opt)
            .then(res => res.json())
            .then(data => {
                console.log('Kết quả ', JSON.stringify(data));
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
            role: ''
        });
        document.querySelector('form').reset();
    };

    return (
        <form className="col-md-11 border border-success border-2 rounded m-auto mt-2">
            <h3 className="text-center mt-3">Thêm user</h3>
            <div className="m-3 d-flex">
                <div className="col-12 p-1">Tên user
                    <input type="text" name="ten" onChange={handleChange} value={user.ten}
                        className="form-control shadow-none border-success" />
                </div>
            </div>
            <div className="m-3 d-flex">
                <div className="col-6 p-1">Email
                    <input type="email" name="email" onChange={handleChange} value={user.email}
                        className="form-control shadow-none border-success" />
                </div>
                <div className="col-6 p-1">Password
                    <input type="password" name="pass" onChange={handleChange} value={user.pass}
                        className="form-control shadow-none border-success" />
                </div>
            </div>
            <div className="m-3 d-flex">
                <div className="col-12 p-1">Số điện thoại
                    <textarea name="phone" onChange={handleChange} value={user.phone}
                        className="form-control shadow-none border-success" />
                </div>
            </div>
            <div className="m-3 d-flex">
                <div className="col-12 p-1">Role
                    <span className="form-control border-success">
                        <input type="radio" value={0} name="role" checked={user.role === 0} onChange={handleChange} /> Admin
                        <input type="radio" value={1} name="role" checked={user.role === 1} onChange={handleChange} /> Customer
                    </span>
                </div>
            </div>
            <div className="m-3 d-flex">
                <button type="button" onClick={submit} className="btn btn-success fw-bolder">Thêm user</button>
            </div>
        </form>
    );
};

export default UserAdd;
