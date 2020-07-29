'use strict'

const multer = require('multer');
const path = require('path'); 
const crypto = require('crypto');
const uploadpath = path.resolve(__dirname, '..', 'uploads');

module.exports = {
    dest: uploadpath,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadpath);
        },
        filename: (req, file, cb) => {            
            crypto.randomBytes(16, (error, hash) => {
                if(error) cb(error);

                const filename = `${hash.toString('hex')}-${file.originalname}`;
                
                cb(null, filename);
            })
        }
    }),
    limits: {
        fileSize: 2*1024*1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];
        if(allowedMimes.includes(file.mimetype))
            cb(null, true);
        else
            cb(new Error('Tipo de arquivo inválido'));
    }
}
