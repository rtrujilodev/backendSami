'use strict'

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req,res,next) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader)
        return res.status(401).json({
            message: 'Erro: token não informado',
            origin: 'NoTokenProvided'
        });
    
    const parts = authHeader.split(' ');
    
    if(parts.length !== 2)
        return res.status(401).json({
            message: 'Erro: token incompleto',
            origin: 'NotFullToken'
        });
    
    const [ scheme, token ] = parts;
    
    if(!/^Bearer$/i.test(scheme))
        return res.status(401).json({
            message: 'Erro: token corrompido',
            origin: 'BrokenToken'
        });
    
    jwt.verify(token, authConfig.secret, (error, decoded) => {
        if(error)
            return res.status(401).json({
                message: 'Erro: token inválido',
                origin: 'InvalidToken'
            });
        
        req.userId = decoded.id;
        return next();
    });
}
