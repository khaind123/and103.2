const multer = require("multer");
const storege = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + " " + Date.now() + file.originalname);
    },
})

const upload = multer({storage: storege});

module.exports = upload;