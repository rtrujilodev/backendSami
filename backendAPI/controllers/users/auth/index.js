'use strict';
const Users = require('../../../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../../config/auth');
function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, { expiresIn: '40m' });
}

module.exports = {
    async create (req,res) {
        try {
            const { name, email, RG, CPF, birthDate, dependents, password } = req.body;
            const hash = await bcrypt.hash(password, 10);
            if(await Users.findOne({ where: { email } }))
                return res.status(400).json({
                    message: 'Erro: usuário já existe'
                });
            const users = await Users.create({
                name,
                email,
                RG,
                CPF,
                birthDate:new Date(birthDate),
                dependents,
                password:hash
            });
            users.password = undefined;
            return res.json({
                users,
                token:generateToken({ id: users.id })
            });
        } catch(error){
            res.status(400).json({
                message: 'Erro ao inserir registro',
                origin:error.name
            });
        }
    },
    async authenticate (req,res) {
        try {
            const { email, password } = req.body;
            const keys = Object.keys(req.body);
            const emailOk = email && email.length > 0;
            const passwdOk = password && password.length > 0;
            const out = {};
            if(emailOk && passwdOk && keys.length > 2)
                    out.message = 'Aviso: algumas propriedades foram desconsideradas';
            else if(!emailOk)
                return res.status(400).json({
                    message: 'Erro: propriedade email inválida',
                    origin: 'MissingPropEmail'
            });                
            else if(!passwdOk)
                return res.status(400).json({
                    message: 'Erro: propriedade senha inválida',
                    origin: 'InvalidPropPasswd'
            });
            const users = await Users.findOne({ where: { email } });
            if(!users)
                return res.status(400).json({
                    message: 'Erro: usuário não encontrado',
                    origin: 'UserNotFound'
            });
            if(!await bcrypt.compare(password, users.password))
                return res.status(400).json({
                    message: 'Erro: senha incorreta para esse usuário',
                    origin: 'InvalidPasswd'
            });
            users.password = undefined;
            Object.assign(out,users.dataValues);
            out.token = generateToken({ id: out.id });
            
            return res.json(out);
        } catch(error){
            res.status(404).json({
                message: 'Erro ao fazer login',
                origin:error.name
            });
        }
    }
}
