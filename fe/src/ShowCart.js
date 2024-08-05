import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { xoaTour, updateSL } from "./cartSlice";

function ShowCart(props){
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.listTour);
    const tongTien = cart.reduce((total, tour) => total + (tour.giaTour * tour.soLuong), 0);
    const xuLyThanhToan = () => {
        alert(`Tổng tiền cần thanh toán là: ${Number(tongTien).toLocaleString("vi")} VNĐ`);
    };
    return (
        <div className="container">
            <div className="giohang">
                <h2>Giỏ hàng của bạn</h2>
                {cart.map((tour, index) => (
                    <div key={index}>
                        <img src={tour['anhTour']} alt={tour['tenTour']} />
                        <span>{tour.tenTour}</span>
                        <input
                            type="number"
                            defaultValue={tour.soLuong}
                            onChange={e => dispatch(updateSL([tour.id, e.target.value]))}
                        />
                        <span>{Number(tour.giaTour).toLocaleString("vi")} VNĐ</span>
                        <span>{Number(tour.giaTour * tour.soLuong).toLocaleString("vi")} VNĐ</span>
                        <button className="btn btn-primary px-2" onClick={() => dispatch(xoaTour(tour.id))}>Xóa</button>
                    </div>
                ))}
                 <div className="total">
                    <h3>Tổng tiền phải thanh toán:</h3>
                    <span>{Number(tongTien).toLocaleString("vi")} VNĐ</span>
                </div>
                <button className="btn btn-payment" onClick={xuLyThanhToan}>Thanh toán</button>
            </div>
        </div>
      );
}
export default ShowCart;