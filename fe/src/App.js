import './App.css';
import { Outlet } from 'react-router-dom';
import Menu from './Menu';

function App() {
  return (
    <div>
      <header className="header">
        <nav className="navbar">
        <Menu/>
          <div className="navbar-logo">
          </div>
        </nav>
        <div className="header-banner">
          <div className="header-banner_content">
            <h2 className="header-banner_heading">PS35857_VoTuanHiep</h2>
          </div>
        </div>
      </header>

      <main>
      <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="fst">
            <h4 className="fst-heading"><span>Tuan</span>Hiep</h4>
            <p>
              Công viên phần mềm Quang Trung, Q.12,<br />P.12, Q.10, TP.HCM, Việt Nam
            </p>
            <p>Điện Thoại: 0876111815</p>
            <p>Email: hiepvo066l@gmail.com</p>
          </div>
          <div className="fst">
            <h4 className="fst-head">TOUR DU LỊCH</h4>
            <p>Tour châu Âu</p>
            <p>Tour châu Á</p>
            <p>Tour châu Mỹ</p>
            <p>Tour châu Úc</p>
          </div>
          <div className="fst">
            <h4 className="fst-head">DỊCH VỤ</h4>
            <p>Đăng ký Visa</p>
            <p>Đăng ký vé máy bay</p>
            <p>Vận chuyển - Đưa đón</p>
            <p>Khách sạn - Lưu trú</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
