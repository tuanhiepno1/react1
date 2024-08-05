import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTour } from "./cartSlice";
import { useNavigate } from "react-router-dom";

function ChiTiet(){
    let { id } = useParams();
    const [tour, setTour] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const dispatch = useDispatch();
    const dieuhuong = useNavigate();

    useEffect( () => {
        fetch(`http://localhost:3006/tour/${id}`)
    .then( res => res.json()).then( data => setTour(data) );
    }, [id]);

    const anHienNoiDung = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="tour-details">
            <div className="tour-image">
                <img src={tour['anhTour']} alt={tour['tenTour']} />
            </div>
            <div className="tour-info">
                <h1 className="tour-title">{tour['tenTour']}</h1>
                <p className="tour-price">Giá: {Number(tour['giaTour']).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                <p className="tour-views">Lượt xem: {tour['luotXemTour']}</p>
                <p className={`tour-description ${isExpanded ? 'expanded' : 'collapsed'}`}>
                    {tour['moTaTour']}
                </p>
                <button className="toggle-description" onClick={anHienNoiDung}>
                    {isExpanded ? 'Ẩn bớt' : 'Đọc thêm'}
                </button>
                <p className="tour-date">Ngày: {new Date(tour['ngay']).toLocaleDateString('vi-VN')}</p>
                <button className="btn-order" onClick={() => {dispatch(addTour(tour)); dieuhuong('/giohang')}}>Thêm vào giỏ hàng</button>
            </div>
        </div>
    );
}
export default ChiTiet;