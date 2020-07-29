'use strict';
const Users = require('../../../models/Users');
const Plans = require('../../../models/Plans');
const Addresses = require('../../../models/Addresses');
const { Op } = require('sequelize');

module.exports = {
    async insertAddresses(req,res){
        const usersId = req.params.id;
        const { street, zipcode, number, neighborhood, city, state } = req.body;
        
        const users = await Users.findByPk(usersId);
        if(!users)
            res.status(400).json({ message: 'Usuário não encontrado' });
        
        try {
        const addresses = await Addresses.create({
            street,
            zipcode,
            number,
            neighborhood,
            city,
            state,
            usersId
        });
        return res.json(addresses);
        } catch(error){
            res.status(404).json({
                message: 'Erro ao inserir registro',
                origin:error.name
            });
        }
        
    },
    async linkPlan(req,res){
        try {
            const id = req.params.id;
            const planId = req.body.planSelected;
            if(isNaN(id))
                return res.status(400).json({
                    message: 'Erro: propriedade id inválida (deve ser um número)',
                    origin: 'EmptyId'
            });
            if(!await Users.findByPk(id))
                return res.status(400).json({
                    message: 'Erro: Não existe usuário com o id fornecido',
                    origin: 'IdNotFound'
                });
            const users = await Users.update({
                planId
            },
            {
                where: { id }
            });
            return res.json({
                message: 'Registro atualizado com sucesso.',
            });
        } catch(error){
            res.status(400).json({
                message: 'Erro ao atualizar registro',
                origin:error.name
            });
        }        
    },
    async viewAllUsers (req,res) {
        try {
            const users = await Users.findAll({
                include: [
                    'plan',
                    'addresses'
                ],
                attributes: {
                    exclude:['password']
                }
            });
            return res.json(users);
        } catch(error){
            res.status(404).json({
                message: 'Erro ao carregar registro',
                origin:error.name
            });
        }
    },
    async viewAllWithPlan (req,res) {
        try {
            const id = req.params.id;
            const users = await Users.findByPk(id,{
                include: [ 'plan' ],
                attributes: {
                    exclude:['password']
                }
            });
            return res.json(users);
        } catch(error){
            res.status(404).json({
                message: 'Erro ao carregar registro',
                origin:error.name
            });
        }
    },
    async viewAllWithAddresses (req,res) {
        try {
            const id = req.params.id;
            const users = await Users.findByPk(id,{
                include: [ 'addresses' ],
                attributes: {
                    exclude:['password']
                }
            });
            return res.json(users);
        } catch(error){
            res.status(404).json({
                message: 'Erro ao carregar registro',
                origin:error.name
            });
        }
    },
    async viewAllUsersFilter (req,res) {
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);
        if(req.params.filtersval === undefined)
            return res.status(400).json({
                message: 'Erro: rota inválida (sem parametro)',
                origin: 'InvalidRoute'
            });
        const filtersval = req.params.filtersval.split('|').filter((v) => {
            switch(v){
                case 'name':
                case 'email':
                case 'RG':
                case 'CPF':
                case 'birthDate':
                    return true;
                break
            }
        });
        filtersval.push('updatedAt');
        const jsonQuery = keys.map((v,i) => {
            return { [v]:{ [Op.substring]:values[i] } };
        });
        try {
            const users = await Users.findAll({
                include: [
                    'plan',
                    'addresses'
                ],
                attributes:filtersval,
                where: { [Op.or]:jsonQuery }
            });
            return res.json(users);
        } catch(error){
            res.status(400).json({
                message: 'Erro ao carregar registro',
                origin:error.name
            });
        }
    },
    async viewAllUsersWhere (req,res) {
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);
        if(req.params.relations === undefined)
            return res.status(400).json({
                message: 'Erro: rota inválida (sem parametro)',
                origin: 'InvalidRoute'
            });
        const relations = req.params.relations
        .split('|')
        .map((v) => {
            return v.toLowerCase();
        })
        .filter((v) => {
            switch(v){
                case 'plan':
                case 'addresses':
                    return true;
                break;
            }
        });
        const jsonQuery = keys.map((v,i) => {
            return { [v]:{ [Op.substring]:values[i] } };
        });
        try {
            const users = await Users.findAll({
                include: relations,
                attributes: {
                    exclude:['password']
                },
                where: { [Op.or]:jsonQuery }
            });
            for(let u in users)
                users[u].password = undefined;
            return res.json(users);
        } catch(error){
            res.status(400).json({
                message: 'Erro ao carregar registro',
                origin:error.name
            });
        }
    },
    async update (req,res) {
        try {
            const attrs = req.body;
            const id = req.body.id;
            const props = Object.keys(attrs);
            const values = Object.values(attrs);
            let hasEmpty = '';
            if(id === undefined)
                return res.status(400).json({
                    message: 'Erro: falta a propriedade id',
                    origin: 'MissingId'
            });
            if(id === "" || isNaN(id))
                return res.status(400).json({
                    message: 'Erro: propriedade id inválida (deve ser um número)',
                    origin: 'EmptyId'
            });
            if(props.length === 1)
                return res.status(400).json({
                    message: 'Erro: nenhuma propriedade à ser atualizada',
                    origin: 'MissingFields'
            });
            values.forEach((v,i) => {
                if(v !== undefined && v.length === 0)
                    hasEmpty = props[i];
            });
            if(hasEmpty)
                return res.status(400).json({
                    message: `Erro: Propriedade ${hasEmpty} inválida`,
                    origin: 'EmptyField'
                });
            attrs.id = undefined;
            if(!await Users.findByPk(id))
                return res.status(400).json({
                    message: 'Erro: Não existe usuário com o id fornecido',
                    origin: 'IdNotFound'
                });
            const users = await Users.update(
            attrs,
            {
                where: { id }
            });
            return res.json({
                message: 'Registro atualizado com sucesso.',
            });
        } catch(error){
            res.status(400).json({
                message: 'Erro ao atualizar registro',
                origin:error.name
            });
        }        
    },
    async erase (req,res) {
        try {
            if(req.body.id === undefined)
                return res.status(400).json({
                    message: 'Erro: falta a propriedade id',
                    origin: 'MissingId'
            });
            if(req.body.id === "" || isNaN(req.body.id))
                return res.status(400).json({
                    message: 'Erro: propriedade id inválida (deve ser um número)',
                    origin: 'EmptyId'
            });            
            const users = await Users.destroy({
                where:{
                    id:req.body.id
                }
            });
            return res.json({
                message: 'Registro excluído com sucesso.'
            });
        } catch(error){
            res.status(400).json({
                message: 'Erro ao excluir registro',
                origin:error.name
            });
        }        
    }
}
