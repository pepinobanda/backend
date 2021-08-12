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
exports.clienteController = void 0;
const clienteDAO_1 = require("../dao/clienteDAO");
class ClienteController {
    /**

     */
    lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield clienteDAO_1.dao.lista();
                res.json(result);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    /**

     */
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, apellidos, tipoCliente, cveRegistro } = req.body;
                // Verificar parametros
                if (nombre == null || apellidos == null) {
                    return res.status(409).json({ message: "Los campos son requeridos" });
                }
                // Verificar longitud de caracteres
                if (nombre.length > 250) {
                    return res.status(500).json({ message: "La longitud maxima del nombre es de 250 caracteres" });
                }
                // Verificar Rol
                const verifyRol = yield clienteDAO_1.dao.verificarRol(tipoCliente);
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
                const result = yield clienteDAO_1.dao.insert(user);
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
}
exports.clienteController = new ClienteController();
