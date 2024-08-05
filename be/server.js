const mysql = require('mysql');
const exp = require("express");
const app = exp();
const port = 3006;
var cors = require('cors');
app.use( [ cors() , exp.json() ] );
const db = mysql.createConnection({
   host:'localhost', user:'root', password:'', port:3306, database:'asm_react'
}); 
db.connect( err => { if (err) throw err; console.log('Kết nối database thành công!') });

app.get("/", (req, res) => {
    res.json("{'Server React Assignment'}");
});

app.get('/tourhot/:sotour?', function(req, res){
    let sotour = parseInt(req.params.sotour || 6);
    if (sotour <= 1) sotour = 6;
    let sql = `SELECT id, tenTour, giaTour, anhTour, ngay, luotXemTour, moTaTour FROM tour WHERE anHienTour = 1 ORDER BY luotXemTour desc LIMIT 0, ? `;
    db.query(sql, sotour, (err, data) =>{
        if ( err) res.json({"mess":"Lỗi list tour", err})
        else res.json(data);
    });
});

app.get('/tour/:id', function(req, res) {
    let id = parseInt(req.params.id || 0);      
    if ( isNaN(id) || id <= 0) { 
      res.json({"mess":"Không biết tour", "id": id});  return; 
    } 
    let sql = `SELECT id, tenTour, giaTour, anhTour, moTaTour, ngay, luotXemTour
    FROM tour WHERE id = ?` 
    db.query( sql , id,  (err, data) => {
      if (err) res.json({"messs":"Lỗi lấy 1 tour", err })
      else res.json(data[0]);
     });   
});

app.get('/tourtrongloai/:idLoai', function (req, res){
    let idLoai = parseInt(req.params.idLoai);
    if (isNaN(idLoai) || idLoai <= 0){
        res.json({"mess":"Không tồn tại loại tour", "id Loại": idLoai}); return;
    }
    let sql = `SELECT id, tenTour, giaTour, anhTour, moTaTour, ngay, luotXemTour FROM tour WHERE idLoai=? AND anHienTour = 1 ORDER BY id desc`;
    db.query(sql, idLoai, (err, data) => {
        if (err) res.json({"mess":"Lỗi tour trong loại", err})
        else res.json(data);
    }); 
});

app.get('/loaitour/:idLoai', function(req, res){
    let idLoai = parseInt(req.params.idLoai);
    if (isNaN(idLoai) || idLoai <= 0){
        res.json({"mess": "Không tồn tại loại", "id Loại": idLoai}); return;
    }
    let sql = `SELECT id, tenLoai FROM loaitour WHERE id = ?`;
    db.query(sql, idLoai, (err, data) => {
        if (err) res.json({"mess":"Lỗi lấy loại", err})
        else res.json(data[0]);
    });
});

app.get('/loai', function(req, res) {
    let sql = 'SELECT id, tenLoai FROM loaiTour';
    db.query(sql, (err, data) => {
        if (err) {
            res.json({"mess":"Lỗi lấy loại", err});
        } else {
            res.json(data);
        }
    });
});


// ADMIN
app.post('/admin/tour', function(req, res) {
    let tour = {
        tenTour: req.body.tenTour,
        idLoai: req.body.idLoai,
        giaTour: req.body.giaTour || 0,
        anhTour: req.body.anhTour || "",
        moTaTour: req.body.moTaTour,
        luotXemTour: req.body.luotXemTour || 0,
        anHienTour: parseInt(req.body.anHienTour) || 1,
        ngay: req.body.ngay,
    };
    // Tìm ID tour mới nhất
    db.query('SELECT id FROM tour ORDER BY id DESC LIMIT 1', (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({"thongbao": "Lỗi cơ sở dữ liệu"});
        }
        let idTour = (rows.length > 0 ? rows[0].id : 0) + 1;
        tour.id = idTour;
        // Chèn tour mới vào cơ sở dữ liệu
        db.query('INSERT INTO tour SET ?', tour, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({"thongbao": "Lỗi cơ sở dữ liệu"});
            }
            return res.json({"thongbao": "Đã chèn 1 tour", "id": tour.id});
        });
    });
});

app.get('/admin/tour', function(req, res) {
    let page = Number(req.query.page == undefined ? 1 : req.query.page);
    let limit = Number(req.query.limit == undefined ? 3 : req.query.limit);
    let startRow = (page - 1) * limit;
    let sql = `SELECT * FROM tour ORDER BY id DESC LIMIT ?, ?`;
    db.query(sql, [startRow, limit], (err, results) => {
        if (err) {
            res.json({ "mess": "Lỗi lấy danh sách tour", err });
        } else {
            res.json(results);
        }
    });
});

app.get('/admin/tour/count', function(req, res) {
    let sql = `SELECT COUNT(*) AS total FROM tour`;
    db.query(sql, (err, results) => {
        if (err) {
            res.json({ "mess": "Lỗi đếm tổng số tour", err });
        } else {
            res.json(results[0]);
        }
    });
});

app.get('/admin/tour/laycacloaitour', function(req, res) {
    let sql = `SELECT id, tenLoai FROM loaiTour ORDER BY stt ASC`;
    db.query(sql, (err, results) => {
        if (err) {
            res.json({ "mess": "Lỗi lấy các loại tour", err });
        } else {
            res.json(results);
        }
    });
});

app.delete('/admin/tour/:id', (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.json({ 'thongbao': 'Sản phẩm không tồn tại' });
    }
    const sql = 'DELETE FROM tour WHERE id = ?';

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Lỗi khi xóa tour:', err);
            return res.status(500).json({ 'thongbao': 'Có lỗi xảy ra khi xóa tour' });
        }

        if (results.affectedRows === 0) {
            // Nếu không có hàng nào bị xóa
            res.json({ 'thongbao': 'Tour không tồn tại' });
        } else {
            // Nếu xóa thành công
            res.json({ 'thongbao': 'Đã xóa tour' });
        }
    });
});

app.put('/admin/tour/:id', (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.json({ 'thongbao': 'Sản phẩm không tồn tại' });
    }
    if (!req.body.tenTour || !req.body.idLoai) {
        return res.json({ 'thongbao': 'Tên tour hoặc id loại không có' });
    }
    const { tenTour, idLoai, giaTour, anhTour, anHienTour, luotXemTour, moTaTour, ngay } = req.body;

    const sql = `UPDATE tour SET 
        tenTour = ?, 
        idLoai = ?, 
        giaTour = ?, 
        anhTour = ?, 
        anHienTour = ?, 
        luotXemTour = ?,  
        moTaTour = ?,
        ngay = ?
        WHERE id = ?`;

    db.query(sql, [tenTour, idLoai, giaTour, anhTour, anHienTour, luotXemTour, moTaTour, ngay, id], (err, results) => {
        if (err) {
            console.error('Lỗi khi cập nhật tour:', err);
            return res.status(500).json({ 'thongbao': 'Có lỗi xảy ra khi cập nhật tour' });
        }

        if (results.affectedRows === 0) {
            return res.json({ 'thongbao': 'Tour không tồn tại' });
        }

        res.json({ 'thongbao': 'Đã cập nhật tour' });
    });
});

app.get('/admin/tour/:id', (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.json({ 'thongbao': 'Tour không tồn tại' });
    }
    const sql = 'SELECT * FROM tour WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy thông tin tour:', err);
            return res.status(500).json({ 'thongbao': 'Có lỗi xảy ra khi lấy thông tin tour' });
        }
        if (results.length === 0) {
            return res.json({ 'thongbao': 'Tour không có' });
        }
        res.json(results[0]);
    });
});

app.post('/admin/user', function(req, res) {
    let user = {
        ten: req.body.ten,
        email: req.body.email,
        pass: req.body.pass,
        phone: req.body.phone || "",
        role: req.body.role,
    };
    // Tìm ID user mới nhất
    db.query('SELECT id FROM user ORDER BY id DESC LIMIT 1', (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({"thongbao": "Lỗi cơ sở dữ liệu"});
        }
        let id = (rows.length > 0 ? rows[0].id : 0) + 1;
        user.id = id;
        // Chèn user mới vào cơ sở dữ liệu
        db.query('INSERT INTO user SET ?', user, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({"thongbao": "Lỗi cơ sở dữ liệu"});
            }
            return res.json({"thongbao": "Đã chèn 1 user", "id": user.id});
        });
    });
});

app.get('/admin/user/count', function(req, res) {
    let sql = `SELECT COUNT(*) AS total FROM user`;
    db.query(sql, (err, results) => {
        if (err) {
            res.json({ "mess": "Lỗi đếm tổng số user", err });
        } else {
            res.json(results[0]);
        }
    });
});

app.get('/admin/user', function(req, res) {
    let page = Number(req.query.page == undefined ? 1 : req.query.page);
    let limit = Number(req.query.limit == undefined ? 3 : req.query.limit);
    let startRow = (page - 1) * limit;
    let sql = `SELECT * FROM user ORDER BY id ASC LIMIT ?, ?`;
    db.query(sql, [startRow, limit], (err, results) => {
        if (err) {
            res.json({ "mess": "Lỗi lấy danh sách user", err });
        } else {
            res.json(results);
        }
    });
});

app.get('/admin/user/:id', (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.json({ 'thongbao': 'User không tồn tại' });
    }
    const sql = 'SELECT * FROM user WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy thông tin user:', err);
            return res.status(500).json({ 'thongbao': 'Có lỗi xảy ra khi lấy thông tin user' });
        }
        if (results.length === 0) {
            return res.json({ 'thongbao': 'User không có' });
        }
        res.json(results[0]);
    });
});

app.delete('/admin/user/:id', (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.json({ 'thongbao': 'User không tồn tại' });
    }
    const sql = 'DELETE FROM user WHERE id = ?';

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Lỗi khi xóa user:', err);
            return res.status(500).json({ 'thongbao': 'Có lỗi xảy ra khi xóa user' });
        }

        if (results.affectedRows === 0) {
            // Nếu không có hàng nào bị xóa
            res.json({ 'thongbao': 'User không tồn tại' });
        } else {
            // Nếu xóa thành công
            res.json({ 'thongbao': 'Đã xóa user' });
        }
    });
});

app.put('/admin/user/:id', (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.json({ 'thongbao': 'User không tồn tại' });
    }
    if (!req.body.ten) {
        return res.json({ 'thongbao': 'Tên user không có' });
    }
    const { ten, email, pass, phone, role} = req.body;

    const sql = `UPDATE user SET 
        ten = ?, 
        email = ?,
        pass = ?,
        phone = ?,
        role = ?
        WHERE id = ?`;

    db.query(sql, [ten, email, pass, phone, role,id], (err, results) => {
        if (err) {
            console.error('Lỗi khi cập nhật user:', err);
            return res.status(500).json({ 'thongbao': 'Có lỗi xảy ra khi cập nhật user' });
        }

        if (results.affectedRows === 0) {
            return res.json({ 'thongbao': 'User không tồn tại' });
        }

        res.json({ 'thongbao': 'Đã cập nhật user' });
    });
});



// Authentication
const jwt = require('node-jsonwebtoken');
const fs = require('fs');
const PRIVATE_KEY = fs.readFileSync('private-key.txt');
app.post('/login', (req, res) => {
    const { email, pass } = req.body;

    checkUserPass(email, pass, (isValid, userInfo) => {
        if (isValid) {
            const jwtBearToken = jwt.sign({},
                PRIVATE_KEY, { algorithm: 'RS256', expiresIn: 120, subject: userInfo.id.toString() }
            );
            res.status(200).json({ token: jwtBearToken, expiresIn: 120, userInfo: userInfo, role: userInfo.role });
        } else {
            res.status(401).json({ thongbao: 'Đăng nhập thất bại!' });
        }
    });
});

const checkUserPass = (email, password, callback) => {
    const query = 'SELECT * FROM user WHERE email = ? AND pass = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Lỗi khi thực hiện truy vấn:', err.stack);
            callback(false, null);
            return;
        }
        if (results.length > 0) {
            callback(true, results[0]);
        } else {
            callback(false, null);
        }
    });
};

app.post('/dangky', function(req, res) {
    let user = {
        ten: req.body.ten,
        email: req.body.email,
        pass: req.body.pass,
        phone: req.body.phone || "",
        role: req.body.role,
    };
    // Tìm ID user mới nhất
    db.query('SELECT id FROM user ORDER BY id DESC LIMIT 1', (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({"thongbao": "Lỗi cơ sở dữ liệu"});
        }
        let id = (rows.length > 0 ? rows[0].id : 0) + 1;
        user.id = id;
        // Chèn user mới vào cơ sở dữ liệu
        db.query('INSERT INTO user SET ?', user, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({"thongbao": "Lỗi cơ sở dữ liệu"});
            }
            return res.json({"thongbao": "Đã chèn 1 user", "id": user.id});
        });
    });
});




app.listen(port, () => console.log(`Server đang chạy ở port ${port}`));
