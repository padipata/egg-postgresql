'use strict';

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Controller = require('egg').Controller;

class UserController extends Controller {
    // 管理员登录
    async login() {
        const {ctx} = this;
        const token = await ctx.service.adminUser.login(ctx.request.body);
        if (token === false) {
            ctx.throw(401, '账号或密码错误')
        }
        ctx.status = 200;
        ctx.body = token;
    }

    /**
     * 用户列表
     * offset   第几页
     * limit    一页多少条记录
     */
    async adminUserList() {
        let info = {};

        if (this.ctx.request.body.nick_name) {
            info.nick_name = this.ctx.request.body.nick_name
        }

        if (!this.ctx.request.body.offset) {
            info.offset = 0
        } else {
            info.offset = this.ctx.request.body.offset
        }

        if (!this.ctx.request.body.limit) {
            info.limit = 10
        } else {
            info.limit = this.ctx.request.body.limit
        }

        this.ctx.body = await this.ctx.service.adminUser.adminUserList(info);
    }

}

module.exports = UserController;