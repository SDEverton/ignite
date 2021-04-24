"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRepositoryInMemory = void 0;

var _User = require("../../infra/typeorm/entities/User");

class UserRepositoryInMemory {
  constructor() {
    this.users = [];
  }

  async create({
    driver_licence,
    email,
    name,
    password
  }) {
    const user = new _User.User();
    Object.assign(user, {
      driver_licence,
      email,
      name,
      password
    });
    this.users.push(user);
  }

  async findByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  async findById(id) {
    return this.users.find(user => user.id === id);
  }

}

exports.UserRepositoryInMemory = UserRepositoryInMemory;