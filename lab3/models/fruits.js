const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Fruits = new Scheme({
    name: {type: String},
    quantity: {type: Number},
    price: {type: Number},
    status: {type: Number}, //status = 1 => còn hàng, status = 0 => hết hàng, status = -1 => ngừng bán
    image: {type: Array}, //kiểu dữ liệu danh sách
    description: {type: String},
    id_distributor: {type: Scheme.Types.ObjectId, ref: 'distributor'},
},{
    timestamps: true
});

module.exports = mongoose.model('fruit', Fruits);

//type: Scheme.Types.ObjectId => kiểu dữ liệu id của mongdb
//ref => khóa ngoại