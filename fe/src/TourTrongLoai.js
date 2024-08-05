import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTour } from "./cartSlice";


function TourTrongLoai() {
    let { idLoai } = useParams();
    const [tours, setTour] = useState( [] );
    const [loai, setLoai] = useState ({});
    const dispatch = useDispatch();
    const dieuhuong = useNavigate();

    useEffect( () => {
        fetch(`http://localhost:3006/loaitour/${idLoai}`)
    .then( res => res.json()).then( data => setLoai(data) );
    fetch(`http://localhost:3006/tourtrongloai/${idLoai}`)
    .then( res => res.json()).then( data => setTour(data) );
  } , [idLoai] );

  return (
    <div id="listsp">
      <h1 className="category-title">Các tour ở {loai.tenLoai}</h1>
      <div className="tour-list">
        {tours.map(tour => (
          <div className="main-card" key={tour.id}>
            <div className="card-image">
              <Link to={`/tour/${tour.id}`}>
              <img src={tour.anhTour} alt={tour.tenTour} className="card-img" />
              <span className="card-price">{tour.giaTour} VNĐ</span>
              </Link>
            </div>
              <div className="card-content">
                <h3 className="card-heading">{tour.tenTour}</h3>
                <p>Lượt xem: {tour.luotXemTour}</p>
                <button className="btn1" onClick={()=> {dispatch(addTour(tour)); dieuhuong('/giohang')}}>Đặt ngay</button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TourTrongLoai;