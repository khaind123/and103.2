const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
//cloud
const atlat = "mongodb+srv://admin:ikSvA3VUcBuMY3B6@cluster0.5aoyxed.mongodb.net/myDB?retryWrites=true&w=majority&appName=Cluster0";
const connect = async () => {
    try {
        await mongoose.connect(atlat, {
        })
        console.log('connect success')
    } catch (error) {
        console.log(error);
        console.log('connect fail')
    }
}

module.exports = {connect};