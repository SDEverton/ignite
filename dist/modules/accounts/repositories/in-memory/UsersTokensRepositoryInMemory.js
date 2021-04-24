"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepositoryInMemory = void 0;

var _UserTokens = require("../../infra/typeorm/entities/UserTokens");

class UsersTokensRepositoryInMemory {
  constructor() {
    this.usersTokens = [];
  }

  async create({
    expires_date,
    refresh_token,
    user_id
  }) {
    const userToken = new _UserTokens.UserTokens();
    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id
    });
    this.usersTokens.push(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id, refresh_toke) {
    const userToken = this.usersTokens.find(ut => ut.user_id === user_id && refresh_toke);
    return userToken;
  }

  async deleteById(id) {
    const userToken = this.usersTokens.find(ut => ut.id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }

  async findByRefreshToken(refresh_token) {
    const userToken = this.usersTokens.find(ut => ut.refresh_token === refresh_token);
    return userToken;
  }

}

exports.UsersTokensRepositoryInMemory = UsersTokensRepositoryInMemory;