"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clienteController_1 = require("../controllers/clienteController");
const jwt_1 = require("../middleware/jwt");
const roles_1 = require("../middleware/roles");
class ClienteRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', [jwt_1.checkJwt, roles_1.checkRol([1])], clienteController_1.clienteController.lista);
        this.router.put('/', [jwt_1.checkJwt, roles_1.checkRol([1])], clienteController_1.clienteController.insert);
        this.router.put('/', [jwt_1.checkJwt, roles_1.checkRol([1])], clienteController_1.clienteController.insert);
    }
}
const clienteRoutes = new ClienteRoutes();
exports.default = clienteRoutes.router;
