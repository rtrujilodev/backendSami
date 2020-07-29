'use strict';
const sharp = require('sharp');
const fs = require('fs');
async function optimizer(file, size, res) {
    const buff = await sharp(file.path).resize(size).jpeg({ quality: 77 }).toBuffer();
    if(!buff)
        return res.json({
            message: 'Erro: não foi possível gerar o buffer da imagem otimizada',
            origin: 'BufferError'
        });
    fs.writeFile(file.path, buff, error => {
        if(error)
            return res.json({
                message: 'Erro: não foi possível salvar a imagem otmizada',
                origin: 'WriteError'
            });
    });
    return res.json({
        message: 'upload realizado com sucesso'
    });
}
      
module.exports = {
    async uploads (req, res) {
        if(req.file)
            return await optimizer(req.file, 250, res);
    }
}
