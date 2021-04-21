"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMap = void 0;

var _classTransformer = require("class-transformer");

class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_licence,
    avatar_url
  }) {
    const user = (0, _classTransformer.classToClass)({
      email,
      name,
      id,
      avatar,
      driver_licence,
      avatar_url
    });
    return user;
  }

}

exports.UserMap = UserMap;