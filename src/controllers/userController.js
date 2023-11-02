const User = require(`../models/User`)

const {validationResult} = require('express-validator')

async function listar(req, res){
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log('error',error)
    }
}

async function registrar(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body
    try {
        await User.create(body)
        res.json({
            message:"Usuario creado correctamente"
        })
    } catch (error) {
        console.log('error',error)
    }
}

async function eliminar(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body
    try {
        const resultado = await User.deleteOne({ _id: body.id });

        if (resultado.deletedCount === 1) {
            console.log('usuario eliminado');
            res.json({
                message: "Usuario eliminado correctamente"
            });
        } else {
            res.status(404).json({
                message: "No se encontró el usuario o ya ha sido eliminado"
            });
        }
    } catch (error) {
        console.log('error',error)
    }
}

module.exports = {
    listar,
    registrar,
    eliminar
};