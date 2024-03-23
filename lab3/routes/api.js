var express = require('express');
var router = express.Router();

//Thêm model
const Fruits = require('../models/fruits');
const Distributors = require('../models/distributors');
const Users = require('../models/users');
const Upload = require('../config/common/upload');
const Transporter = require('../config/common/mail');
const { route } = require('.');

//Api thêm distributor
router.post('/add-distributor', async (req, res) => {
    try {
        const data = req.body;//Lấy dữ liệu từ body
        const newDistributors = new Distributors({
            name: data.name
        });
        const result = await newDistributors.save();
            
        if (result) {
            //Nếu thêm thành công result !null trả về dữ liệu
            res.json({
                "status" : 200,
                "messenger" : "Thêm thành công.",
                "data" : result 
            })
        } else {
            //Nếu thêm thất bại result null, thông báo thất bại
            res.json({
                "status" : 400,
                "messenger" : "Lỗi, thêm thất bại.",
                "data" : []
            })
        }
    } catch (error) {
        console.log(error);
    }
})

//Api thêm fruit
router.post('/add-fruit', async (req, res) => {
    try {
        const data = req.body; //Lấy dữ liệu từ body
        const newfruit = new Fruits({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            image: data.image,
            description: data.description,
            id_distributor: data.id_distributor
        });
        const result = await newfruit.save();
            
        if (result) {
            //Nếu thêm thành công result !null trả về dữ liệu
            res.json({
                "status" : 200,
                "messenger" : "Thêm thành công.",
                "data" : result 
            })
        } else {
            //Nếu thêm thất bại result null, thông báo thất bại
            res.json({
                "status" : 400,
                "messenger" : "Lỗi, thêm thất bại.",
                "data" : []
            })
        }
    } catch (error) {
        console.log(error);
    }
})

//Get fruit
router.get('/get-list-fruit', async (req, res) => {
    try {
        const data = await Fruits.find().populate('id_distributor');
        res.json({
            "status" : 200,
            "messenger" : "Danh sách fruit",
            "data" : data
        })
    } catch (error) {
        console.log(error);
    }
})

//Get chi tiết fruit
router.get('/get-fruit-by-id/:id', async (req, res) => {
    //:id param
    try {
        const {id} = req.params;
        const data = await Fruits.findById(id).populate('id_distributor');

        res.json({
            "status": 200,
            "message": "Danh sách fruit",
            "data": data
        })
    } catch (error) {
        console.log(error);
    }
})

//Api cập nhật fruit
router.put('/update-fruit-by-id/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const data = req.body;
        const updatefruit = await Fruits.findById(id);
        let result = null;

        if (updatefruit) {
            updatefruit.name = data.name ?? updatefruit.name;
            updatefruit.quantity = data.quantity ?? updatefruit.quantity;
            updatefruit.price = data.price ?? updatefruit.price;
            updatefruit.status = data.status ?? updatefruit.status;
            updatefruit.image = data.image ?? updatefruit.image;
            updatefruit.description = data.description ?? updatefruit.description;
            updatefruit.id_distributor = data.id_distributor ?? updatefruit.id_distributor;
            result = await updatefruit.save();
        }

        if (result) {
            res.json({
                "status": 200,
                "message": "Cập nhật thành công",
                "data": result
            })
        }else {
            res.json({
                "status": 400,
                "message": "Lỗi, cập nhật thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})

//Xóa fruit
router.delete('/delete/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const result = await Fruits.findByIdAndDelete(id);

        if (result) {
            res.json({
                "status": 200,
                "message": "Xóa thành công",
                "data": result
            });
        } else {
            res.json({
                "status": 404,
                "message": "Xóa thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})

//Thêm ảnh
router.post('/add-fruit-with-file-image', Upload.array('image', 5), async(req, res) => {
    //Upload.array('image', 5) => upload nhiều file, tối đa là 5
    //Upload.single(image) => upload 1 file

    try {
        const data = req.body;
        const {files} = req;
        const urlsImage = files.map((file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`)
        //url hình ảnh được lưu dưới dạng: http://localhost:3000/upload/filename

        const newfruit = new fruits({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            image: urlsImage,
            description: data.description,
            id_distributor: data.id_distributor
        });
        const result = await newfruit.save();

        if (result) {
            res.json({
                "status": 200,
                "message": "Thêm thành công",
                "data": result
            });
        } else {
            res.json({
                "status": 404,
                "message": "Lỗi, thêm thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})

//Gửi email đăng ký
router.post('/register-send-email',Upload.single('avatar'),async(req,res) =>{
    try {
        const data = req.body;
        const newUser = Users({
            username: data.username, 
            password : data.password,
            email: data.email, 
            name: data.name,
        })
        const result = await newUser.save()

        if(result) { //Gửi mail
            const mailOptions = {
                from: "khaindpd08774@fpt.edu.vn", //email gửi đi
                to: result.email, // email nhận
                subject: "Đăng ký thành công", //subject
                text: "Cảm ơn bạn đã đăng ký", // nội dung mail
            }; // Nếu thêm thành công result !null trả về dữ liệu
        await Transporter.sendMail(mailOptions); // gửi mail
        res.json({
            "status" : 200,
            "messenger" : "Thêm thành công",
            "data" : result
        })
        } else {// Nếu thêm không thành công result null, thông báo không thành công
        res.json({
            "status" : 400 ,
            "messenger" : "Lỗi, thêm không thành công",
            "data" : []
        })}
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;