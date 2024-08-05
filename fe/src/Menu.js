import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { thoat } from "./authSlice";

const Menu = () => {
    const { daDangNhap, user, role } = useSelector(state => state.auth);
    const [listLoai, setListLoai] = React.useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
        fetch('http://localhost:3006/loai')
            .then(response => response.json())
            .then(data => setListLoai(data))
            .catch(error => console.error('Lỗi lấy danh sách loại:', error));
    }, []);

    const handleLogout = () => {
        dispatch(thoat());
        navigate('/');
    };

    return (
        <ul className="navbar-menu">
            <li><Link to="/">TRANG CHỦ</Link></li>
            {listLoai.map((loai, i) =>
                <li key={i}><Link to={`/loai/${loai.id}`}>{loai.tenLoai}</Link></li>
            )}
            {!daDangNhap ? (
                <>
                    <li><Link to="/dangnhap">Đăng nhập</Link></li>
                    <li><Link to="/dangky">Đăng ký</Link></li>
                </>
            ) : (
                <>
                    {role === 0 && (
                        <>
                            <li><Link to="/admin">ADMIN</Link></li>
                        </>
                    )}
                    <li><button onClick={handleLogout} className="logout-button btn btn-warning fw-bolder">Đăng xuất</button></li>
                </>
            )}
            <li>
                <Link to="/giohang" className="cart-link">
                    <button className="cart-button">
                        <i className="fas fa-shopping-cart"></i>
                    </button>
                </Link>
            </li>
            <li><span>{user?.ten}</span></li>
        </ul>
    );
};

export default Menu;
