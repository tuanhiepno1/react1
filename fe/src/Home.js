import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTour } from "./cartSlice";


function Home(){
    const [tours, setTours] = useState([]);
    const dispatch = useDispatch();
    const dieuhuong = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3006/tourhot')
        .then(response => response.json())
        .then(data => setTours(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="home">
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
                            <button className="btn1" onClick={()=> {dispatch(addTour(tour)); dieuhuong('/giohang');}}>Đặt ngay</button>
                        </div>
                </div>
            ))}
        </div>
    );
}
export default Home;