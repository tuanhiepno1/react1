import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PaginationControl } from "react-bootstrap-pagination-control";
var limit = 3;


const UserList = () => {
    const [ listUser, setListUser ] = useState([]);
    const [ page, setPage ] = useState(1);
    const [ totalRows, settotalRows ] = useState(0);
    const [ napLai, setNapLai ] = useState(0);
    useEffect( () => {
        fetch(`http://localhost:3006/admin/user/count`)
        .then(res => res.json()).then( data => settotalRows(data.total));
    }, []);
    useEffect(()=> {
        fetch(`http://localhost:3006/admin/user?page=${page}&limit=${limit}`)
        .then( res => res.json())
        .then( data => setListUser(data))
    }, [ page ]);
    useEffect ( () => {
        fetch(`http://localhost:3006/admin/user/count`)
        .then(res=>res.json()).then( data => settotalRows(data.total) );
      } , [napLai]);
      useEffect(() => {
        fetch( `http://localhost:3006/admin/user?page=${page}&limit=${limit}`)
        .then( res => res.json() )
        .then( data => setListUser(data) )
      }, [ page , napLai]);

      function xoaUser(id) {
        if (window.confirm("Có chắc là xóa không ?")===false) return false;
        fetch(`http://localhost:3006/admin/user/${id}`, {"method":"delete"})
        .then( res => res.json())
        .then( data => setNapLai(napLai+1))
      }
    return (
        <div id="adminuserList">
           <h2 className="text-center">Quản lý user</h2>
    <h5 className='user'>
      <b>Tên</b> 
      <b>Thông tin </b>  
      <b><a href="/admin/useradd">Thêm</a></b>
    </h5>
    {listUser.map( (user, index) => (
    <div className='user' key={index}>
        <div>
          <p><b>{user.ten}</b> </p>       
        </div>          
        <div>
          <p>Email : {user.email}</p>
          <p>Phone: {user.phone}</p>           
          <p>Role : {user.role===1? "Customer":"Admin"}</p>       
        </div>
        <div>
          <a href="#/" onClick = { () => xoaUser(user.id) } className='btn btn-danger d-block m-2 mt-4'>Xóa</a>
          <Link to={"/admin/userupdate/" + user.id} 
           className='btn btn-primary d-block m-2' >Sửa</Link>
        </div>
    </div>
    ))}
    <PaginationControl page={page} between={2} limit={limit} ellipsis={1} 
     total={totalRows} changePage={ (page) => setPage(page)}  />
</div>
    )
}
export default UserList;