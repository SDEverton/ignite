"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specificationsRoutes = void 0;

var _express = require("express");

var _CreateSpecificationController = require("../../../../modules/cars/useCases/createSpecification/CreateSpecificationController");

var _ensureAdmin = require("../middleware/ensureAdmin");

var _ensureAuthenticated = require("../middleware/ensureAuthenticated");

const specificationsRoutes = (0, _express.Router)();
exports.specificationsRoutes = specificationsRoutes;
const createSpecificationController = new _CreateSpecificationController.CreateSpecificationController();
specificationsRoutes.post('/', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createSpecificationController.handle);