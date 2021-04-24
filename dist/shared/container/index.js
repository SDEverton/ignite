"use strict";

var _tsyringe = require("tsyringe");

require("./providers");

var _UserRepository = require("../../modules/accounts/infra/typeorm/repositories/UserRepository");

var _UserTokensRepository = require("../../modules/accounts/infra/typeorm/repositories/UserTokensRepository");

var _CarsImagesRepository = require("../../modules/cars/infra/typeorm/repositories/CarsImagesRepository");

var _CarsRepository = require("../../modules/cars/infra/typeorm/repositories/CarsRepository");

var _CategoriesRepository = require("../../modules/cars/infra/typeorm/repositories/CategoriesRepository");

var _SpecificationsRepository = require("../../modules/cars/infra/typeorm/repositories/SpecificationsRepository");

var _RentalsRepository = require("../../modules/rentals/infra/typeorm/repositories/RentalsRepository");

_tsyringe.container.registerSingleton('CategoriesRepository', _CategoriesRepository.CategoriesRepository);

_tsyringe.container.registerSingleton('SpecificationsRepository', _SpecificationsRepository.SpecificationsRepository);

_tsyringe.container.registerSingleton('UsersRepository', _UserRepository.UsersRepository);

_tsyringe.container.registerSingleton('CarsRepository', _CarsRepository.CarsRepository);

_tsyringe.container.registerSingleton('CarsImagesRepository', _CarsImagesRepository.CarsImagesRepository);

_tsyringe.container.registerSingleton('RentalRepository', _RentalsRepository.RentalRepository);

_tsyringe.container.registerSingleton('UserTokensRepository', _UserTokensRepository.UserTokensRepository);