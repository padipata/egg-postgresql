'use strict';

const jwt = require('jsonwebtoken');

module.exports = app => {
    class User extends app.Service {
        // 新用户注册
        async register(user) {
            await this.ctx.model.User.create(user);
        }

        // 该账号是否已经注册
        async hasRegister(open_id) {
            const user = await this.ctx.model.User.findOne(
                {
                    where: {open_id: open_id}
                }
            );
            if (user && user.dataValues.open_id) {
                return true;
            }
            return false;
        }

        // 获取用户列表
        async list({offset = 0, limit = 10, order_by = 'created_at', order = 'ASC'}) {
            const users = await this.ctx.model.User.findAndCountAll({
                offset,
                limit,
                order: [[order_by, order.toUpperCase()]],
            });
            if (!users || users.length === 0) {
                this.ctx.throw(404, '暂无用户');
            }
            return users;
        }

        // 获取用户信息
        async find(open_id) {
            const user = await this.ctx.model.User.findById(open_id);
            if (!user) {
                this.ctx.throw(404, '用户不存在');
            }
            return user;
        }
    }

    return User;
};