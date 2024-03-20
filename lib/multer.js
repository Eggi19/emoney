const multer = require('multer');
const fs = require('fs');
const path = require('path');

let defaultPath = path.join(__dirname, '../public');
var storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        let isDirectoryExist = fs.existsSync(`${defaultPath}/${file.fieldname}`);

        if (!isDirectoryExist) {
            await fs.promises.mkdir(`${defaultPath}/${file.fieldname}`, {
                recursive: true,
            });
        }

        if (file.fieldname === 'profile_image') {
            cb(null, `${defaultPath}/${file.fieldname}`);
        }
    },
    filename: (req, file, cb) => {
        cb(
            null,
            'PIMG' +
            '-' +
            Date.now() +
            Math.round(Math.random() * 1000000000) +
            '.' +
            file.mimetype.split('/')[1],
        );
    },
});

var fileFilter = (req, file, cb) => {
    if (
        file.mimetype.split('/')[1] === 'jpeg' ||
        file.mimetype.split('/')[1] === 'png'
    ) {
        cb(null, true);
    } else {
        cb(new Error('Format image tidak sesuai'));
    }
};

exports.multerUpload = multer({ storage: storage, fileFilter: fileFilter });