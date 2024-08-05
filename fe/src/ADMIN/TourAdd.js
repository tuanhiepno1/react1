import React, {useState} from "react";

const TourAdd = () => {

    const [tour, setTour] = useState({
        tenTour: '',
        giaTour: 0,
        luotXemTour: 0,
        moTaTour: '',
        anhTour: '',
        anHienTour: 1,
        idLoai: '',
        ngay: ''
    });
    const submit = (evt)=>{
        evt.preventDefault(); 
        let url =`http://localhost:3006/admin/tour`;
        let opt = {
            method:"post", 
            body: JSON.stringify(tour),
            headers:{ 'Content-Type':'application/json' }
        };
        fetch(url, opt).then( res => res.json() ).then( data => {
          console.log('Kết quả ', JSON.stringify(data));
          reset();
        })
      }

      const reset = () => {
        setTour({
            tenTour: '',
            giaTour: 0,
            luotXemTour: 0,
            moTaTour: '',
            anhTour: '',
            anHienTour: 1,
            idLoai: '',
            ngay: ''
        });
        document.querySelector('form').reset();
    };

    return (
        <form className = "col-md-11 border border-success border-2 rounded m-auto mt-2">
            <h3 className="text-center mt-3">Thêm tour</h3>
<div className="m-3 d-flex">
    <div className="col-12 p-1">Tên tour
        <input type="text" onChange = { e => tour.tenTour = e.target.value} 
        className="form-control shadow-none border-success"/>
    </div>
</div>
<div className="m-3 d-flex">
    <div className="col-6 p-1"> Lượt xem
        <input type="number" onChange={ e => tour.luotXemTour = e.target.value}
        className="form-control shadow-none border-success"/>
    </div>
    <div className="col-6 p-1"> Giá tour
        <input type="number" onChange = { e => tour.giaTour = e.target.value} 
        className="form-control shadow-none border-success"/>
    </div>
</div>

<div className="m-3 d-flex">
<div className="col-12 p-1"> Mô tả
        <textarea type="text" onChange={ e => tour.moTaTour = e.target.value}
        className="form-control shadow-none border-success"/>
    </div>
</div>
<div className="m-3 d-flex">
    <div className="col-12 p-1"> Hình tour
        <input type="text" onChange={ e => tour.anhTour = e.target.value}
        className="form-control shadow-none border-success"/>
    </div>
</div>
<div className="m-3 d-flex">
    <div className="col-4 p-1"> Ẩn hiện
      <span className="form-control border-success">
        <input type="radio" value={0} name="anHienTour" onChange = { e => tour.anHienTour = parseInt(e.target.value)}/> Ẩn 
        <input type="radio" value={1} name="anHienTour" onChange = { e => tour.anHienTour = parseInt(e.target.value)}/> Hiện
       </span>
    </div>
    <div className="col-4 p-1"> Loại
        <select onChange = { e => tour.idLoai = e.target.value} 
        className="form-control shadow-none border-success">
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
    <input type="date" onChange={ e => tour.ngay = e.target.value}
        className="form-control shadow-none border-success"/>
    </div>
</div>
<div className="m-3 d-flex">
    <button type="button" onClick={ e => submit(e) } className="btn btn-success fw-bolder" > Thêm sản phẩm</button>
</div>
</form>
    )
}
export default TourAdd;