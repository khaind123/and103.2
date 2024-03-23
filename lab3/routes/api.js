var express = require('express');
var router = express.Router();

//Thêm model
const modelFruits = require('../models/fruits');
const modelDistributors = require('../models/distributors');
const { route } = require('.');

//Api thêm distributor
router.post('/add-fruit', async (req, res) => {
    try {
        const model = new modelDistributors(req.body);//Lấy dữ liệu từ body
        const result = await model.save();
        res.send(result);
            
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
        const model = new modelFruits(req.body);//Lấy dữ liệu từ body
        const result = await model.save();
        res.send(result);
            
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
    const result = await modelFruits.find({});

    try {
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
router.get('/get-list-fruit/:id', async (req, res) => {
    //:id param
    const result = await modelFruits.findById(req.params.id)
    
    try {
        if (result) {
            res.send(result);
        } else {
            res.json({
                "status": 400,
                "message": "Không tìm thấy id",
                "data": []
            })
        }
    } catch (error) {
        if (error.name === "CastError") {
            res.status(404).send('Invalid id format');
        } else {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }
})

//Api cập nhật fruit
router.patch('/update-fruit-by-id/:id', async(req, res) => {
    try {
        const result = await modelFruits.findByIdAndUpdate(req.params.id, req.body);
        if (result) {
            const rs = await result.save();
            res.send(rs);
        } else {
            res.json({
                "status": 400,
                "message": "Không tìm thấy id",
                "data": []
            })
        }
    } catch (error) {
        if (error.name === "CastError") {
            res.status(404).send('Invalid id format');
        } else {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }
})

//Xóa cập nhật fruit
router.delete('/delete/:id', async(req, res) => {
    try {
        const result = await modelFruits.findByIdAndDelete(req.params.id);
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
        if (error.name === "CastError") {
            res.status(404).send('Invalid id format');
        } else {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }
})

module.exports = router;