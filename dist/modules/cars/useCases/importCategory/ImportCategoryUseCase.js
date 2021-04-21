"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImportCategoryUseCase = void 0;

var _csvParse = _interopRequireDefault(require("csv-parse"));

var _fs = _interopRequireDefault(require("fs"));

var _tsyringe = require("tsyringe");

var _ICategoriesRepository = require("../../repositories/ICategoriesRepository");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ImportCategoryUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CategoriesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICategoriesRepository.ICategoriesRepository === "undefined" ? Object : _ICategoriesRepository.ICategoriesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ImportCategoryUseCase {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  loadCategory(file) {
    return new Promise((resolve, reject) => {
      const stream = _fs.default.createReadStream(file.path);

      const categories = [];
      const parseFile = (0, _csvParse.default)();
      stream.pipe(parseFile);
      parseFile.on('data', async line => {
        const [name, description] = line;
        categories.push({
          name,
          description
        });
      }).on('end', () => {
        _fs.default.promises.unlink(file.path);

        resolve(categories);
      }).on('error', err => {
        reject(err);
      });
    });
  }

  async execute(file) {
    const categories = await this.loadCategory(file);
    categories.map(async category => {
      const {
        name,
        description
      } = category;
      const existCategory = await this.categoryRepository.findByName(name);

      if (!existCategory) {
        await this.categoryRepository.create({
          name,
          description
        });
      }
    });
  }

}) || _class) || _class) || _class) || _class);
exports.ImportCategoryUseCase = ImportCategoryUseCase;