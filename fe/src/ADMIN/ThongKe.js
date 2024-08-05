import React, { useState, useEffect } from "react";

const ThongKe = () => {
    const [tourCount, setTourCount] = useState(0);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        // Lấy dữ liệu tổng số tour
        fetch('http://localhost:3006/admin/tour/count')
            .then(response => response.json())
            .then(data => setTourCount(data.total))
            .catch(error => console.error('Lỗi lấy tổng số tour:', error));
        
        // Lấy dữ liệu tổng số user
        fetch('http://localhost:3006/admin/user/count')
            .then(response => response.json())
            .then(data => setUserCount(data.total))
            .catch(error => console.error('Lỗi lấy tổng số user:', error));
    }, []);

    return (
        <div className="thongke-container">
            <h1 className="thongke-header">Thống Kê</h1>
            <div className="thongke-cards">
                <div className="thongke-card">
                    <div className="thongke-card-header">
                        Tổng số tour
                    </div>
                    <div className="thongke-card-body">
                        <h5 className="thongke-card-title">{tourCount}</h5>
                    </div>
                </div>
                <div className="thongke-card">
                    <div className="thongke-card-header">
                        Tổng số user
                    </div>
                    <div className="thongke-card-body">
                        <h5 className="thongke-card-title">{userCount}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThongKe;
