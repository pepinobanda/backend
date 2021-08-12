"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
const usuarioDAO_1 = require("../dao/usuarioDAO");
class UsuarioController {
    /**
     *  Nombre: lista
     *  Descripcion: lista de usuarios de la base de datos
     *  Resultado: json con informacion de  usuarios registrados.
     */
    lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield usuarioDAO_1.dao.lista();
                res.json(result);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    /**
     *  Nombre: insert
     *  Descripcion: insertar datos de un nuevo usuario
     *  Resultado: json con mensaje.
     */
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, apellidos, tipoCliente, cveRegistro } = req.body;
                // Verificar parametros
                if (nombre == null || apellidos == null) {
                    return res.status(409).json({ message: "Los campos son requeridos" });
                }
                // Verificar nombre longitud de caracteres
                if (nombre.length > 250) {
                    return res.status(500).json({ message: "La longitud maxima del nombre es de 250 caracteres" });
                }
                // Verificar apellidos longitud de caracteres
                if (apellidos.length > 450) {
                    return res.status(500).json({ message: "La longitud maxima del nombre es de 250 caracteres" });
                }
                // Verificar Rol
                const verifyRol = yield usuarioDAO_1.dao.verificarRol(tipoCliente);
                if (verifyRol.length <= 0) {
                    return res.status(500).json({ message: "El rol no existe o no esta disponible" });
                }
                // Llamar objetos
                const user = {
                    nombre,
                    apellidos,
                    tipoCliente,
                    cveRegistro
                };
                // Insercion de datos
                const result = yield usuarioDAO_1.dao.insert(user);
                if (result.affectedRows > 0) {
                    return res.json({ message: "Cliente guardado exitosamente" });
                }
                else {
                    return res.status(409).json({ message: result.message });
                }
                res.json(result);
            }
            catch (ex) {
                res.status(500).json({ message: ex.message });
            }
        });
    }
    //update
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = req.body;
                if (usuario.cveCliente == null) {
                    return res.status(400).json({ message: "No se puede actualizar" });
                }
                const result = yield usuarioDAO_1.dao.update(usuario);
                if (result.affectedRows > 0) {
                    res.json({ message: "El cliente se ha actualizado de manera correcta." });
                }
                else {
                    res.status(400).json({ message: result.message });
                }
            }
            catch (ex) {
                res.status(500).json({ message: ex.message });
            }
        });
    }
    //Eliminar
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cveCliente } = req.params;
                if (cveCliente == null) {
                    return res.status(400).json({ message: "No se pude eliminar" });
                }
                // delete
                const result = yield usuarioDAO_1.dao.delete(cveCliente);
                if (result.affectedRows > 0) {
                    return res.json({ message: "Cliente eliminado exitosamente" });
                }
                else {
                    return res.status(400).json({ message: result.message });
                }
                res.json(result);
            }
            catch (ex) {
                res.status(500).json({ message: ex.message });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
