import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TourUpdate = () => {
    let { id } = useParams();
    const [tour, setTour] = useState({});
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        let opt = {
            method: "PUT",
            body: JSON.stringify(tour),
            headers: { "Content-Type": "application/json" }
        };

        fetch(`http://localhost:3006/admin/tour/${id}`, opt)
            .then(res => res.json())
            .then(data => {
                console.log("Kết quả =", data);
                navigate("/admin/tourlist");
            });
    };

    useEffect(() => {
        fetch(`http://localhost:3006/admin/tour/${id}`)
            .then(res => res.json())
            .then(data => setTour(data));
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTour(prevTour => ({
            ...prevTour,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <form className="col-md-11 border border-success border-2 rounded m-auto mt-2">
            <h3 className="text-center mt-3">Sửa tour</h3>

            <div className="m-3 d-flex">
                <div className="col-12 p-1">Tên tour
                    <input 
                        type="text" 
                        name="tenTour" 
                        value={tour.tenTour || ''} 
                        onChange={handleInputChange} 
                        className="form-control shadow-none border-success"
                    />
                </div>
            </div>

            <div className="m-3 d-flex">
                <div className="col-6 p-1"> Lượt xem
                    <input 
                        type="number" 
                        name="luotXemTour" 
                        value={tour.luotXemTour || ''} 
                        onChange={handleInputChange} 
                        className="form-control shadow-none border-success"
                    />
                </div>
                <div className="col-6 p-1"> Giá tour
                    <input 
                        type="number" 
                        name="giaTour" 
                        value={tour.giaTour || ''} 
                        onChange={handleInputChange} 
                        className="form-control shadow-none border-success"
                    />
                </div>
            </div>

            <div className="m-3 d-flex">
                <div className="col-12 p-1"> Mô tả
                    <textarea 
                        name="moTaTour" 
                        value={tour.moTaTour || ''} 
                        onChange={handleInputChange} 
                        className="form-control shadow-none border-success"
                    />
                </div>
            </div>

            <div className="m-3 d-flex">
                <div className="col-12 p-1"> Hình tour
                    <input 
                        type="text" 
                        name="anhTour" 
                        value={tour.anhTour || ''} 
                        onChange={handleInputChange} 
                        className="form-control shadow-none border-success"
                    />
                </div>
            </div>

            <div className="m-3 d-flex">
                <div className="col-4 p-1"> Ẩn hiện
                    <span className="form-control border-success">
                        <input 
                            type="radio" 
                            value={0} 
                            checked={tour.anHienTour === 0} 
                            name="anHienTour" 
                            onChange={() => setTour(prevTour => ({ ...prevTour, anHienTour: 0 }))} 
                        /> Ẩn 
                        <input 
                            type="radio" 
                            value={1} 
                            checked={tour.anHienTour === 1} 
                            name="anHienTour" 
                            onChange={() => setTour(prevTour => ({ ...prevTour, anHienTour: 1 }))} 
                        /> Hiện
                    </span>
                </div>
                <div className="col-4 p-1"> Loại
                    <select 
                        name="idLoai" 
                        value={tour.idLoai || '-1'} 
                        onChange={handleInputChange} 
                        className="form-control shadow-none border-success"
                    >
                        <option value="-1">Chọn loại</option>
                        <option value="1">Châu Á</option>
                        <option value="2">Châu Âu</option>
                        <option value="3">Châu Phi</option>
                        <option value="4">Châu Mỹ</option>
                        <option value="5">Châu Úc</option>
                        <option value="6">Châu Nam Cực</option> 
                    </select>
                </div>
                <div className="col-4 p-1"> Ngày
                    <input 
                        type="date" 
                        name="ngay" 
                        value={tour.ngay || ''} 
                        onChange={handleInputChange} 
                        className="form-control shadow-none border-success"
                    />
                </div>
            </div>
            <div className="m-3 d-flex">
                <button  type="button" onClick={submit} className="btn btn-success fw-bolder">
                    Cập nhật sản phẩm
                </button>
            </div>
        </form>
    );
};

export default TourUpdate;
