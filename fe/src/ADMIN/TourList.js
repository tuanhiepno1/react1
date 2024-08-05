import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PaginationControl } from "react-bootstrap-pagination-control";
var limit = 3;

const TourList = () => {
    const [ listTour, setListTour ] = useState([]);
    const [ listLoai, setListLoai ] = useState([]);
    const [ page, setPage ] = useState(1);
    const [ totalRows, settotalRows ] = useState(0);
    const [ napLai, setNapLai ] = useState(0);
    useEffect( ()=>{
        fetch(`http://localhost:3006/admin/tour/count`)
        .then(res => res.json()).then( data => settotalRows(data.total));
        fetch(`http://localhost:3006/admin/tour/laycacloaitour`)
        .then(res => res.json()).then( data => setListLoai(data));
    }, []);
    useEffect(()=> {
        fetch(`http://localhost:3006/admin/tour?page=${page}&limit=${limit}`)
        .then( res => res.json())
        .then( data => setListTour(data))
    }, [ page ]);
    useEffect ( () => {
      fetch(`http://localhost:3006/admin/tour/count`)
      .then(res=>res.json()).then( data => settotalRows(data.total) );
      fetch(`http://localhost:3006/admin/tour/laycacloaitour`)
      .then(res=>res.json()).then( data => { setListLoai(data) ; console.log(data)} );
    } , [napLai]);
    useEffect(() => {
      fetch( `http://localhost:3006/admin/tour?page=${page}&limit=${limit}`)
      .then( res => res.json() )
      .then( data => setListTour(data) )
    }, [ page , napLai]);
    

    const layTenLoai = (idLoai) => {
        if (listLoai.length === 0) return "Không có!";
        let kq = listLoai.find( loaiTour => loaiTour.id === idLoai);
        if (kq != null) return kq.tenLoai; else return "Không có!";
    }

    function xoaTour(id) {
      if (window.confirm("Có chắc là xóa không ?")===false) return false;
      fetch(`http://localhost:3006/admin/tour/${id}`, {"method":"delete"})
      .then( res => res.json())
      .then( data => setNapLai(napLai+1))
    }

    return (
        <div id="admintourList">
           <h2 className="text-center">Quản lý tour</h2>
    <h5 className='tour'>
      <b>Hình</b> 
      <b>Tên tour</b> 
      <b>Thông tin </b>  
      <b><a href="/admin/touradd">Thêm</a></b>
    </h5>
    {listTour.map( (tour, index) => (
    <div className='tour' key={index}>
        <div> <img src={tour.anhTour} alt="{tour.anhTour}" className="w-100 hinh"/> </div> 
        <div>
          <p>Tên tour: <b>{tour.tenTour}</b> </p>       
          <p>Loại tour: {layTenLoai(tour.idLoai) } </p>
        </div>          
        <div>
          <p> Giá : {tour.giaTour.toLocaleString("vi")} VNĐ </p>
          <p>Ngày: {new Date(tour.ngay).toLocaleDateString("vi")}</p>           
          <p>Trạng thái : {tour.anHienTour===1? "Đang hiện":"Đang ẩn"}</p>
          <p>Lượt xem: {tour.luotXemTour} </p>        
        </div>
        <div>
          <a href="#/" onClick = { () => xoaTour(tour.id) } className='btn btn-danger d-block m-2 mt-4'>Xóa</a>
          <Link to={"/admin/tourupdate/"+tour.id} 
           className='btn btn-primary d-block m-2' >Sửa</Link>
        </div>
    </div>
    ))}
    <PaginationControl page={page} between={2} limit={limit} ellipsis={1} 
     total={totalRows} changePage={ (page) => setPage(page)}  />
</div>
    )
}
export default TourList;