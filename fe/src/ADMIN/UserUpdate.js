import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserUpdate = () => {
    let { id } = useParams();
    const [user, setUser] = useState({
        ten: '',
        email: '',
        pass: '',
        phone: '',
        role: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3006/admin/user/${id}`)
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(error => console.error('Lỗi lấy thông tin người dùng:', error));
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleRadioChange = (e) => {
        setUser(prevUser => ({
            ...prevUser,
            role: parseInt(e.target.value)
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        let opt = {
            method: "PUT",
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" }
        };

        fetch(`http://localhost:3006/admin/user/${id}`, opt)
            .then(res => res.json())
            .then(data => {
                console.log("Kết quả =", data);
                navigate("/admin/userlist");
            })
            .catch(error => console.error('Lỗi cập nhật người dùng:', error));
    };

    return (
        <form className="col-md-11 border border-success border-2 rounded m-auto mt-2" onSubmit={submit}>
            <h3 className="text-center mt-3">Sửa user</h3>
            <div className="m-3 d-flex">
                <div className="col-12 p-1">Tên user
                    <input 
                        type="text" 
                        name="ten" 
                        value={user.ten} 
                        onChange={handleInputChange} 
                        className="form-control shadow-none border-success"
                    />
                </div>
            </div>
            <div className="m-3 d-flex">
                <div className="col-6 p-1">Email
                    <input 
                        type="email" 
                        name="email" 
                        value={user.email} 
                        onChange={handleInputChange} 
                        className="form-control shadow-none border-success"
                    />
                </div>
                <div className="col-6 p-1">Password
                    <input 
                        type="password" 
                        name="pass" 
                        value={user.pass} 
                        onChange={handleInputChange} 
                        className="form-control shadow-none border-success"
                    />
                </div>
            </div>
            <div className="m-3 d-flex">
                <div className="col-12 p-1">Số điện thoại
                    <textarea 
                        name="phone" 
                        value={user.phone} 
                        onChange={handleInputChange} 
                        className="form-control shadow-none border-success"
                    />
                </div>
            </div>
            <div className="m-3 d-flex">
                <div className="col-12 p-1">Role
                    <span className="form-control border-success">
                        <input 
                            type="radio" 
                            value={0} 
                            checked={user.role === 0} 
                            name="role" 
                            onChange={handleRadioChange} 
                        /> Admin
                        <input 
                            type="radio" 
                            value={1} 
                            checked={user.role === 1} 
                            name="role" 
                            onChange={handleRadioChange} 
                        /> Customer
                    </span>
                </div>
            </div>
            <div className="m-3 d-flex">
                <button type="submit" className="btn btn-success fw-bolder">Cập nhật user</button>
            </div>
        </form>
    );
};

export default UserUpdate;
