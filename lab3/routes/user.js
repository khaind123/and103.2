var express = require('express');
var router = express.Router();
const modelUsers = require('../models/users');

/* GET home page. */
router.get('/test', function(req, res, next) {
  res.send('Welcome');
});

//add data
router.post('/add', async(req, res) => {
    try {
        const model = new modelUsers(req.body)
        const result = await model.save(); //thêm dữ liệu vào db
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

//get user
router.get('/list', async(req, res) => {
    const result = await modelUsers.find({})

    try {
        res.send(result);
    } catch (error) {
        console.log(error);
    }
})

//get user by id
router.get('/getlistbyid/:id', async(req, res) => {
    const result = await modelUsers.findById(req.params.id)
    
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

//update user
router.patch('/update/:id', async(req, res) => {
    try {
        const result = await modelUsers.findByIdAndUpdate(req.params.id, req.body);
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

//delete user
router.delete('/delete/:id', async(req, res) => {
    try {
        const result = await modelUsers.findByIdAndDelete(req.params.id);
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