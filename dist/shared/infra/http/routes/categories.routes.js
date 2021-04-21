"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoriesRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _CreateCategoryController = require("@modules/cars/useCases/createcategory/CreateCategoryController");

var _ImportCategoryController = require("@modules/cars/useCases/importCategory/ImportCategoryController");

var _ListCategoriesController = require("@modules/cars/useCases/listCategories/ListCategoriesController");

var _ensureAdmin = require("../middleware/ensureAdmin");

var _ensureAuthenticated = require("../middleware/ensureAuthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const categoriesRoutes = (0, _express.Router)();
exports.categoriesRoutes = categoriesRoutes;
const upload = (0, _multer.default)({
  dest: './tmp'
});
const createCategoryController = new _CreateCategoryController.CreateCategoryController();
const importCategoryController = new _ImportCategoryController.ImportCategoryController();
const listCategoriesController = new _ListCategoriesController.ListCategoriesController();
categoriesRoutes.post('/', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCategoryController.handle);
categoriesRoutes.get('/', listCategoriesController.handle);
categoriesRoutes.post('/import', upload.single('file'), _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, importCategoryController.handle);